document.addEventListener("submit", async (event) => {
    const form = event.target;
    const data = {};
    const url = location.href;
    const { history  = {} } = await chrome.storage.local.get("history");

    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });

    history[url].push({ timestamp: Date.now(), data });
    chrome.storage.local.set({ history });
});