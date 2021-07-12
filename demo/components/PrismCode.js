import Prism from "prismjs";
import { h } from "vue";

export default {
	props: {
		code: String,
		inline: {
			type: Boolean,
			default: false,
		},
		language: {
			type: String,
			default: "markup",
		},
	},
	setup(props, context) {
		const code =
			props.code ||
			(context.children && context.children.length > 0
				? context.children[0].text
				: "");
		const language = props.language;
		const prismLanguage = Prism.languages[language];
		const className = `language-${language}`;

		if (process.env.NODE_ENV === "development" && !prismLanguage) {
			throw new Error(
				`Prism component for language "${language}" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`
			);
		}

		return () =>
			h(
				"pre",
				{
					class: [context.attrs.class, className],
				},
				[
					h("code", {
						class: className,
						innerHTML: Prism.highlight(code, prismLanguage),
					}),
				]
			);
	},
};
