<template>
    <div class="record-container">
        <span v-if="records.length === 0" class="no-records-label">No saved history for this URL.</span>
        <Record v-else v-for="record in records" :key="record.timestamp" :record="record" @fill="fill"/>
    </div>
    <Footer/>
</template>

<script setup>
    import Footer from './components/Footer.vue';
    import Record from './components/Record.vue';

    import { ref, onMounted } from 'vue';

    const records = ref([]);

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

    onMounted(async () => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const url = new URL(tabs[0].url);
            const { history = [] } = await chrome.storage.session.get("history");
            const entries = history[url] || [];
            records.value = entries;
        });
    });
</script>