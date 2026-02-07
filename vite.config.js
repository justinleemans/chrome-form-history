import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config.js'
import zip from 'vite-plugin-zip-pack'
import { name, version } from './package.json'

export default defineConfig({
    plugins: [
        vue(),
        crx({
            manifest
        }),
        zip({ outDir: 'build', outFileName: `${name}-${version}.zip` }),
    ],
    server: {
        cors: {
            origin: [
                /chrome-form-history:\/\//,
            ],
        },
    },
});