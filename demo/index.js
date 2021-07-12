import { createApp } from "vue";
import { SnackbarService, Vue3Snackbar } from "../src";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(SnackbarService);
app.use(vuetify);
app.component("vue3-snackbar", Vue3Snackbar);

app.mount("#app");
