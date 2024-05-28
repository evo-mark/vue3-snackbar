<template>
	<article
		class="vue3-snackbar-message"
		:class="[
			props.message.type || 'custom',
			props.messageClass,
			props.borderClass,
			{
				'has-background': props.message.background,
				'has-border': props.borderClass,
				'is-dense': props.dense,
				'shake-baby-shake': hasShake,
			},
		]"
		:style="{
			'--message-background': props.message.background,
			'--message-text-color': props.message.textColor,
			'--message-icon-color': props.message.iconColor,
		}"
	>
		<slot name="message-inner" :message="props.message">
			<div class="vue3-snackbar-message-wrapper">
				<div v-if="icon" class="vue3-snackbar-message-icon">
					<slot name="message-icon" :message="props.message" :icon="icon">
						<vue3-icon v-bind="icon" role="img" />
					</slot>
				</div>
				<div class="vue3-snackbar-message-content">
					<slot name="message-badge" :message="props.message" :count="props.message.count">
						<div v-if="props.message.count > 1" class="vue3-snackbar-message-badge">
							{{ props.message.count }}
						</div>
					</slot>
					<slot
						name="message-content"
						:message="props.message"
						:title="props.message.title"
						:text="props.message.text"
					>
						<div class="vue3-snackbar-message-title">
							{{ props.message.title || props.message.text }}
						</div>
						<div v-if="props.message.title && props.message.text" class="vue3-snackbar-message-additional">
							{{ props.message.text }}
						</div>
					</slot>
				</div>
				<div class="spacer"></div>
				<div class="vue3-snackbar-message-close">
					<!-- typo is-dimissible will be removed in the next major version -->
					<slot
						name="message-close-icon"
						:message="props.message"
						:is-dimissible="props.message.dismissible"
						:is-dismissible="props.message.dismissible"
						:dismiss="dismissClick"
					>
						<button v-if="props.message.dismissible !== false" @click="dismissClick">
							<vue3-icon type="mdi" :path="mdiClose" />
						</button>
					</slot>
				</div>
			</div>
		</slot>
	</article>
</template>

<script setup>
import { mdiCheckCircle, mdiClose, mdiInformationOutline, mdiAlertOctagonOutline, mdiAlertOutline } from "@mdi/js";

import Vue3Icon from "vue3-icon";
import { onMounted, watch, ref, computed } from "vue";

const emit = defineEmits(["dismiss"]);
const props = defineProps({
	borderClass: {
		type: String,
		default: "",
	},
	message: {
		type: Object,
		default: () => ({}),
	},
	messageClass: {
		type: String,
		default: "",
	},
	dense: {
		type: Boolean,
		default: false,
	},
});

let timeout = null,
	shakeTimeout = null;

let hasShake = ref(false);

const setMessageTimeout = () => {
	const messageDuration = !props.message.duration && !props.message.dismissible ? 4000 : props.message.duration;
	timeout = setTimeout(dismiss, messageDuration);
};

onMounted(() => {
	setMessageTimeout();
});
watch(
	() => props.message.count,
	(v) => {
		if (v === 1) return false;
		clearTimeout(timeout);
		clearTimeout(shakeTimeout);
		shakeTimeout = setTimeout(() => {
			hasShake.value = false;
		}, 1000);
		hasShake.value = true;
		setMessageTimeout();
	},
);
const dismissClick = () => {
	if (timeout) clearTimeout(timeout);
	dismiss();
};
const dismiss = () => {
	emit("dismiss", props.message);
};

const types = {
	success: {
		path: mdiCheckCircle,
	},
	info: {
		path: mdiInformationOutline,
	},
	warning: {
		path: mdiAlertOutline,
	},
	error: {
		path: mdiAlertOctagonOutline,
	},
};

/**
 * Return the options passed to the vue3-icon component
 */
const icon = computed(() => {
	const preset = types[props.message.type];
	// If a preset is defined
	if (preset) {
		preset.type = "mdi";
		return preset;
	}
	// If the user passes their own icon object
	else if (props.message.icon && typeof props.message.icon === "object") {
		return props.message.icon;
	}
	// Otherwise return an empty icon
	else
		return {
			path: "",
			type: "default",
		};
});
</script>
