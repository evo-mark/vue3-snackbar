import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: resolve("./index"),
			name: "Vue3Snackbar",
            fileName: "vue3-snackbar",
			formats: ["es", "umd", "cjs", "iife"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});
