import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

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
