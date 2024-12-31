import { mdiImage } from "@mdi/js";
import { h } from "vue";

export default [
	{
		type: "success",
		title: "Mission Accomplished",
		text: "Something was completed",
	},
	{
		type: "info",
		title: "Important Information",
		text: "Some important information will appear here",
		dismissible: false,
	},
	{
		type: "info",
		text: "This message doesn't have a title",
		duration: 15000,
		dismissible: false,
	},
	{
		type: "warning",
		title: "Here Be Dragons",
		text: "This is a warning about something",
	},
	{
		type: "error",
		title: "Oh Damn",
		text: "Something went horribly wrong. Bad luck.",
	},
	{
		type: "info",
		title: "Added to Cart",
		text: "4x Brawndo 500ml added to cart",
		action: {
			props: {
				message: Object,
			},
			setup() {
				return () => h("button", {}, "Go to Checkout");
			},
		},
	},
	{
		title: "Custom Message",
		text: "This is a message with a custom background and icon",
		background: "steelblue",
		icon: {
			path: mdiImage,
			type: "mdi",
		},
		textColor: "#99ff99",
		iconColor: "#fff",
	},
];
