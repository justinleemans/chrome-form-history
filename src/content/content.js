import { saveToStorage } from "../storage/storage";

function injectFetchOverride() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("src/content/inject.js");
    script.onload = function() { this.remove(); };
    (document.head || document.documentElement).appendChild(script);
}

document.addEventListener("submit", async (event) => {
    const form = event.target;
    const data = {};
    const url = location.href;

    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });

    await saveToStorage(url, data);
});

injectFetchOverride();