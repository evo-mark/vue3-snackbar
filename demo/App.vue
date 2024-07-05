<template>
	<v-app>
		<v-app-bar color="secondary px-6" app>
			<HeaderPartial />
		</v-app-bar>
		<v-main>
			<v-container class="pt-16">
				<v-card class="mx-auto title-card" elevation="0">
					<v-row class="justify-space-between">
						<v-col cols="12" md="6">
							<h2 class="title-card--text px-4">
								Easily notify users of application processes with Vue 3 Snackbar. A fully customisable,
								snackbar/toast messaging hub.
							</h2>

							<v-list :items="featureList" />
						</v-col>
						<v-col cols="12" md="6" class="d-flex justify-end">
							<v-img :src="ExampleImage" class="example-image" />
						</v-col>
					</v-row>
				</v-card>
			</v-container>
			<v-container fluid class="bg-accent d-flex justify-center my-16">
				<code>
					<pre>
> npm install vue3-snackbar
> yarn add vue3-snackbar
</pre
					>
				</code>
			</v-container>
			<v-container>
				<v-row>
					<v-col cols="6" offset="3">
						<PrismCode :code="mainJs" language="js" />
					</v-col>
					<v-col cols="6" offset="3">
						<PrismCode :code="appTemplate" language="html" />
					</v-col>
					<v-col cols="5">
						<PrismCode :code="appScriptOptions" language="js" style="height: 100%" />
					</v-col>
					<v-col cols="2" class="d-flex align-center justify-center">
						<div class="text-h3">OR</div>
					</v-col>
					<v-col cols="5">
						<PrismCode :code="appScriptComposition" language="js" style="height: 100%" />
					</v-col>
				</v-row>
			</v-container>
			<v-container fluid class="bg-accent my-16" elevation="0">
				<h3 class="text-center text-uppercase text-bold" style="width: 100%">Sandbox</h3>
			</v-container>
			<v-container>
				<v-row>
					<v-col cols="8">
						<div class="mr-auto">
							<v-card class="d-flex flex-column pa-6" :elevation="4">
								<h4 class="mb-4">Component Properties</h4>

								<v-row>
									<v-col cols="6">
										<div class="text-overline mb-2">Messages</div>
										<div class="px-8">
											<div class="my-4" style="max-width: 200px">
												<v-text-field
													v-model="options.duration"
													label="Default Duration"
													suffix="ms"
												/>
											</div>
											<div class="my-4" style="max-width: 200px">
												<v-text-field
													v-model.number="options.limit"
													label="Message/Group Limit"
													type="number"
													clearable
													:min="0"
												/>
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.dense" label="Dense" />
											</div>
											<div class="mb-4">
												<Switch
													v-model:checked="options.shadow"
													label="Enable Message Shadows"
												/>
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.groups" label="Enable Groups" />
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.reverse" label="Reverse Stack Order" />
											</div>
											<div class="mb-4">
												<Switch
													v-model:checked="options.dismissOnActionClick"
													label="Dismiss on Action Click"
												/>
											</div>
										</div>
									</v-col>
									<v-col cols="6">
										<div class="text-overline mb-2">Border-Style Messages</div>
										<div class="px-8">
											<div class="mb-4">
												<v-select
													v-model="options.border"
													:items="borderOptions"
													label="Border Style"
													clearable
													hide-details
												/>
											</div>
											<div class="mb-4">
												<v-text-field
													v-model="options.baseBackgroundColor"
													label="Base Background Colour"
													:disabled="!options.border"
													hide-details
												/>
											</div>
											<div class="mb-4">
												<v-text-field
													v-model="options.backgroundColor"
													label="Background Colour"
													:disabled="!options.border"
													hide-details
												/>
											</div>
											<div class="mb-4">
												Background Opacity
												<v-slider
													v-model="options.backgroundOpacity"
													thumb-label
													:min="0"
													:max="1"
													:step="0.01"
													:disabled="!options.border"
													hide-details
												></v-slider>
											</div>
										</div>
									</v-col>
									<v-col cols="6">
										<div class="text-overline">Position</div>
										<div class="px-8">
											<div class="mb-4">
												<Switch v-model:checked="options.top" label="Top" />
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.bottom" label="Bottom" />
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.left" label="Left" />
											</div>
											<div class="mb-4">
												<Switch v-model:checked="options.right" label="Right" />
											</div>
										</div>
									</v-col>
									<v-col cols="6" align-self="end">
										<div class="text-overline mb-2">Actions</div>

										<div class="mb-4">
											<v-btn color="secondary" block @click="addRandomMessage">Add Message</v-btn>
										</div>
										<div class="mb-4">
											<v-btn color="accent" block @click="snackbar.clear()"
												>Clear All Messages</v-btn
											>
										</div>
									</v-col>
								</v-row>
							</v-card>
						</div>
					</v-col>
					<v-col cols="4" class="d-flex flex-column">
						<h5>Component Code</h5>
						<code class="align-self-center">
							<pre v-text="code"></pre>
						</code>
						<h5 class="mt-4">Previous Message Code</h5>
						<code class="align-self-center">
							<pre v-if="lastMessage" v-text="JSON.stringify(lastMessage, undefined, 2).trim()"></pre>
						</code>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-footer class="bg-primary">
			<v-container class="text-center text-caption"
				>Vue 3 Snackbar is released under an MIT licence. &copy;2021-{{ new Date().getFullYear() }} Craig
				Riley.</v-container
			>
		</v-footer>
	</v-app>
	<vue3-snackbar
		:top="options.top"
		:bottom="options.bottom"
		:left="options.left"
		:right="options.right"
		:duration="options.duration"
		:dense="options.dense"
		:groups="options.groups"
		:reverse="options.reverse"
		:shadow="options.shadow"
		:border="options.border"
		:background-opacity="options.backgroundOpacity"
		:background-color="options.backgroundColor"
		:base-background-color="options.baseBackgroundColor"
		:dismiss-on-action-click="options.dismissOnActionClick"
		:icon-presets="iconPresets"
		:limit="options.limit"
		@click:action="onActionClick"
	>
		<template #message-action="{ message }">
			<v-btn v-if="message.type === 'error'" color="primary">Testing</v-btn>
		</template>
	</vue3-snackbar>
