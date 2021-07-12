<template>
    <v-app>
        <v-app-bar color="secondary px-6" app>
            <header-partial />
        </v-app-bar>
        <v-main>
            <v-container class="pt-16">
                <v-card class="mx-auto title-card" elevation="0">
                    <v-row class="justify-space-between">
                        <v-col cols="12" md="6">
                            <h2
                                class="title-card--text px-4"
                            >Easily notify users of application processes with Vue 3 Snackbar. A fully customisable, snackbar/toast messaging hub.</h2>

                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar class="d-flex align-center">
                                        <v-icon :icon="mdiStackExchange" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>Automatically stacks new messages.</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar class="d-flex align-center">
                                        <v-icon :icon="mdiCompass" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>Choose from nine different locations for your hub.</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar class="d-flex align-center">
                                        <v-icon :icon="mdiTimerSand" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>Set messages to disappear automatically, or manually.</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar class="d-flex align-center">
                                        <v-icon :icon="mdiConnection" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>Fully compatible with the Composition API and Options API.</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar class="d-flex align-center">
                                        <v-icon :icon="mdiPaletteAdvanced" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>Customise the appearance and behaviour of your messages.</v-list-item-title>
                                </v-list-item>
                            </v-list>
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
</pre>
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
            <v-container style="max-width: 1100px">
                <v-row>
                    <v-col cols="6">
                        <div style="max-width: 400px" class="mr-auto">
                            <v-card class="d-flex flex-column pa-6">
                                <h4 class="mb-4">Component Properties</h4>
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
                                <div class="text-overline">Messages</div>
                                <div class="px-8">
                                    <div class="mb-4">
                                        <TextInput v-model="options.duration" label="Duration" />
                                    </div>
                                    <div class="mb-4">
                                        <Switch v-model:checked="options.dense" label="Dense" />
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <v-btn
                                        @click="addRandomMessage"
                                        color="secondary"
                                        block
                                    >Add Message</v-btn>
                                </div>
                                <div class="mb-4">
                                    <v-btn
                                        @click="snackbar.clear()"
                                        color="accent"
                                        block
                                    >Clear All Messages</v-btn>
                                </div>
                            </v-card>
                        </div>
                    </v-col>
                    <v-col cols="6" class="d-flex flex-column">
                        <h5>Component Code</h5>
                        <code class="align-self-center">
                            <pre v-text="code"></pre>
                        </code>
                        <h5 class="mt-4">Previous Message Code</h5>
                        <code class="align-self-center">
                            <pre
                                v-text="JSON.stringify(lastMessage, undefined, 2).trim()"
                                v-if="lastMessage"
                            ></pre>
                        </code>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer class="bg-primary">
            <v-container
                class="text-center text-caption"
            >Vue 3 Snackbar is released under an MIT licence. &copy; 2021 Craig Riley.</v-container>
        </v-footer>
    </v-app>
    <teleport to="body">
        <vue3-snackbar
            :top="options.top"
            :bottom="options.bottom"
            :left="options.left"
            :right="options.right"
            :duration="options.duration"
            :dense="options.dense"
        ></vue3-snackbar>
    </teleport>
</template>

<script setup>
import PrismCode from "./components/PrismCode";
import ExampleImage from "./assets/images/example.png";
import { reactive, computed, watch, ref } from "vue";
import Switch from "./components/Switch.vue";
import TextInput from "./components/TextInput.vue";
import headerPartial from "./partials/header.vue";
import { useSnackbar, SnackbarMessages } from "../src";
import { mdiConnection, mdiImage, mdiStackExchange, mdiCompass, mdiPaletteAdvanced, mdiTimerSand } from "@mdi/js";
import sampleMessages from "./helpers/sampleData";

import { mainJs, appTemplate, appScriptOptions, appScriptComposition } from "./helpers/codeExamples";

const lastMessage = ref(null);

watch(() => [...SnackbarMessages.value], (v) => {
    if (v[0]) lastMessage.value = JSON.parse(JSON.stringify(v[v.length - 1]));
    if (lastMessage.value && lastMessage.value.id) {
        delete lastMessage.value.id
    }
})

const options = reactive({
    top: false,
    bottom: true,
    left: false,
    right: true,
    duration: 0,
    dense: false
})

const code = computed(() => {
    const position = [];
    if (options.top) position.push('top');
    if (options.bottom) position.push('bottom');
    if (options.left) position.push('left');
    if (options.right) position.push('right');
    const other = [];
    if (options.dense) other.push('dense');
    return `<vue3-snackbar ${position.join(" ")} :duration="${options.duration}"${other.length > 0 ? ' ' + other.join(" ") : ''}>
</vue3-snackbar>`
})


const snackbar = useSnackbar();
const addRandomMessage = () => {
    snackbar.add(sampleMessages[Math.floor(Math.random() * sampleMessages.length)])
}
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