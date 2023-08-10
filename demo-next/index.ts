import { createApp } from "vue";
import { SnackbarService } from "../src-next";
import App from "./App.vue";
import "./style.css"

import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(vuetify);
app.use(SnackbarService, {
    global: true,
    window: true
});

app.mount("#app");
