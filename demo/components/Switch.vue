<template>
    <label class="container">
        <input
            v-bind="$attrs"
            class="input"
            type="checkbox"
            :checked="checked"
            @change="$emit('update:checked', $event.target.checked)"
        />
        <span class="switch"></span>
        <span class="label">{{ label }}</span>
    </label>
</template>

<script setup>
defineOptions({
    inheritAttrs: false,
    name: "Switch"
})
defineProps({
    label: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },

})
</script>

<style lang="scss" scoped>
.container {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.label {
    margin-left: 12px;
    color: #1a202c;
}

/* Visually hide the checkbox input */
.input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;

    &:checked + .switch {
        /* Teal background */
        background-color: rgb(var(--v-theme-primary));

        &::before {
            border-color: rgb(var(--v-theme-primary));
            /* Move the inner circle to the right */
            transform: translateX(
                calc(var(--switch-container-width) - var(--switch-size))
            );
        }
    }
}

.switch {
    --gray: #cbd5e0;
    --light-gray: #e2e8f0;
    --dark-gray: #a0aec0;
    --switch-container-width: 50px;
    --switch-size: calc(var(--switch-container-width) / 2);

    transition: background-color 0.25s ease-in-out;

    display: flex;
    align-items: center;
    position: relative;
    height: var(--switch-size);
    flex-basis: var(--switch-container-width);

    border-radius: var(--switch-size);
    background-color: #e2e8f0;
}

.switch::before {
    content: "";
    position: absolute;

    left: 1px;
    height: calc(var(--switch-size) - 4px);
    width: calc(var(--switch-size) - 4px);

    border-radius: 9999px;
    background-color: white;

    border: 2px solid var(--light-gray);

    transition: transform 0.275s ease-in-out;
}

.input:disabled + .switch {
    background-color: var(--gray);
}

.input:disabled + .switch::before {
    background-color: var(--dark-gray);
    border-color: var(--dark-gray);
}
</style>
