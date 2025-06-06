<template>
	<teleport :to="props.attach">
		<section
			id="vue3-snackbar--container"
			class="vue3-snackbar"
			:class="[generatedBaseClasses]"
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
import { onUnmounted, computed, watch } from "vue";
import { propsModel } from "./props.js";
import { messages } from "./service.js";
import EventBus from "./eventbus";
import { useTextDirection } from "@vueuse/core";
const textDirection = useTextDirection();

/**
 * @const {import("./props.js").SnackbarProps} props
 */
const props = defineProps({ ...propsModel });
const emit = defineEmits(["added", "group-added", "dismissed", "removed", "cleared", "click:action"]);

const generatedBaseClasses = computed(() => {
	if ((props.left || props.right) && (props.start || props.end)) {
		console.warn("[Vue3 Snackbar] The left/right and start/end position properties should not be used together.");
	}
	return {
		"is-top": props.top,
		"is-bottom": props.top === false && props.bottom,
		"is-left": props.left,
		"is-right": props.left === false && props.right,
		"is-start": props.start,
		"is-end": props.start === false && props.end,
		"is-middle": props.top === false && props.bottom === false,
		"is-centre": ["left", "right", "start", "end"].every((pos) => props[pos] === false),
		"shadow-md": props.shadow === true,
		[`shadow-${props.shadow}`]: typeof props.shadow === "string",
		"is-rtl": textDirection.value === "rtl",
	};
});

const normaliseUnit = (unit) => {
	if (typeof unit === "number" || /[^\d]/.test(unit) === false) {
		return `${unit}px`;
	} else return unit;
};

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
		"--snackbar-content-width": props.contentWidth,
		"--snackbar-border-width": normaliseUnit(props.borderWidth),
	};
});

const borderClass = computed(() => (props.border ? `border-${props.border}` : ""));

const remove = (ev, wasDismissed = false) => {
	if (Object.hasOwn(ev, "onRemoved") && typeof ev.onRemoved === "function") {
		ev.onRemoved(ev, wasDismissed);
	}

	if (wasDismissed) emit("dismissed", ev);
	else emit("removed", ev);
	messages.value = messages.value.filter((message) => {
		if (props.groups) {
			return message.group !== ev.group;
		} else {
			return message.id !== ev.id;
		}
	});
};

const formattedMessagesAll = computed(() => {
	const raw = [...messages.value];
	const rawMap = raw.reduce((acc, curr) => {
		if (props.duration && !curr.duration && curr.duration !== 0) curr.duration = +props.duration;
		const msgId = props.groups ? curr.group : curr.id;

		if (acc.has(msgId)) {
			const group = acc.get(msgId);
			curr.count = group.count + 1;
			curr.id = group.id;
			acc.set(msgId, curr);
			emit("group-added", curr);
		} else {
			curr.count = 1;
			emit("added", curr);
			acc.set(msgId, curr);
		}
		return acc;
	}, new Map());
	return Array.from(rawMap.values());
});
const formattedMessages = computed(() => {
	const page = props.limit ? formattedMessagesAll.value.slice(props.limit * -1) : formattedMessagesAll.value;
	if (props.reverse) return page.reverse();
	else return page;
});
watch(
	formattedMessages,
	(msgs) => {
		const pageIds = msgs.map((msg) => msg.id);
		const fullIds = formattedMessagesAll.value.map((msg) => msg.id);
		const diffIds = fullIds.filter((id) => !pageIds.includes(id));

		for (const id of diffIds) {
			const message = formattedMessagesAll.value.find((msg) => msg.id === id);
			if (message) remove(message, false);
		}
	},
	{
		immediate: true,
	},
);

EventBus.$on("clear", () => {
	emit("cleared");
	messages.value = [];
});

onUnmounted(() => {
	EventBus.$off("add");
	EventBus.$off("clear");
});

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
