const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const DatabaseManager = require('./Database');
const ProfileManager = require('./ProfileManager');

class Main {
  constructor() {
    this.mainWindow = null;
    this.splashWindow = null;
    this.database = null;
    this.profileManager = null;
  }

  initialize() {
    // Initialize database
    this.database = new DatabaseManager();
    this.database.initialize();

    // Initialize profile manager
    this.profileManager = new ProfileManager(this.database);

    // Create splash window first
    this.createSplashWindow();

    // Setup IPC handlers
    this.setupIpcHandlers();

    // Setup app events
    this.setupAppEvents();
  }

  createSplashWindow() {
    this.splashWindow = new BrowserWindow({
      width: 400,
      height: 350,
      frame: false,
      resizable: false,
      transparent: true,
      center: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../splash/preload.js'),
      },
    });

    this.splashWindow.loadFile(path.join(__dirname, '../splash/splash.html'));

    // Handle splash complete event
    ipcMain.once('splash:complete', () => {
      this.createMainWindow();
      if (this.splashWindow) {
        this.splashWindow.close();
        this.splashWindow = null;
      }
    });
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      frame: false,
      resizable: true,
      backgroundColor: '#0D1B2A',
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../preload/preload.js'),
      },
    });

    // Load the app
    if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
      this.mainWindow.loadURL('http://localhost:5180');
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../../dist-renderer/index.html'));
    }

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      this.mainWindow.focus();
    });
  }

  setupIpcHandlers() {
    // Window controls
    ipcMain.on('window:minimize', () => {
      this.mainWindow?.minimize();
    });

    ipcMain.on('window:maximize', () => {
      if (this.mainWindow?.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow?.maximize();
      }
    });

    ipcMain.on('window:close', () => {
      this.mainWindow?.close();
    });

    ipcMain.handle('window:isMaximized', () => {
      return this.mainWindow?.isMaximized();
    });

    // Settings handlers
    ipcMain.handle('settings:get', () => {
      return this.database.getSettings();
    });

    ipcMain.handle('settings:set', (event, claudePath) => {
      return this.database.setSettings(claudePath);
    });

    ipcMain.handle('settings:validatePath', (event, claudePath) => {
      return this.profileManager.validatePath(claudePath);
    });

    ipcMain.handle('settings:selectFolder', async () => {
      const result = await dialog.showOpenDialog(this.mainWindow, {
        properties: ['openDirectory'],
        title: 'Select Claude Config Folder',
      });

      if (result.canceled) {
        return null;
      }

      return result.filePaths[0];
    });

    // Profile handlers
    ipcMain.handle('profiles:getAll', () => {
      return this.database.getAllProfiles();
    });

    ipcMain.handle('profiles:get', (event, id) => {
      return this.database.getProfile(id);
    });

    ipcMain.handle('profiles:getActive', () => {
      return this.database.getActiveProfile();
    });

    ipcMain.handle('profiles:create', (event, { name, color }) => {
      return this.database.createProfile(name, color);
    });

    ipcMain.handle('profiles:createWithSettings', (event, { name, color, settingsContent }) => {
      try {
        const profile = this.database.createProfile(name, color, settingsContent);
        return { success: true, profile };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('profiles:update', (event, { id, name, color }) => {
      return this.database.updateProfile(id, name, color);
    });

    ipcMain.handle('profiles:delete', (event, id) => {
      return this.database.deleteProfile(id);
    });

    ipcMain.handle('profiles:switch', (event, id) => {
      return this.profileManager.switchProfile(id);
    });

    ipcMain.handle('profiles:importCurrent', (event, { name, color }) => {
      return this.profileManager.importCurrentAsProfile(name, color);
    });

    ipcMain.handle('profiles:readCurrentSettings', () => {
      return this.profileManager.readCurrentSettings();
    });
  }

  setupAppEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });

    app.on('before-quit', () => {
      this.database?.close();
    });
  }
}

// Initialize app
app.whenReady().then(() => {
  const mainApp = new Main();
  mainApp.initialize();
});
