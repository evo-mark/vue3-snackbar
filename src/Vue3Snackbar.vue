<template>
    <section
        id="vue3-snackbar--container"
        :class="[generatedBaseClasses]"
        class="vue3-snackbar"
        :style="generatedBaseStyles"
    >
        <transition-group name="vue3-snackbar-message" tag="div">
            <SnackbarMessage
                v-for="message in messages"
                :key="message.id"
                :message="message"
                :message-class="props.messageClass"
                :dense="props.dense"
                @dismiss="remove($event)"
            />
        </transition-group>
    </section>
</template>

<script setup>
import SnackbarMessage from "./Vue3SnackbarMessage.vue";
import { defineProps, computed, ref, onMounted, onUnmounted } from "vue";
import { propsModel } from "./props.js";
import EventBus from "./eventbus";

const props = defineProps({ ...propsModel });

const generatedBaseClasses = computed(() => {
    return {
        'is-top': props.top,
        'is-bottom': props.top === false && props.bottom,
        'is-left': props.left,
        'is-right': props.left === false && props.right,
        'is-middle': props.top === false && props.bottom === false,
        'is-centre': props.left === false && props.right === false
    }
})

const generatedBaseStyles = computed(() => {
    return {
        '--success-colour': props.success,
        '--error-colour': props.error,
        '--warning-colour': props.warning,
        '--info-colour': props.info,
        '--snackbar-zindex': props.zindex
    }
})

let messageId = 1;
const messages = ref([]);

onMounted(() => {
    EventBus.$on('add', (ev) => {
        if (props.duration && !ev.duration) ev.duration = props.duration;
        const message = {
            ...ev,
            id: messageId,
        }
        messages.value.push(message)
        messageId++;
    });

    EventBus.$on('clear', () => {
        messages.value = [];
    })
})

onUnmounted(() => {
    EventBus.$off('add');
    EventBus.$off('clear');
})

const remove = (ev) => {
    messages.value = messages.value.filter(message => {
        return message.id !== ev.id;
    })
}
</script>

<style lang="scss">
@import "./style.scss";
</style>