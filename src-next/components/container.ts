import { defineComponent, h, Teleport, normalizeClass, type PropType, TransitionGroup } from "vue";
import { mdiCheckCircle, mdiInformationOutline, mdiAlertOctagonOutline, mdiAlertOutline } from "@mdi/js";
import type { MessageType, SnackbarMessage as SnackbarMessageInterface } from "../types";
import { HTMLShim } from "../helpers/propTypes";
import { useSnackbarPosition } from "../composables/useSnackbarPosition";
import { messages, setConfig } from "../store/messages";
import SnackbarMessage from "./message";

export const emits = {
    added: (payload: SnackbarMessageInterface) => {

    }
}

export default defineComponent({
    // ["added", "dismissed", "removed", "cleared"];
    emits: emits,
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
            type: [String,HTMLShim],
            default: "body"
        },

        tag: {
            type: String as PropType<keyof HTMLElementTagNameMap>,
            default: "section"
        },

        messageClass: {
            type: String,
            default: ""
        },

        messageTag: {
            type: String as PropType<keyof HTMLElementTagNameMap>,
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
                icon: mdiCheckCircle,
                class: "vue3-snackbar__message--success"
            })
        },

        info: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                icon: mdiInformationOutline,
                class: "vue3-snackbar__message--info"
            })
        },

        warning: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                icon: mdiAlertOutline,
                class: "vue3-snackbar__message--warning"
            })
        },

        error: {
            type: [Object, String] as PropType<MessageType | string>,
            default: () => ({
                icon: mdiAlertOctagonOutline,
                class: "vue3-snackbar__message--error"
            })
        },

        width: {
            type: String,
            default: "min(50vw, 350px)"
        },

        max: {
            type: Number,
            default: Infinity
        },

        duration: {
            type: Number,
            default: 4000
        }
    },
    setup(props, { slots, attrs, emit }) {

        setConfig(props, emit);
        const positionClass = useSnackbarPosition(props);

        const createMessageComponents = () => {
            return messages.value.map(message => {
                return h(props.messageComponent, {
                    key: message.id,
                    tag: props.messageTag,
                    type: message.type ? props[message.type] : null,
                    message,
                    class: props.messageClass,
                    ...attrs
                }, slots);
            });
        };

        const createTransitionGroup = () => {
            return h(TransitionGroup, {}, { default: createMessageComponents });
        };

        const createRootComponent = () => {
            return h(props.tag, {
                class: normalizeClass([
                    props.class,
                    positionClass.value,
                    {
                        'vue3-snackbar': !props.class,
                        'vue3-snackbar--shadow': props.shadow
                    }
                ]),
                style: {
                    width: props.width
                }
            }, createTransitionGroup());
        };

        return () => {
            return h(Teleport, { to: props.attach }, createRootComponent());
        };
    }
})
