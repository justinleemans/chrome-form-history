<template>
    <a class="text-main hover:text-main-hover" :href="supportLink" target="_blank">Support this project</a>
</template>

<script setup>
    const props = defineProps({
        supportLink: {
            type: String,
            default: "https://buymeacoffee.com/justinleemans"
        }
    });

    const supportLink = props.supportLink;
</script>