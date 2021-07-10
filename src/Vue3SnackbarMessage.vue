<template>
    <article
        class="vue3-snackbar-message"
        :class="[props.message.type, props.messageClass, {
            'has-background': props.message.background,
            'is-dense': props.dense
        }]"
        :style="{
            '--message-background': props.message.background
        }"
    >
        <div class="vue3-snackbar-message-wrapper">
            <div class="vue3-snackbar-message-icon" v-if="icon">
                <vue3-icon v-bind="icon" role="img" />
            </div>
            <div class="vue3-snackbar-message-content">
                <div
                    class="vue3-snackbar-message-title"
                >{{ props.message.title || props.message.text }}</div>
                <div
                    class="vue3-snackbar-message-additional"
                    v-if="props.message.title && props.message.text"
                >{{ props.message.text }}</div>
            </div>
            <div class="spacer"></div>
            <div class="vue3-snackbar-message-close">
                <button @click="dismissClick" v-if="props.message.dismissable !== false">
                    <vue3-icon type="mdi" :path="mdiClose" />
                </button>
            </div>
        </div>
    </article>
</template>


<script setup>
import { mdiCheckCircle, mdiClose, mdiInformationOutline, mdiAlertOctagonOutline, mdiAlertOutline } from "@mdi/js";

import Vue3Icon from "vue3-icon";
import { computed, onMounted } from "vue";

const emit = defineEmits(['dismiss']);
const props = defineProps({
    message: {
        type: Object,
        default: () => ({})
    },
    messageClass: String,
    dense: Boolean
})

let timeout = null;

onMounted(() => {
    if (props.message.duration) {
        timeout = setTimeout(() => {
            dismiss();
        }, props.message.duration);
    }
})
const dismissClick = () => {
    if (timeout) clearTimeout(timeout);
    dismiss();
}
const dismiss = () => {
    emit('dismiss', props.message);
}
const icon = computed(() => {
    switch (props.message.type) {
        case 'success':
            return {
                path: mdiCheckCircle,
                type: "mdi"
            }
        case 'info':
            return {
                path: mdiInformationOutline,
                type: "mdi"
            }
        case 'warning':
            return {
                path: mdiAlertOutline,
                type: "mdi"
            }
        case 'error':
            return {
                path: mdiAlertOctagonOutline,
                type: "mdi"
            }
    }
    if (!props.message.icon || typeof props.message.icon !== 'object' || (!props.message.icon.path && !props.message.icon.faIcon)) {
        return {
            path: "",
            type: "default"
        }
    }
    else return props.message.icon || {};
})
</script>