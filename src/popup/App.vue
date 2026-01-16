<template>
    <div v-if="records.length === 0">
        No saved history for this URL.
    </div>
    <div class="record-buttons">
        <button v-for="record in records" :key="record.timestamp" @click="fill(record)">
            {{ new Date(record.timestamp).toLocaleString() }}
        </button>
    </div>
    <div class="footer">
        <small><a href="https://buymeacoffee.com/justinleemans" target="_blank">Support this project</a></small>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const records = ref([]);

    onMounted(async () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const url = new URL(tabs[0].url);
            const { history = [] } = await chrome.storage.local.get("history");
            const entries = history[url] || [];
            records.value = entries;
        });
    });

    function fill(record) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (formData) => {
                    for (const [key, val] of Object.entries(formData)) {
                        const el = document.querySelector(`[name="${key}"]`);
                        if (el) {
                            el.value = val;
                        }
                    }
                },
                args: [record.data],
            });
        });
    }
</script>