import { saveToStorage } from "../storage/storage";

document.addEventListener("submit", async (event) => {
    const form = event.target;
    const data = {};
    const url = location.href;

    new FormData(form).forEach((value, key) => {
        data[key] = value;
    });

    await saveToStorage(url, data);
});