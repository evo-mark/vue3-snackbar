# Vue 3 Snackbar

Add a snackbar/toast service to your Vue 3 application and easily alert users about app processes.

**[Demo Site](https://craigrileyuk.github.io/vue3-snackbar/)**

## Installation

```
npm install vue3-snackbar
```
or
```
yarn add vue3-snackbar
```

Don't forget to import the library's stylesheet into your app.

*main.js*
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

*App.vue*
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

| Property        | Type    | Default   | Description                                                                 |
| --------------- | ------- | --------- | --------------------------------------------------------------------------- |
| **top**         | Boolean | false     | *Position the snackbar container at the top of the screen*                  |
| **bottom**      | Boolean | false     | *Position the snackbar container at the bottom of the screen*               |
| **left**        | Boolean | false     | *Position the snackbar container towards the left of the screen*            |
| **right**       | Boolean | false     | *Position the snackbar container towards the right of the screen*           |
| **success**     | String  | "#4caf50" | *Override the background colour of success-type messages*                   |
| **error**       | String  | "#ff5252" | *Override the background colour of error-type messages*                     |
| **warning**     | String  | "#fb8c00" | *Override the background colour of warning-type messages*                   |
| **info**        | String  | "#2196f3" | *Override the background colour of info-type messages*                      |
| **duration**    | Number  | 4000      | *The default time for messages to be displayed before being removed*        |
| **messageClass**| String  | null      | *Adds a custom class to every message*                                      |
| **zindex**      | Number  | 10000     | *The z-index setting for the snackbar container*                            |
| **dense**       | Boolean | false     | *Reduce the y-axis padding around each message*                             |
---
## Methods

`snackbar.add({})`

Adds a new snackbar message to the stack

| Property        | Type    | Default | Description                                                                 |
| --------------- | ------- | ------- | --------------------------------------------------------------------------- |
| **type**        | String  | null    | *Use a preset icon and colour scheme for common alert types (see below)*    |
| **background**  | String  | null    | *Set the background colour manually for the message. Accepts any CSS value* |
| **title**       | String  | ""      | *The title of the message*                                                  |
| **text**        | String  | ""      | *The body of the message*                                                   |
| **dismissible** | Boolean | true    | *Allow the user to manually dismiss the message via a close button*         |
| **icon**        | Object  | {}      | *Manually set the icon for the message (see below)*                         |

> Type: success, error, warning, info

> Icon: see the [vue3-icon documentation](https://www.npmjs.com/package/vue3-icon) for object props.

---

`snackbar.clear()`

Remove all snackbar messages from the stack.
