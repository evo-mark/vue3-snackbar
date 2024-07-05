import configPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import js from "@eslint/js";

export default [
	js.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	configPrettier,
	{
		languageOptions: {
			globals: {
				...globals.es2021,
			},
		},
	},
];
