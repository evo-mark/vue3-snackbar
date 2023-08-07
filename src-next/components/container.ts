import { defineComponent, h, Teleport, normalizeClass, computed, type PropType, TransitionGroup } from "vue";
import type { MessageType } from "../types";
import { useSnackbarPosition } from "../composables/useSnackbarPosition";
import { messages } from "../store/messages";
import SnackbarMessage from "./message.vue";

export default defineComponent({
    props: {
        // LOCATION PROPS

        /**
         * Place the message container towards the top of the screen
         */
        top: {
            type: Boolean,
            default: false
        },
        /**
         * Place the message container towards the top of the screen
         */
        bottom: {
            type: Boolean,
            default: false
        },
        /**
         * Place the message container towards the top of the screen
         */
        left: {
            type: Boolean,
            default: false
        },
        /**
         * Place the message container towards the top of the screen
         */
        right: {
            type: Boolean,
            default: false
        },

        // GENERAL

        attach: {
            type: [String,HTMLElement],
            default: "body"
        },

        tag: {
            type: String,
            default: "section"
        },

        messageTag: {
            type: String,
            default: "article"
        },

        messageComponent: {
            type: Object,
            default: SnackbarMessage
        },

        class: {
            type: String,
            default: null
        },

        shadow: {
            type: Boolean,
            default: false
        },

        // MESSAGE TYPES

        success: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                class: "vue3-snackbar__message--success"
            })
        },

        info: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                class: "vue3-snackbar__message--info"
            })
        },

        warning: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                class: "vue3-snackbar__message--warning"
            })
        },

        error: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                class: "vue3-snackbar__message--error"
            })
        }
    },
    setup(props, context) {

        const positionClass = useSnackbarPosition(props);

        return () => h(Teleport, {
            to: props.attach
        }, h(props.tag, {
            class: normalizeClass([
                props.class, 
                positionClass.value, 
                {
                    'vue3-snackbar': !props.class,
                    'vue3-snackbar--shadow': props.shadow
                }
            ])
        }, h(TransitionGroup, {}, {
            default: () => messages.value.map(message => {
            return h(props.messageComponent, {
                tag: props.messageTag,
                message
            })
        })})));
    }
})