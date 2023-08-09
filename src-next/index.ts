import type { Plugin, App } from "vue";
import type { SnackbarServiceConfig, SnackbarServiceCentre } from "types";
import { isBrowser } from "./helpers/propTypes";
import { add, clear } from "./store/messages";
import "./style.css";

declare global {
    interface Window {
      $snackbar: SnackbarServiceCentre;
    }
  }

  declare module 'vue' {
    interface ComponentCustomProperties {
      $snackbar: SnackbarServiceCentre
    }
  }

export { default as Vue3Snackbar } from "./components/container";
export const SnackbarService: Plugin = {
    install(app: App, config: SnackbarServiceConfig = {}) {

        const serviceCentre: SnackbarServiceCentre = {
            add,
            clear
        }

        if (config.global) {
		    app.config.globalProperties.$snackbar = serviceCentre;
        }
        if (config.window && isBrowser) {
            window.$snackbar = serviceCentre;
        }
    }
}
