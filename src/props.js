const HTMLElementShim = typeof window !== "undefined" ? HTMLElement : Object;

/**
 * @typedef { Object } SnackbarProps
 * @property { boolean } top Render the snackbar at the top of the screen
 * @property { boolean } bottom Render the snackbar at the bottom of the screen
 * @property { boolean } left Render the snackbar at the left of the screen
 * @property { boolean } right Render the snackbar at the right of the screen
 * @property { string } success Base colour to use for success messages
 * @property { string } error Base colour to use for error messages
 * @property { string } warning Base colour to use for warning messages
 * @property { string } info Base colour to use for info messages
 * @property { string } messageTextColor Text colour for the default message
 * @property { string } messageIconColor Icon colour for the default message
 * @property { string|HTMLElementShim } attach HTML element to attach the container to
 * @property { "top"|"bottom"|"left"|"right"} border Use the alternative border-style messages
 * @property { string|number } backgroundOpacity The background colour opacity when using border-style messages
 * @property { string } backgroundColor Background colour when using border-style messages
 * @property { string } baseBackgroundColor Base background colour when using border-style messages
 * @property { number } duration The default time in ms for messages to stay on the screen
 * @property { string } messageClass Class string to add to each message
 * @property { number } zIndex The z-index value of the snackbar container
 * @property { boolean } dense Reduce padding on the y-axis for snackbar messages
 * @property { boolean } reverse Reverse the display order of snackbar messages
 * @property { boolean } groups Use snackbar groups with messages with the same group-key
 * @property { boolean } shadow Add shadow effect to messages
 *
 */
export const propsModel = {
	/* ******************************************
	 * LOCATION PROPS
	 ****************************************** */
	top: {
		type: Boolean,
		default: false,
	},
	bottom: {
		type: Boolean,
		default: false,
	},
	left: {
		type: Boolean,
		default: false,
	},
	right: {
		type: Boolean,
		default: false,
	},
	/* ******************************************
	 * COLOUR PROPS
	 ****************************************** */
	success: {
		type: String,
		default: "#4caf50",
	},
	error: {
		type: String,
		default: "#ff5252",
	},
	warning: {
		type: String,
		default: "#fb8c00",
	},
	info: {
		type: String,
		default: "#2196f3",
	},
	messageTextColor: {
		type: String,
		default: "#fff",
	},
	messageIconColor: {
		type: String,
		default: "currentColor",
	},
	/* ******************************************
	 * OTHER PROPS
	 ****************************************** */
	attach: {
		type: [String, HTMLElementShim],
		default: "body",
	},
	border: {
		type: String,
		default: "",
		validator: (v) => ["top", "bottom", "left", "right", ""].includes(v),
	},
	backgroundOpacity: {
		type: [String, Number],
		default: 0.12,
		validator: (v) => {
			return !isNaN(parseFloat(v)) && isFinite(v);
		},
	},
	backgroundColor: {
		type: String,
		default: "currentColor",
	},
	baseBackgroundColor: {
		type: String,
		default: "#fff",
	},
	duration: {
		type: [Number, String],
		default: null,
	},
	messageClass: {
		type: String,
	},
	zIndex: {
		type: Number,
		default: 10000,
	},
	dense: {
		type: Boolean,
		default: false,
	},
	reverse: {
		type: Boolean,
		default: false,
	},
	groups: {
		type: Boolean,
		default: false,
	},
	shadow: {
		type: Boolean,
		default: false,
	},
};
