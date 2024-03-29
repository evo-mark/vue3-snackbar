import vue from "@vitejs/plugin-vue";
import path from "path";

export default {
	plugins: [vue()],
	build: {
		lib: {
			entry: path.resolve("./src/index.js"),
			name: "Vue3Snackbar",
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
};
