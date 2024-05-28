import { mdiImage } from "@mdi/js";

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
