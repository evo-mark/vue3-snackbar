import EventBus from "./eventbus";
import { inject, ref } from "vue";

export const messages = ref([]);
export const SnackbarSymbol = Symbol();

/**
 * @callback add
 * @param { SnackbarMessage } message
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
