import { mdiClose } from '@mdi/js';
import { type PropType, type ComputedRef, defineComponent, h, normalizeClass, computed } from 'vue';
/** @ts-ignore */
import SvgIcon from "vue3-icon";
import type { MessageType, Vue3Icon } from '../types';

export default defineComponent({
    props: {
        class: {
            type: String,
            default: ""
        },
        message: {
            type: Object,
            default: () => ({})
        },
        tag: {
            type: String as PropType<keyof HTMLElementTagNameMap>,
            required: true
        },
        type: {
            type: [Object, String] as PropType<MessageType | string>,
            default: null
        },
        closeIcon: {
            type: [Object, String] as PropType<Vue3Icon | string>,
            default: mdiClose
        }
    },
    setup(props, { slots }) {

        const resolveIcon = (icon?: string|Vue3Icon) => {
            if (!icon) return null;
            else return typeof icon === "string" ? {
                type: "mdi",
                path: icon
            } : icon;
        }

       const messageIcon: ComputedRef<Vue3Icon|null> = computed(() => {
            const typeIcon = typeof props.type === "string" ? props.type : props.type?.icon;
            return resolveIcon(typeIcon);

       })

       const typeClass = computed(() => typeof props.type === "object" ? props.type?.class || "" : "");

        const createIcon = () => {
            if (!messageIcon.value) return null;
            else return h("div", {
                class: normalizeClass(["vue3-snackbar__message--icon"])
            }, h(SvgIcon, messageIcon.value))
        }

        const createTitle = () => {
            return h("p", {
                class: "vue3-snackbar__message--title"
            }, props.message.title)
        }

        const createMessage = () => {
            return h("p", {
                class: "vue3-snackbar__message--message"
            })
        }

        const createClose = () => {
            return h("button", {
                class: "vue3-snackbar__message--close"
            }, h(SvgIcon, resolveIcon(props.closeIcon)))
        }

        const createAction = () => {
            return h("div", {
                class: "vue3-snackbar__message--action"
            }, slots['message-action'] ?
                            slots['message-action']({ message: props.message }) :
                            []
                    )
        }

        return () => h(props.tag, {
            class: normalizeClass([
                'vue3-snackbar__message',
                props.class,
                props.message.class,
                typeClass.value,
            ])
        }, slots['message-inner'] ?
                slots['message-inner']({ message: props.message }) :
                [createIcon(), createTitle(), createClose(), createMessage(), createAction()]);
    }
});