</template>

<script setup>
import PrismCode from "./components/PrismCode";
import ExampleImage from "./assets/images/example.png";
import { reactive, computed, watch, ref } from "vue";
import Switch from "./components/Switch.vue";
import HeaderPartial from "./partials/header.vue";
import { useSnackbar, SnackbarMessages } from "../src";
import { mdiConnection, mdiStackExchange, mdiCompass, mdiPaletteAdvanced, mdiTimerSand } from "@mdi/js";
import sampleMessages from "./helpers/sampleData";

import { mainJs, appTemplate, appScriptOptions, appScriptComposition } from "./helpers/codeExamples";
import { mdiAccessPoint } from "@mdi/js";

let lastMessage = ref(null);

watch(
	() => [...SnackbarMessages.value],
	(v) => {
		if (v[0]) lastMessage.value = JSON.parse(JSON.stringify(v[v.length - 1]));
		if (lastMessage.value && lastMessage.value.id) {
			delete lastMessage.value.id;
		}
	},
);

const options = reactive({
	top: false,
	bottom: true,
	left: false,
	right: true,
	duration: 0,
	limit: null,
	dense: false,
	groups: false,
	reverse: false,
	shadow: false,
	border: "",
	backgroundOpacity: 0.12,
	backgroundColor: "currentColor",
	baseBackgroundColor: "#fff",
	dismissOnActionClick: true,
});

const code = computed(() => {
	const position = [];
	if (options.top) position.push("top");
	if (options.bottom) position.push("bottom");
	if (options.left) position.push("left");
	if (options.right) position.push("right");
	const other = [];
	if (options.duration) other.push(`:duration="${options.duration}"`);
	if (options.limit) other.push(`:limit="${options.limit}"`);

	if (options.border) other.push(`border="${options.border}"`);
	if (options.dense) other.push("dense");

	if (options.shadow) other.push("shadow");
	if (options.groups) other.push("groups");
	if (options.dismissOnActionClick === false) other.push(`:dismiss-on-action-click="false"`);
	return `<vue3-snackbar ${position.join(" ")} ${other.length > 0 ? " " + other.join(" ") : ""}>
</vue3-snackbar>`;
});

const snackbar = useSnackbar();
const addRandomMessage = () => {
	snackbar.add(sampleMessages[Math.floor(Math.random() * sampleMessages.length)]);
};

const featureList = [
	{ title: "Automatically stacks new messages.", props: { prependIcon: mdiStackExchange } },
	{ title: "Choose from nine different locations for your hub.", props: { prependIcon: mdiCompass } },
	{ title: "Set messages to disappear automatically, or manually.", props: { prependIcon: mdiTimerSand } },
	{ title: "Fully compatible with the Composition API and Options API.", props: { prependIcon: mdiConnection } },
	{ title: "Customise the appearance and behaviour of your messages.", props: { prependIcon: mdiPaletteAdvanced } },
];

const borderOptions = [
	{
		value: "",
		title: "No Border",
	},
	{
		value: "left",
		title: "Left Border",
	},
	{
		value: "right",
		title: "Right Border",
	},
	{
		value: "top",
		title: "Top Border",
	},
	{
		value: "bottom",
		title: "Bottom Border",
	},
];

const onActionClick = (message) => {
	console.log(message);
};

const iconPresets = {
	success: {
		path: mdiAccessPoint,
	},
};
</script>

<style lang="scss" scoped>
.example-image {
	max-width: 500px;
	max-height: 500px;
}

.title-card {
	max-width: 1100px;

	&--text {
		opacity: 0.6;
	}
}

.bg-accent {
	background-color: rgb(var(--v-theme-accent));
	color: rgb(var(--v-theme-on-accent));
}

pre {
	white-space: pre-wrap; /* css-3 */
	white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
	white-space: -pre-wrap; /* Opera 4-6 */
	white-space: -o-pre-wrap; /* Opera 7 */
	word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>

<style lang="scss">
@import "prismjs/themes/prism-okaidia.css";

.v-app-bar__content {
	max-height: 100%;
}
</style>
