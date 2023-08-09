import { ref, readonly, type Ref } from "vue";
import type { SnackbarMessage } from "../types";

const _messages: Ref<Array<SnackbarMessage>> = ref([
    {
        id: "1",
        title: "Testing",
        message: "This is a test message",
        type: "success"
    },
    {
        id: "2",
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

}

export const clear = (): void => {}
