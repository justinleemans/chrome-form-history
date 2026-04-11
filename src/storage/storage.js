import hash from "object-hash";

export async function saveToStorage(url, object) {
    const result = await chrome.storage.local.get("history");
    const history = result.history || {};
    const objectHash = hash(object);

    if (!history[url]) {
        history[url] = [];
    }

    const exists = history[url].some(record => record.hash === objectHash);
    if (!exists) {
        history[url].push({
            hash: objectHash,
            timestamp: Date.now(),
            data: object
        });

        await chrome.storage.local.set({ history });
    }
}

export async function getFromStorage(url) {
    const result = await chrome.storage.local.get("history");
    const history = result.history || {};
    return history[url] || [];
}

export async function countFromStorage(url) {
    const records = await getFromStorage(url);
    return records.length;
}