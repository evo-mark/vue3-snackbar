import configPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([".gitignore"]),
	{
		files: ["src/**/*.js", "src/**/*.vue"],
	},
	js.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	configPrettier,
	{
		languageOptions: {
			globals: {
				...globals.es2021,
				...globals.browser,
			},
		},
	},
]);
