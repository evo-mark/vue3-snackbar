import { createApp } from "vue";
import { SnackbarService } from "../src";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(SnackbarService);
app.use(vuetify);

app.mount("#app");
