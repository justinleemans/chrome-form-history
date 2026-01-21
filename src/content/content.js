document.addEventListener("submit", async (event) => {
    const form = event.target;
    const data = {};
    const url = location.href;
    const { history = {} } = await chrome.storage.session.get("history");

    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });

    if (!history[url]) {
        history[url] = [];
    }

    history[url].push({ timestamp: Date.now(), data });
    chrome.storage.session.set({ history });
});