import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

export default defineConfig({
    base: './',  // 使构建后的文件可以在任何地方运行
    plugins: [vue()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
});