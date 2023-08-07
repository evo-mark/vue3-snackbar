import { createApp } from "vue";
import { Vue3Snackbar } from "../src-next";
import App from "./App.vue";
import "./style.css"

import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(vuetify);
app.component("vue3-snackbar", Vue3Snackbar);

app.mount("#app");
