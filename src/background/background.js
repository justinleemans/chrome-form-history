async function updateBadge() {
	let count = await getFormHistoryCount();
    let label = "";

    if (count >= 10) {
        label = "9+";
    } else if (count > 0) {
        label = count.toString();
    }

	chrome.action.setBadgeText({ text: label });
}

async function getFormHistoryCount() {
	const records = [];
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs[0] || !tabs[0].url) {
                resolve(0);
                return;
            }

            let url;
            try {
                url = new URL(tabs[0].url);
            } catch (e) {
                resolve(0);
                return;
            }

            const { history = {} } = await chrome.storage.session.get("history");
            const entries = history[url] || [];

            resolve(entries.length);
        });
    });
}

chrome.runtime.onStartup.addListener(updateBadge);
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.tabs.onActivated.addListener(updateBadge);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        updateBadge();
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
	if (area === "session" && changes.history) {
		updateBadge();
	}
});

updateBadge();