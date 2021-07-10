<template>
    <button @click="addRandomMessage">Add Message</button>
    <teleport to="body">
        <vue3-snackbar bottom right :duration="2000" dense></vue3-snackbar>
    </teleport>
</template>

<script setup>
import { useSnackbar } from "../";
import { mdiImage } from "@mdi/js";
const samples = [
    {
        type: 'success',
        title: 'Mission Accomplished',
        text: 'Something was completed'
    },
    {
        type: 'info',
        title: 'Important Information',
        text: 'Some important information will appear here',
        dismissable: false
    },
    {
        type: 'info',
        text: 'This information doesn\'t have a title',
        duration: 5000,
        dismissable: false
    },
    {
        type: 'warning',
        title: 'Here Be Dragons',
        text: 'This is a warning about something'
    },
    {
        type: 'error',
        title: 'Oh Damn',
        text: 'Something went horribly wrong. Bad luck.'
    },
    {
        title: "Custom Message",
        text: "This is some kind of custom message",
        background: "steelblue",
        icon: {
            path: mdiImage,
            type: "mdi"
        }
    }
]

const snackbar = useSnackbar();
const addRandomMessage = () => {
    snackbar.add(samples[Math.floor(Math.random() * samples.length)])
}
</script>