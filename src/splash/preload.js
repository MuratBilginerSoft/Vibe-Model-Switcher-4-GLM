const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  splashComplete: () => ipcRenderer.send('splash:complete'),
});
