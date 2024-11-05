// preload.js

import {contextBridge, ipcRenderer} from 'electron';

// 暴露给渲染进程的 API
contextBridge.exposeInMainWorld('api', {
    // 发送消息到主进程
    send: (channel, data) => {
        // 允许的频道
        const validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // 接收来自主进程的消息
    receive: (channel, func) => {
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            // 在渲染进程中接收消息
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});