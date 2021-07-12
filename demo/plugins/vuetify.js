import "vuetify/lib/styles/main.sass";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi-svg";
import * as components from "./components";
// import * as directives from "vuetify/lib/directives";

const vueLightTheme = {
	dark: false,
	colors: {
		primary: "#41b883",
		secondary: "#34495e",
		accent: "#fffde7",
	},
	variables: {},
};

export default createVuetify({
	components,
	//	directives,
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
	theme: {
		defaultTheme: "vueLightTheme",
		themes: {
			vueLightTheme,
		},
	},
});
