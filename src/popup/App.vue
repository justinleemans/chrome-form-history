<template>
    <span v-if="records.length === 0">
        No saved history for this URL.
    </span>
    <div class="flex flex-col gap-3 items-stretch mb-[1.5em]">
        <Record v-for="record in records" :key="record.timestamp" :record="record" @fill="fill"/>
    </div>
    <Footer/>
</template>

<script setup>
    import Footer from './components/footer/Footer.vue';
    import Record from './components/records/Record.vue';

    import { ref, onMounted } from 'vue';
    import { getFromStorage } from '../storage/storage';

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
            const result = await getFromStorage(url.href) || [];
            records.value = result.sort((a, b) => b.timestamp - a.timestamp);
        });
    });
</script>