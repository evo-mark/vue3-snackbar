const HTMLElementShim = typeof window !== "undefined" ? HTMLElement : Object;

/**
 * @typedef {import('vue').VNode} VNode
 * @typedef {import('vue').Component} Component
 * @typedef {import('vue').FunctionalComponent} FunctionalComponent
 * @typedef {VNode | Component | FunctionalComponent | (() => VNode)} Renderable
 */

/**
 * @typedef { Object } Vue3Icon
 * @property { string } type The icon type, e.g. "mdi" or "simple-icons"
 * @property { Object } faIcon A FontAwesome icon object
 * @property { Object|string|Array } path The SVG path for the icon
 * @property { number|string } size The size of the icon
 * @property { string } viewBox The SVG view-box size
 * @property { "horizontal"|"vertical"|"both"|null } flip Flip the icon on its given axis/axes
 * @property { number|string } rotate Degrees to rotate the icon
 */

/**
 * @typedef { "alert"|"log"|"marquee"|"status"|"timer" } LiveRegionRole
 */

/**
 * @typedef { Object } IconPresets
 * @property { Vue3Icon } success The vue3-icon props for a message type of success
 * @property { Vue3Icon } warning The vue3-icon props for a message type of warning
 * @property { Vue3Icon } info The vue3-icon props for a message type of info
 * @property { Vue3Icon } error The vue3-icon props for a message type of error
 */

/**
 * @typedef { Object } SnackbarMessage
 * @property { "warning"|"error"|"info"|"success"|null } [type] The classification of the message
 * @property { string } [title] An optional title string for the message
 * @property { string } text The text content of the message
 * @property { string } [background] The background color of the message
 * @property { number } [duration] In ms, the time before the message expires
 * @property { boolean } [dismissible] Can the message be dismissed manually?
 * @property { LiveRegionRole } [role] The aria-role of the message
 * @property { Renderable } [action] Any valid Vue component to render in the action slot
 * @property {(ev: SnackbarMessage, wasDismissed: boolean) => void} [onRemoved] A callback for when the message is removed from the stack
 */

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
 * @property { "top"|"bottom"|"left"|"right"|"start"|"end"} border Use the alternative border-style messages
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
 * @property { number } limit The maximum number of messages/message groups to show
 * @property { IconPresets } iconPresets The preset icon settings for standard message types
 * @property { string } contentWidth The CSS width string for the snackbar content
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
	start: {
		type: Boolean,
		default: false,
	},
	end: {
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
	iconPresets: {
		type: Object,
		default: () => ({}),
	},
	messageTextColor: {
		type: String,
		default: "#fff",
	},
	messageIconColor: {
		type: String,
		default: "currentColor",
	},
	/* *********************************************
	 * BACKGROUND PROPS
	 * ******************************************* */
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
	/* *********************************************
	 * BEHAVIOUR PROPS
	 * ******************************************* */
	duration: {
		type: [Number, String],
		default: null,
	},
	reverse: {
		type: Boolean,
		default: false,
	},
	limit: {
		type: Number,
		default: null,
	},
	dismissOnActionClick: {
		type: Boolean,
		default: true,
	},
	groups: {
		type: Boolean,
		default: false,
	},
	attach: {
		type: [String, HTMLElementShim],
		default: "body",
	},
	/* ******************************************
	 * OTHER PROPS
	 ****************************************** */
	border: {
		type: String,
		default: "",
		validator: (v) => ["top", "bottom", "left", "right", "start", "end", ""].includes(v),
	},
	messageClass: {
		type: String,
	},
	messageActionClass: {
		type: String,
		default: "vue3-snackbar-message-action",
	},
	zIndex: {
		type: Number,
		default: 10000,
	},
	dense: {
		type: Boolean,
		default: false,
	},
	shadow: {
		type: [Boolean, String],
		default: false,
		validator: (v) => v === true || v === false || ["xs", "sm", "md", "lg", "xl", "2xl"].includes(v),
	},
	contentWidth: {
		type: String,
		default: "min(50vw, 350px)",
	},
	borderWidth: {
		type: [String, Number],
		default: 8,
	},
};
