const HTMLElementShim = typeof window !== "undefined" ? HTMLElement : Object;

export const propsModel = {
	/* ******************************************
	 * LOCATION PROPS
	 ****************************************** */
	/**
	 * Render the snackbar at the top of the screen
	 */
	top: {
		type: Boolean,
		default: false,
	},
	/**
	 * Render the snackbar at the bottom of the screen
	 */
	bottom: {
		type: Boolean,
		default: false,
	},
	/**
	 * Render the snackbar on the left of the screen
	 */
	left: {
		type: Boolean,
		default: false,
	},
	/**
	 * Render the snackbar on the right of the screen
	 */
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
		default: "#fff",
	},
	/* ******************************************
	 * OTHER PROPS
	 ****************************************** */
	/**
	 * The element to teleport the snackbar container to
	 */
	attach: {
		type: [String, HTMLElementShim],
		default: "body",
	},
	/**
	 * Use the alternate border style for messages
	 */
	border: {
		type: String,
		default: "",
		validator: (v) => ["top", "bottom", "left", "right", ""].includes(v),
	},
	/**
	 * The background colour opacity when using border-style messages
	 */
	backgroundOpacity: {
		type: [String, Number],
		default: 0.12,
		validator: (v) => {
			return !isNaN(parseFloat(v)) && isFinite(v);
		},
	},
	/**
	 * Background colour when using border-style messages
	 */
	backgroundColor: {
		type: String,
		default: "currentColor",
	},
	/**
	 * Background colour when using border-style messages
	 */
	baseBackgroundColor: {
		type: String,
		default: "#fff",
	},
	/**
	 * The default time in ms for messages to stay on the screen
	 */
	duration: {
		type: Number,
		default: null,
	},
	/**
	 * Class string to add to each message
	 */
	messageClass: {
		type: String,
	},
	/**
	 * The z-index value of the snackbar container
	 */
	zIndex: {
		type: Number,
		default: 10000,
	},
	/**
	 * Reduce padding on the y-axis for snackbar messages
	 */
	dense: {
		type: Boolean,
		default: false,
	},
	/**
	 * Reverse the display order of snackbar messages
	 */
	reverse: {
		type: Boolean,
		default: false,
	},
	/**
	 * Use snackbar groups with messages with the same group-key
	 */
	groups: {
		type: Boolean,
		default: false,
	},
	/**
	 * Add shadow effect to messages
	 */
	shadow: {
		type: Boolean,
		default: false,
	},
};
