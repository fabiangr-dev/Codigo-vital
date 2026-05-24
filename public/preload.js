const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveProgress: (progress) => ipcRenderer.invoke('save-progress', progress),
  loadProgress: () => ipcRenderer.invoke('load-progress')
});
