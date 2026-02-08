import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config.js'
import zip from 'vite-plugin-zip-pack'

export default defineConfig({
    plugins: [
        vue(),
        crx({
            manifest
        }),
        zip({ outDir: 'build', outFileName: `${manifest.name}-${manifest.version}.zip` }),
    ],
    server: {
        cors: {
            origin: [
                /chrome-form-history:\/\//,
            ],
        },
    },
});