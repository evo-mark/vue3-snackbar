<template>
	<section
		id="vue3-snackbar--container"
		:class="[generatedBaseClasses]"
		class="vue3-snackbar"
		:style="generatedBaseStyles"
	>
		<transition-group name="vue3-snackbar-message" tag="div">
			<SnackbarMessage
				v-for="message in messages"
				:key="message.id"
				:message="message"
				:message-class="props.messageClass"
				:dense="props.dense"
				@dismiss="remove($event, true)"
			/>
		</transition-group>
	</section>
</template>

<script setup>
import SnackbarMessage from "./Vue3SnackbarMessage.vue";
import { onMounted, onUnmounted } from "vue";
import { propsModel } from "./props.js";
import { messages } from "./service.js";
import EventBus from "./eventbus";

const props = defineProps({ ...propsModel });
const emit = defineEmits(["added", "dismissed", "removed", "cleared"]);

const generatedBaseClasses = $computed(() => {
	return {
		"is-top": props.top,
		"is-bottom": props.top === false && props.bottom,
		"is-left": props.left,
		"is-right": props.left === false && props.right,
		"is-middle": props.top === false && props.bottom === false,
		"is-centre": props.left === false && props.right === false,
		"has-shadow": props.shadow,
	};
});

const generatedBaseStyles = $computed(() => {
	return {
		"--success-colour": props.success,
		"--error-colour": props.error,
		"--warning-colour": props.warning,
		"--info-colour": props.info,
		"--snackbar-zindex": props.zindex,
	};
});

const hashCode = (s) => Math.abs(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));

let messageId = 1;

onMounted(() => {
	EventBus.$on("add", (ev) => {
		emit("added", ev);
		if (!ev.group) ev.group = hashCode(`${ev.type}${ev.title}${ev.text}`).toString(16);
		// If there's a default duration and no message duration is set, use the default
		if (props.duration && !ev.duration && ev.duration !== 0) ev.duration = props.duration;
		// Find the existing message if one with the same group-key already exists
		const existingGroup = ev.group && messages.value.find((msg) => msg.group === ev.group);

		if (props.groups === false || !existingGroup) {
			const message = {
				...ev,
				id: messageId,
				count: 1,
			};
			if (props.reverse) messages.value.unshift(message);
			else messages.value.push(message);
			messageId++;
		} else {
			existingGroup.count++;
		}
	});

	EventBus.$on("clear", () => {
		emit("cleared");
		messages.value = [];
	});
});

onUnmounted(() => {
	EventBus.$off("add");
	EventBus.$off("clear");
});

const remove = (ev, wasDismissed = false) => {
	if (wasDismissed) emit("dismissed", ev);
	else emit("removed", ev);
	messages.value = messages.value.filter((message) => {
		return message.id !== ev.id;
	});
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
