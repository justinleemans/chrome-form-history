import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
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
                background: resolve(__dirname, 'src/background/background.js')
            },
            output: {
                entryFileNames: "[name]/[name].js",
                assetFileNames: "[name]/[name].[ext]"
            }
        }
    },
    plugins: [
        vue(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "../public/manifest.json",
                    dest: "."
                },
                {
                    src: "../public/icons/*.png",
                    dest: "icons"
                }
            ]
        })
    ]
});