/**
 * @property top - Render the snackbar at the top of the screen
 * @property bottom - Render the snackbar at the bottom of the screen
 * @property left - Render the snackbar at the left of the screen
 * @property right - Render the snackbar at the right of the screen
 * @property success - Base colour to use for success messages
 * @property error - Base colour to use for error messages
 * @property warning - Base colour to use for warning messages
 * @property info - Base colour to use for info messages
 * @property messageTextColor - Text colour for the default message
 * @property messageIconColor - Icon colour for the default message
 * @property attach - HTML element to attach the container to
 * @property border - Use the alternative border-style messages
 * @property backgroundOpacity - The background colour opacity when using border-style messages
 * @property backgroundColor - Background colour when using border-style messages
 * @property baseBackgroundColor - Base background colour when using border-style messages
 * @property duration - The default time in ms for messages to stay on the screen
 * @property messageClass - Class string to add to each message
 * @property zIndex - The z-index value of the snackbar container
 * @property dense - Reduce padding on the y-axis for snackbar messages
 * @property reverse - Reverse the display order of snackbar messages
 * @property groups - Use snackbar groups with messages with the same group-key
 * @property shadow - Add shadow effect to messages
 */
declare type SnackbarProps = {
	top: boolean;
	bottom: boolean;
	left: boolean;
	right: boolean;
	success: string;
	error: string;
	warning: string;
	info: string;
	messageTextColor: string;
	messageIconColor: string;
	attach: string | HTMLElementShim;
	border: "top" | "bottom" | "left" | "right";
	backgroundOpacity: string | number;
	backgroundColor: string;
	baseBackgroundColor: string;
	duration: number;
	messageClass: string;
	zIndex: number;
	dense: boolean;
	reverse: boolean;
	groups: boolean;
	shadow: boolean;
};

declare type add = (message: SnackbarMessage) => void;

declare type clear = () => void;

/**
 * @property add - Add a message to the stack
 * @property clear - Clear messages from the stack
 */
declare type SnackbarService = {
	add: add;
	clear: clear;
};

/**
 * Composable which allows accessing the Toast service in Composition API
 */
declare function useSnackbar(): SnackbarService;

/**
 * @property add - Add a message to the stack
 * @property clear - Clear messages from the stack
 */
declare type SnackbarService = {
	add: add;
	clear: clear;
};
