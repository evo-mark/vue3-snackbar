import type { Plugin, App } from "vue";
import type { SnackbarServiceConfig, SnackbarServiceCentre } from "types";
import { isBrowser } from "./helpers/propTypes";
import { add, clear, SnackbarSymbol } from "./store/messages";
import { default as Vue3Snackbar } from "./components/container";
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


const SnackbarService: Plugin = {
    install(app: App, config: SnackbarServiceConfig = {}) {

        const serviceCentre: SnackbarServiceCentre = {
            add,
            clear
        }

        if (config.global) {
		    app.config.globalProperties.$snackbar = serviceCentre;
            app.component('vue3-snackbar', Vue3Snackbar);
        }
        if (config.window && isBrowser) {
            window.$snackbar = serviceCentre;
        }

        app.provide(SnackbarSymbol, serviceCentre);
    }
}

export {
    SnackbarService,
    Vue3Snackbar
}
