import { ref, readonly } from "vue";

const _messages = ref([
    {
        title: "Testing",
        message: "This is a test message"
    },
    {
        title: "Hello World",
        message: "This is a test message"
    }
]);
export const messages = readonly(_messages);