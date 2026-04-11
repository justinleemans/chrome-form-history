<template>
    <button class="border text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]" @click="emit('fill', record)">
        {{ new Date(record.timestamp).toLocaleString() }}
    </button>
</template>

<script setup>
    const emit = defineEmits(['fill']);
    
    defineProps({
        record: Object
    });
</script>