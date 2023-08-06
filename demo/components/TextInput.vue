<template>
	<div class="container d-flex flex-column">
		<label :for="name" class="mb-1">{{ label }}</label>
		<input
			:name="name"
			type="text"
			:value="modelValue"
			@input="emit('update:modelValue', parseFloat($event.target.value))"
		/>
	</div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
defineProps({
    modelValue: {
        type: [String, Number],
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "text",
    },

})
</script>

<style lang="scss" scoped>
input {
	border-radius: 0;
	border: 1px solid #ccc;
	padding: 8px 16px;
}
</style>
