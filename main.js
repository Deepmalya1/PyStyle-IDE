const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        transparent:true,
        frame:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');
}

function setupIPCHandlers() {
    // Save file handler
    ipcMain.handle('save-file', async (event, content) => {
        try {
            const result = await dialog.showSaveDialog(mainWindow, {
                title: 'Save File',
                defaultPath: path.join(app.getPath('documents'), 'untitled.py'),
                filters: [
                    { name: 'Python Files', extensions: ['py'] },
                    { name: 'All Files', extensions: ['*'] }
                ]
            });

            if (result.canceled) return null;
            
            fs.writeFileSync(result.filePath, content, 'utf8');
            return result.filePath;
        } catch (err) {
            console.error('Save error:', err);
            return null;
        }
    });

    // Open file handler
    ipcMain.handle('open-file', async () => {
        try {
            const result = await dialog.showOpenDialog(mainWindow, {
                properties: ['openFile'],
                filters: [
                    { name: 'Python Files', extensions: ['py'] },
                    { name: 'All Files', extensions: ['*'] }
                ]
            });

            if (result.canceled) return null;
            
            const currentFilePath = result.filePaths[0];
            const content = fs.readFileSync(currentFilePath, 'utf8');
            return { content, path: currentFilePath };
        } catch (err) {
            console.error('Open file error:', err);
            return null;
        }
    });

    // Run file handler
    ipcMain.handle('run-file', async (event, filePath) => {
        return new Promise((resolve, reject) => {
            // Run Python script
            const process = spawn('python', [filePath]);
            
            let outputData = '';
            let errorData = '';

            process.stdout.on('data', (data) => {
                outputData += data.toString();
            });

            process.stderr.on('data', (data) => {
                errorData += data.toString();
            });

            process.on('close', (code) => {
                mainWindow.webContents.send('run-output', {
                    output: outputData,
                    error: errorData,
                    exitCode: code
                });
                resolve({
                    output: outputData,
                    error: errorData,
                    exitCode: code
                });
            });

            process.on('error', (err) => {
                reject(err);
            });
        });
    });
}

app.whenReady().then(() => {
    createMainWindow();
    setupIPCHandlers();

    // Global shortcuts
    globalShortcut.register('CommandOrControl+S', () => {
        mainWindow.webContents.send('trigger-save');
    });

    globalShortcut.register('CommandOrControl+O', () => {
        mainWindow.webContents.send('trigger-open');
    });

    globalShortcut.register('CommandOrControl+R', () => {
        mainWindow.webContents.send('trigger-run');
    });

    globalShortcut.register('CommandOrControl+Q', () => {
      app.quit();
  });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});