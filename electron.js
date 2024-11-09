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
        width: 1200,
        height: 700,
        minWidth: 500,
        minHeight: 650,
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

// 处理文件或文件夹的选择
ipcMain.handle('open-file-or-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory'], // 允许选择文件或文件夹
        filters: [
            {name: 'Markdown Files', extensions: ['md']} // 仅允许 .md 文件
        ]
    });
    if (result.canceled) {
        return false;
    } else {
        const selectedPath = result.filePaths[0];
        const pathName = path.basename(selectedPath);
        return {path: selectedPath, name: pathName};
    }
});


ipcMain.handle('read-file-or-folder', async (event, address) => {
    address = address.toString()
    try {
        const stats = await fs.stat(address);
        if (stats.isFile()) {
            // 读取文件内容
            const content = await fs.readFile(address, 'utf-8');
            return {
                type: 'file',
                content: content,
                path: address,
                name: path.basename(address),
            };
        } else if (stats.isDirectory()) {
            // 读取文件夹内容并返回文件夹内的文件列表
            const files = await fs.readdir(address);
            const fileList = [];
            for (const file of files) {
                const filePath = path.join(address, file);
                try {
                    const fileStats = await fs.stat(filePath);
                    fileList.push({
                        name: file,
                        path: filePath,
                        isDirectory: fileStats.isDirectory(),
                    });
                } catch (err) {
                    console.error(`Error reading stats for file: ${filePath}`, err);
                }
            }
            return {type: 'directory', path: address, name: path.basename(address), contents: fileList};
        }
    } catch (error) {
        console.error('Error reading file or folder:', error);
        return {error: 'Unable to read file or folder'};
    }
});

app.whenReady().then(createWindow);

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