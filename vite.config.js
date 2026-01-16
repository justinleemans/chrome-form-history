import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup/index.html'),
                content: resolve(__dirname, 'src/content/content.js'),
            },
            output: {
                entryFileNames: "[name]/[name].js",
                assetFileNames: "[name]/[name].[ext]"
            }
        }
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: "../public/manifest.json",
                    dest: "."
                }
            ]
        })
    ]
});