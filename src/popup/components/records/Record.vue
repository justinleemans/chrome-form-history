<template>
    <button @click="fill" class="border text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-main">
        {{ new Date(record.timestamp).toLocaleString() }}
    </button>
</template>

<script setup>
    const props = defineProps({
        record: Object
    });

    function fill() {
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
                args: [props.record.data],
            });
        });
    }
</script>