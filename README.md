# Vue 3 Snackbar

[![NPM Version](https://img.shields.io/npm/v/vue3-snackbar.svg?style=flat-square)](https://www.npmjs.com/package/vue3-snackbar)
[![Licence: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=flat-square)](LICENCE)
[![NPM Downloads](https://img.shields.io/npm/dt/vue3-snackbar.svg?style=flat-square)](https://www.npmjs.com/package/vue3-snackbar)

Add a snackbar/toast service to your Vue 3 application and easily alert users about app processes.

**[Demo Site](https://craigrileyuk.github.io/vue3-snackbar/)**

## Migrating to v2

-   Prop `zindex` was renamed to `zIndex`, you should switch to passing `<vue3-snackbar :z-index="99">` now if required.
-   Styles are now exposed via exports, import path should be changed to `import "vue3-snackbar/styles";`.
-   Wrapping `<teleport>` around the component is no longer required. It will now teleport to the end of the `<body>` section by default. This can be overriden via the new `attach` prop.

## Installation

```
npm install vue3-snackbar
```

or

```
yarn add vue3-snackbar
```

Don't forget to import the library's stylesheet into your app.

_main.js_

```js
import { createApp } from "vue";
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
import App from "./App.vue";
const app = createApp(App);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount("#app");
```

_App.vue_

```html
<template>
	<!-- While teleporting the snackbar isn't required, it can help resolve z-index issues -->
	<teleport to="body">
		<vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
	</teleport>
</template>
```

```js
// Composition API
<script setup>
import { useSnackbar } from "vue3-snackbar";
const snackbar = useSnackbar();
snackbar.add({
    type: 'success',
    text: 'This is a snackbar message'
})
</script>
// Options API
<script>
export default {
    methods: {
        successMessage() {
            this.$snackbar.add({
                type: 'success',
                text: 'This is a snackbar message'
            })
        }
    }
}
</script>
```

---

## Props

| Property                | Type            | Default        | Description                                                                 |
| ----------------------- | --------------- | -------------- | --------------------------------------------------------------------------- |
| **top**                 | Boolean         | false          | _Position the snackbar container at the top of the screen_                  |
| **bottom**              | Boolean         | false          | _Position the snackbar container at the bottom of the screen_               |
| **left**                | Boolean         | false          | _Position the snackbar container towards the left of the screen_            |
| **right**               | Boolean         | false          | _Position the snackbar container towards the right of the screen_           |
| **success**             | String          | "#4caf50"      | _Override the background colour of success-type messages_                   |
| **error**               | String          | "#ff5252"      | _Override the background colour of error-type messages_                     |
| **warning**             | String          | "#fb8c00"      | _Override the background colour of warning-type messages_                   |
| **info**                | String          | "#2196f3"      | _Override the background colour of info-type messages_                      |
| **duration**            | Number          | 4000           | _The default time for messages to be displayed before being removed_        |
| **messageClass**        | String          | null           | _Adds a custom class to every message_                                      |
| **zindex**              | Number          | 10000          | _The z-index setting for the snackbar container_                            |
| **dense**               | Boolean         | false          | _Reduce the y-axis padding around each message_                             |
| **shadow**              | Boolean         | false          | _Add shadows to the displayed messages_                                     |
| **groups**              | Boolean         | false          | _Group messages with the same group-key_                                    |
| **reverse**             | Boolean         | false          | _Reverse the stacking order of snackbar messages_                           |
| **border**              | String          | ""             | _"left","right","top","bottom": Choose a setting for border-style messages_ |
| **backgroundOpacity**   | [String,Number] | 0.12           | _(with border-style messages) Set the opacity of the background_            |
| **backgroundColor**     | String          | "currentColor" | _(with border-style messages) Set the colour of the background_             |
| **baseBackgroundColor** | String          | "#fff"         | _(with border-style messages) Set the base colour of the background_        |

---

## Methods

`snackbar.add({})`

Adds a new snackbar message to the stack

| Property        | Type    | Default     | Description                                                                                                |
| --------------- | ------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| **type**        | String  | null        | _Use a preset icon and colour scheme for common alert types (see below)_                                   |
| **background**  | String  | null        | _Set the background colour manually for the message. Accepts any CSS value_                                |
| **title**       | String  | ""          | _The title of the message_                                                                                 |
| **text**        | String  | ""          | _The body of the message_                                                                                  |
| **dismissible** | Boolean | true        | _Allow the user to manually dismiss the message via a close button_                                        |
| **icon**        | Object  | {}          | _Manually set the icon for the message (see below)_                                                        |
| **groupKey**    | String  | (see desc.) | _Message group key (for when groups are enabled). Defaults to a string hash based on type, title and text_ |

> Type: success, error, warning, info

> Icon: see the [vue3-icon documentation](https://www.npmjs.com/package/vue3-icon) for object props.

---

`snackbar.clear()`

Remove all snackbar messages from the stack.

---

## Events

Event emitted by the component. You can subscribe to these by using `@` or `v-on:` on the component in your template.

| Event         | Parameters       | Description                                                               |
| ------------- | ---------------- | ------------------------------------------------------------------------- |
| **added**     | Message {object} | _Emitted when a snackbar message is added to the stack_                   |
| **removed**   | Message {object} | _Emitted when a snackbar message times out and is removed from the stack_ |
| **dismissed** | Message {object} | _Emitted when a message is manually dismissed from the stack_             |
| **cleared**   | _none_           | _Emitted when all messages are cleared from the stack_                    |
