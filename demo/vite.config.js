import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";
import { resolve as resolvePath } from "node:path";

export default defineConfig(({ mode }) => {
	const resolve =
		mode === "development"
			? {
					alias: {
						"vue3-snackbar/styles": resolvePath("../src/style.postcss"),
						"vue3-snackbar": resolvePath("../src"),
					},
				}
			: {};
	return {
		resolve,
		plugins: [vue(), vuetify({ autoImport: true })],
	};
});
