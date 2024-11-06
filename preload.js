console.log('Preload script is running');

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFileOrFolder: () => ipcRenderer.invoke('open-file-or-folder'),
    readFileOrFolder: (address) => ipcRenderer.invoke('read-file-or-folder', address)
});