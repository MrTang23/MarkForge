import {app, BrowserWindow} from 'electron';
import {fileURLToPath} from 'url';
import {join, dirname} from 'path';

// 获取当前模块的文件名和目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: join('./preload.js'),
            contextIsolation: true,  // 建议启用
            nodeIntegration: false,  // 禁用 nodeIntegration 以提升安全性
            enableRemoteModule: false, // 禁用 remote 模块，提升安全性
        },
    });

    // 加载生成的 dist/index.html 文件
    mainWindow.loadFile(join(__dirname, 'dist/index.html'));

    // 打开开发者工具（可选）
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});