import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import fs from 'fs/promises';  // 使用 Promise API
import path from 'path';
import {fileURLToPath} from 'url';

// 获取当前模块的文件名和目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // 确保路径正确
            spellcheck: false,
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('dist/index.html'); // 加载生成的 HTML 文件
    // 自动打开开发者工具
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// 处理文件或文件夹的选择
ipcMain.handle('open-file-or-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            {name: 'Markdown Files', extensions: ['md']} // 只允许选择 .md 文件
        ]
    });

    if (result.canceled) {
        return null;
    } else {
        return result.filePaths[0];
    }
});

// 处理读取文件内容
ipcMain.handle('read-file-or-folder', async (event, address) => {
    try {
        const stats = await fs.stat(address);
        if (stats.isFile()) {
            const content = await fs.readFile(address, 'utf-8');
            return {type: 'file', content: content};
        }
    } catch (error) {
        console.error(error);
        return {error: 'Unable to read file'};
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});