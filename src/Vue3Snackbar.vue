<template>
	<teleport :to="props.attach">
		<section
			id="vue3-snackbar--container"
			:class="[generatedBaseClasses]"
			class="vue3-snackbar"
			:style="generatedBaseStyles"
			aria-live="polite"
		>
			<transition-group name="vue3-snackbar-message" tag="div" class="vue3-snackbar--messages">
				<SnackbarMessage
					v-for="message in formattedMessages"
					:key="message.id"
					:message="message"
					:message-class="props.messageClass"
					:message-action-class="props.messageActionClass"
					:dense="props.dense"
					:border-class="borderClass"
					:icon-presets="props.iconPresets"
					@dismiss="remove($event, true)"
					@click:action="onClickAction"
				>
					<!-- @ts-ignore -->
					<template v-for="(_, name) in $slots" #[name]="slotData">
						<slot :name="name" v-bind="slotData" />
					</template>
				</SnackbarMessage>
			</transition-group>
		</section>
	</teleport>
</template>

<script setup>
import SnackbarMessage from "./Vue3SnackbarMessage.vue";
import { onMounted, onUnmounted, computed, watch } from "vue";
import { propsModel } from "./props.js";
import { messages } from "./service.js";
import EventBus from "./eventbus";
import { useTextDirection } from "@vueuse/core";
const textDirection = useTextDirection();

/**
 * @const {import("./props.js").SnackbarProps} props
 */
const props = defineProps({ ...propsModel });
const emit = defineEmits(["added", "dismissed", "removed", "cleared", "click:action"]);

const generatedBaseClasses = computed(() => {
	return {
		"is-top": props.top,
		"is-bottom": props.top === false && props.bottom,
		"is-left": props.left,
		"is-right": props.left === false && props.right,
		"is-middle": props.top === false && props.bottom === false,
		"is-centre": props.left === false && props.right === false,
		"has-shadow": props.shadow,
		"is-rtl": textDirection.value === "rtl",
	};
});

const generatedBaseStyles = computed(() => {
	return {
		"--success-colour": props.success,
		"--error-colour": props.error,
		"--warning-colour": props.warning,
		"--info-colour": props.info,
		"--snackbar-zindex": props.zIndex,
		"--background-opacity": props.backgroundOpacity,
		"--background-color": props.backgroundColor,
		"--base-background-color": props.baseBackgroundColor,
		"--message-text-color": props.messageTextColor,
		"--message-icon-color": props.messageIconColor,
	};
});

const borderClass = computed(() => (props.border ? `border-${props.border}` : ""));

const hashCode = (s) => Math.abs(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));

let messageId = 1;

onMounted(() => {
	EventBus.$on("add", (ev) => {
		emit("added", ev);
		if (!ev.group) ev.group = hashCode(`${ev.type}${ev.title}${ev.text}`).toString(16);
		// If there's a default duration and no message duration is set, use the default
		if (props.duration && !ev.duration && ev.duration !== 0) ev.duration = +props.duration;
		// Find the existing message if one with the same group-key already exists
		const existingGroup = ev.group && messages.value.find((msg) => msg.group === ev.group);

		if (props.groups === false || !existingGroup) {
			const message = {
				...ev,
				id: messageId,
				count: 1,
			};
			messages.value.push(message);
			messageId++;
		} else {
			existingGroup.count++;
		}
	});
});

const formattedMessages = computed(() => {
	const page = props.limit ? messages.value.slice(props.limit * -1) : [...messages.value];
	if (props.reverse) return page.reverse();
	else return page;
});
watch(formattedMessages, (msgs) => {
	const pageIds = msgs.map((msg) => msg.id);
	const fullIds = messages.value.map((msg) => msg.id);
	const diffIds = fullIds.filter((id) => !pageIds.includes(id));
	for (const id of diffIds) {
		const message = messages.value.find((msg) => msg.id === id);
		if (message) remove(message, false);
	}
});

EventBus.$on("clear", () => {
	emit("cleared");
	messages.value = [];
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

const onClickAction = ($event) => {
	emit("click:action", $event);
	if (props.dismissOnActionClick) {
		remove($event.message, true);
	}
};
</script>

<style lang="postcss">
@import "./style.postcss";
</style>
