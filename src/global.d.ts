import { SnackbarService } from "./service";

declare module "vue" {
	interface ComponentCustomProperties {
		/** @type {SnackbarService} */
		$snackbar: SnackbarService;
	}
}
