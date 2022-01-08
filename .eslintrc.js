export default {
	root: true,
	env: {
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
	rules: {},
	globals: {
		defineProps: "readonly",
		defineEmits: "readonly",
		defineExpose: "readonly",
		$: "readonly",
		$$: "readonly",
		$ref: "readonly",
		$computed: "readonly",
		$shallowRef: "readonly",
	},
};
