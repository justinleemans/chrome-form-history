import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
    "manifest_version": 3,
    "name": "Form History",
    "version": "2026.02.08",
    "description": "A Chrome extension to refill form data from history",
    "icons": {
        "16": "public/icon-16.png",
        "32": "public/icon-32.png",
        "48": "public/icon-48.png",
        "128": "public/icon-128.png"
    },
    "permissions": [
        "storage",
        "activeTab",
        "scripting"
    ],
    "action": {
        "default_popup": "src/popup/index.html",
        "default_icon": {
            "16": "public/icon-16.png",
            "32": "public/icon-32.png",
            "48": "public/icon-48.png",
            "128": "public/icon-128.png"
        }
    },
    "background": {
        "service_worker": "src/background/background.js"
    },
    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
                "src/content/content.js"
            ]
        }
    ]
});