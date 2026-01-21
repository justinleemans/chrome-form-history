<template>
    <button class="record" @click="emit('fill', record)">
        {{ new Date(record.timestamp).toLocaleString() }}
    </button>
</template>

<script setup>
    const emit = defineEmits(['fill']);
    defineProps({
        record: Object
    });
</script>