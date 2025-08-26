const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
   
    saveFile: (content) => ipcRenderer.invoke('save-file', content),
    
    
    openFile: () => ipcRenderer.invoke('open-file'),
    
    // File running
    runFile: (filePath) => ipcRenderer.invoke('run-file', filePath),
    
    // Event listeners
    onSaveTrigger: (callback) => ipcRenderer.on('trigger-save', callback),
    onOpenTrigger: (callback) => ipcRenderer.on('trigger-open', callback),
    onRunTrigger: (callback) => ipcRenderer.on('trigger-run', callback),
    
    // Output handling
    onRunOutput: (callback) => ipcRenderer.on('run-output', callback)
});