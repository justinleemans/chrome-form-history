<template>
    <div class="relative inline-flex">
        <button v-if="!isRenaming" @click="fill" type="button" class="px-4 py-2 cursor-pointer bg-neutral-900 outline-main hover:outline-1 rounded-l-lg">
            {{ label }}
        </button>
        <button v-if="!isRenaming" @click="showOptions = !showOptions" type="button" class="px-2 py-2 cursor-pointer bg-neutral-900 outline-main hover:outline-1 rounded-r-lg">
            <ChevronDownIcon class="size-3"/>
        </button>
        <input v-if="isRenaming" v-model="label" @keyup.enter="rename" @blur="rename" type="text" placeholder="label..." class="px-4 py-2 bg-neutral-900 outline-main hover:outline-1 rounded-lg">
        <div v-if="showOptions" class="absolute right-0 top-full mt-1 w-40 rounded-lg shadow-lg z-10">
            <button @click="showOptions = false; isRenaming = true" class="px-2 py-2 w-full cursor-pointer bg-neutral-900 outline-main hover:outline-1 rounded-lg">
                Rename
            </button>
            <button @click="remove" class="px-2 py-2 w-full cursor-pointer text-red-500 bg-neutral-900 outline-main hover:outline-1 rounded-lg">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ChevronDownIcon } from '@heroicons/vue/24/solid';
    
    import { ref } from 'vue';
    
    const props = defineProps({
        record: Object
    });

    const label = ref(props.record.label || new Date(props.record.timestamp).toLocaleString());
    const showOptions = ref(false);
    const isRenaming = ref(false);

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

    function rename() {
        isRenaming.value = false;
    }

    function remove() {
        showOptions.value = false;
    }
</script>