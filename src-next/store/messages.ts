import { ref, readonly, reactive, type Ref, type EmitsOptions } from "vue";
import { emits as containerEmits } from "../components/container";
import type { SnackbarMessage } from "../types";

interface MessageConfig {
    max: number;
    duration: number;
}

type EmitFunction = (event: keyof typeof containerEmits, ...args: any[]) => void;
let containerEmit: EmitFunction;
const _messageId = ref(1);
const _config = reactive<MessageConfig>({
    max: 0,
    duration: 0
});

export const setConfig = (cfg: MessageConfig, emit: EmitFunction) => {
    containerEmit = emit;
    (Object.keys(_config) as (keyof MessageConfig)[]).forEach((key) => {
        _config[key] = cfg[key];
    });
}

const _messages: Ref<Array<SnackbarMessage>> = ref([
    {
        id: "" + _messageId.value++,
        title: "Testing",
        message: "This is a test message",
        type: "success"
    },
    {
        id: "" + _messageId.value++,
        title: "Hello World",
        message: "This is a test message"
    }
]);
export const messages = readonly(_messages);

/**
 * A unique identifier to access the provided/injected method
 */
export const SnackbarSymbol = Symbol.for("vue3-snackbar");

export const add = (message: SnackbarMessage): void => {


    containerEmit('added', message);
}

export const clear = (): void => {}
