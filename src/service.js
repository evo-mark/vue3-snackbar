import EventBus from "./eventbus";
import { inject } from "vue";

/**
 * A unique identifier to access the provided/injected method
 */
export const SnackbarSymbol = Symbol();

/**
 * Composable which allows accessing the Toast service in Composition API
 * @returns Snackbar
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
	install: (app) => {
		const SnackbarService = {
			add: (message) => {
				EventBus.$emit("add", message);
			},
			clear: () => {
				EventBus.$emit("clear");
			},
		};
		app.config.globalProperties.$snackbar = SnackbarService;
		if (window) window.$snackbar = SnackbarService;
		app.provide(SnackbarSymbol, SnackbarService);
	},
};
