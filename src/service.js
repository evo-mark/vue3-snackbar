import EventBus from "./eventbus";
import { inject, ref } from "vue";

/**
 * @type { import("vue").Ref<import("./props").SnackbarMessage[]>}
 */
export const messages = ref([]);
export const SnackbarSymbol = Symbol();

const hashCode = (s) => Math.abs(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));

let messageId = 1;

EventBus.$on("add", (ev) => {
	ev = { ...ev };
	if (!ev.group) ev.group = hashCode(`${ev.type}${ev.title}${ev.text}`).toString(16);

	ev.id = messageId;
	messageId++;

	messages.value.push(ev);
});

/**
 * @callback add
 * @param { import("./props").SnackbarMessage } message
 * @returns { void }
 */

/**
 * @callback clear
 * @returns { void }
 */

/**
 * @typedef { Object } SnackbarService
 * @property { add } add Add a message to the stack
 * @property { clear } clear Clear messages from the stack
 */

/**
 * Composable which allows accessing the Toast service in Composition API
 * @returns { SnackbarService }
 */
export function useSnackbar() {
	const Snackbar = inject(SnackbarSymbol);
	if (!Snackbar) {
		throw new Error("No Snackbar provided!");
	}

	return Snackbar;
}

/**
 * Vue app install. Global property for Options API and provided service for Composition API
 */
export const SnackbarService = {
	install: (app, config = {}) => {
		const { disableGlobals = false } = config;

		const SnackbarService = {
			add: (message) => {
				EventBus.$emit("add", message);
			},
			clear: () => {
				EventBus.$emit("clear");
			},
		};
		if (disableGlobals !== true) {
			app.config.globalProperties.$snackbar = SnackbarService;
			if (typeof window !== "undefined") window.$snackbar = SnackbarService;
		}
		app.provide(SnackbarSymbol, SnackbarService);
	},
};
