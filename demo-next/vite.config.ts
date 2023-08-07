import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default {
	base: "/vue3-snackbar/",
	assetsDir: "",
	plugins: [vue(), vuetify({ autoImport: true, styles: {
        configFile: "./plugins/vuetify-settings.scss",
    } })],
};
