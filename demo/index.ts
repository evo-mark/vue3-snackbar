import { createApp } from "vue";
import { SnackbarService } from "vue3-snackbar";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import "vue3-snackbar/styles";

const app = createApp(App);

app.use(SnackbarService);
app.use(vuetify);

app.mount("#app");
