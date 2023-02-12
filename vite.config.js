import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default {
	root: "demo",
	base: "/vue3-snackbar/",
	assetsDir: "",
	plugins: [vue({ reactivityTransform: true }), vuetify({ autoImport: true })],
};
