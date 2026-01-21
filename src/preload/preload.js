const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (claudePath) => ipcRenderer.invoke('settings:set', claudePath),
  validatePath: (claudePath) => ipcRenderer.invoke('settings:validatePath', claudePath),
  selectFolder: () => ipcRenderer.invoke('settings:selectFolder'),

  // Profiles
  getAllProfiles: () => ipcRenderer.invoke('profiles:getAll'),
  getProfile: (id) => ipcRenderer.invoke('profiles:get', id),
  getActiveProfile: () => ipcRenderer.invoke('profiles:getActive'),
  createProfile: (name, color) => ipcRenderer.invoke('profiles:create', { name, color }),
  createProfileWithSettings: (name, color, settingsContent) => ipcRenderer.invoke('profiles:createWithSettings', { name, color, settingsContent }),
  updateProfile: (id, name, color) => ipcRenderer.invoke('profiles:update', { id, name, color }),
  deleteProfile: (id) => ipcRenderer.invoke('profiles:delete', id),
  switchProfile: (id) => ipcRenderer.invoke('profiles:switch', id),
  importCurrentAsProfile: (name, color) => ipcRenderer.invoke('profiles:importCurrent', { name, color }),
  readCurrentSettings: () => ipcRenderer.invoke('profiles:readCurrentSettings'),
});
