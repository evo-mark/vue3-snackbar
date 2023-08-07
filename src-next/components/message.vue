<template>
    <div>{{  props.message.title }}</div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: Object,
        default: () => ({})
    }
});
</script>