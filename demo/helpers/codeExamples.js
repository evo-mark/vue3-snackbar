export const mainJs = `// main.js
import { createApp } from "vue";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/styles";
import App from "./App.vue";
const app = createApp(App);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount("#app");`;

export const appTemplate = `<!-- App.vue -->
<template>
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>`;

export const appScriptOptions = `// App.vue - Options API
<script>
export default {
    methods: {
        successMessage() {
            this.$snackbar.add({
                type: 'success',
                text: 'This is a snackbar message'
            })
        }
    }
}
</script>`;

export const appScriptComposition = `// App.vue - Composition API
<script setup>
import { useSnackbar } from "vue3-snackbar";
const snackbar = useSnackbar();
snackbar.add({
    type: 'success',
    text: 'This is a snackbar message'
})
</script>`;
