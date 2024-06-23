declare module "eventbus" {
    namespace _default {
        function $on(...args: any[]): any;
        function $once(...args: any[]): any;
        function $off(...args: any[]): any;
        function $emit(...args: any[]): any;
    }
    export default _default;
}
declare module "service" {
    /**
     * @callback add
     * @param { SnackbarMessage } message
     * @returns { void }
     */
    /**
     * @callback clear
     * @returns { void }
     */
    /**
     * @typedef { Object } SnackbarService
     * @property { add } add Add a message to the stack
     * @property { clear } clear Clear messages from the stack
     */
    /**
     * Composable which allows accessing the Toast service in Composition API
     * @returns { SnackbarService }
     */
    export function useSnackbar(): SnackbarService;
    export const messages: import("vue").Ref<any>;
    export const SnackbarSymbol: any;
    export type SnackbarService = {
        /**
         * Add a message to the stack
         */
        add: add;
        /**
         * Clear messages from the stack
         */
        clear: clear;
    };
    export namespace SnackbarService {
        function install(app: any, config?: {}): void;
    }
    export type add = (message: SnackbarMessage) => void;
    export type clear = () => void;
}
declare module "index" {
    export { useSnackbar, SnackbarService, messages as SnackbarMessages } from "./service.js";
}
declare module "props" {
    export namespace propsModel {
        namespace top {
            export let type: BooleanConstructor;
            let _default: boolean;
            export { _default as default };
        }
        namespace bottom {
            let type_1: BooleanConstructor;
            export { type_1 as type };
            let _default_1: boolean;
            export { _default_1 as default };
        }
        namespace left {
            let type_2: BooleanConstructor;
            export { type_2 as type };
            let _default_2: boolean;
            export { _default_2 as default };
        }
        namespace right {
            let type_3: BooleanConstructor;
            export { type_3 as type };
            let _default_3: boolean;
            export { _default_3 as default };
        }
        namespace success {
            let type_4: StringConstructor;
            export { type_4 as type };
            let _default_4: string;
            export { _default_4 as default };
        }
        namespace error {
            let type_5: StringConstructor;
            export { type_5 as type };
            let _default_5: string;
            export { _default_5 as default };
        }
        namespace warning {
            let type_6: StringConstructor;
            export { type_6 as type };
            let _default_6: string;
            export { _default_6 as default };
        }
        namespace info {
            let type_7: StringConstructor;
            export { type_7 as type };
            let _default_7: string;
            export { _default_7 as default };
        }
        namespace iconPresets {
            let type_8: ObjectConstructor;
            export { type_8 as type };
            let _default_8: any;
            export { _default_8 as default };
        }
        namespace messageTextColor {
            let type_9: StringConstructor;
            export { type_9 as type };
            let _default_9: string;
            export { _default_9 as default };
        }
        namespace messageIconColor {
            let type_10: StringConstructor;
            export { type_10 as type };
            let _default_10: string;
            export { _default_10 as default };
        }
        namespace attach {
            let type_11: ({
                new (): HTMLElement;
                prototype: HTMLElement;
            } | ObjectConstructor | StringConstructor)[];
            export { type_11 as type };
            let _default_11: string;
            export { _default_11 as default };
        }
        namespace border {
            let type_12: StringConstructor;
            export { type_12 as type };
            let _default_12: string;
            export { _default_12 as default };
            export function validator(v: any): any;
        }
        namespace backgroundOpacity {
            let type_13: (StringConstructor | NumberConstructor)[];
            export { type_13 as type };
            let _default_13: number;
            export { _default_13 as default };
            export function validator_1(v: any): boolean;
            export { validator_1 as validator };
        }
        namespace backgroundColor {
            let type_14: StringConstructor;
            export { type_14 as type };
            let _default_14: string;
            export { _default_14 as default };
        }
        namespace baseBackgroundColor {
            let type_15: StringConstructor;
            export { type_15 as type };
            let _default_15: string;
            export { _default_15 as default };
        }
        namespace duration {
            let type_16: (StringConstructor | NumberConstructor)[];
            export { type_16 as type };
            let _default_16: any;
            export { _default_16 as default };
        }
        namespace messageClass {
            let type_17: StringConstructor;
            export { type_17 as type };
        }
        namespace messageActionClass {
            let type_18: StringConstructor;
            export { type_18 as type };
            let _default_17: string;
            export { _default_17 as default };
        }
        namespace zIndex {
            let type_19: NumberConstructor;
            export { type_19 as type };
            let _default_18: number;
            export { _default_18 as default };
        }
        namespace dense {
            let type_20: BooleanConstructor;
            export { type_20 as type };
            let _default_19: boolean;
            export { _default_19 as default };
        }
        namespace reverse {
            let type_21: BooleanConstructor;
            export { type_21 as type };
            let _default_20: boolean;
            export { _default_20 as default };
        }
        namespace limit {
            let type_22: NumberConstructor;
            export { type_22 as type };
            let _default_21: any;
            export { _default_21 as default };
        }
        namespace groups {
            let type_23: BooleanConstructor;
            export { type_23 as type };
            let _default_22: boolean;
            export { _default_22 as default };
        }
        namespace shadow {
            let type_24: BooleanConstructor;
            export { type_24 as type };
            let _default_23: boolean;
            export { _default_23 as default };
        }
        namespace dismissOnActionClick {
            let type_25: BooleanConstructor;
            export { type_25 as type };
            let _default_24: boolean;
            export { _default_24 as default };
        }
    }
    export type VNode = import("vue").VNode;
    export type Component = import("vue").Component;
    export type FunctionalComponent = import("vue").FunctionalComponent;
    export type Renderable = VNode | Component | FunctionalComponent | (() => VNode);
    export type Vue3Icon = {
        /**
         * The icon type, e.g. "mdi" or "simple-icons"
         */
        type: string;
        /**
         * A FontAwesome icon object
         */
        faIcon: any;
        /**
         * The SVG path for the icon
         */
        path: any | string | any[];
        /**
         * The size of the icon
         */
        size: number | string;
        /**
         * The SVG view-box size
         */
        viewBox: string;
        /**
         * Flip the icon on its given axis/axes
         */
        flip: "horizontal" | "vertical" | "both" | null;
        /**
         * Degrees to rotate the icon
         */
        rotate: number | string;
    };
    export type LiveRegionRole = "alert" | "log" | "marquee" | "status" | "timer";
    export type IconPresets = {
        /**
         * The vue3-icon props for a message type of success
         */
        success: Vue3Icon;
        /**
         * The vue3-icon props for a message type of warning
         */
        warning: Vue3Icon;
        /**
         * The vue3-icon props for a message type of info
         */
        info: Vue3Icon;
        /**
         * The vue3-icon props for a message type of error
         */
        error: Vue3Icon;
    };
    export type SnackbarMessage = {
        /**
         * The classification of the message
         */
        type: "warning" | "error" | "info" | "success" | null;
        /**
         * An optional title string for the message
         */
        title: string | null;
        /**
         * The text content of the message
         */
        text: string;
        /**
         * In ms, the time before the message expires
         */
        duration: number | null;
        /**
         * Can the message be dismissed manually?
         */
        dismissible: boolean | null;
        /**
         * The aria-role of the message
         */
        role: LiveRegionRole | null;
        /**
         * Any valid Vue component to render in the action slot
         */
        action: Renderable | null;
    };
    export type SnackbarProps = {
        /**
         * Render the snackbar at the top of the screen
         */
        top: boolean;
        /**
         * Render the snackbar at the bottom of the screen
         */
        bottom: boolean;
        /**
         * Render the snackbar at the left of the screen
         */
        left: boolean;
        /**
         * Render the snackbar at the right of the screen
         */
        right: boolean;
        /**
         * Base colour to use for success messages
         */
        success: string;
        /**
         * Base colour to use for error messages
         */
        error: string;
        /**
         * Base colour to use for warning messages
         */
        warning: string;
        /**
         * Base colour to use for info messages
         */
        info: string;
        /**
         * Text colour for the default message
         */
        messageTextColor: string;
        /**
         * Icon colour for the default message
         */
        messageIconColor: string;
        /**
         * HTML element to attach the container to
         */
        attach: string | ({
            new (): HTMLElement;
            prototype: HTMLElement;
        } | ObjectConstructor);
        /**
         * Use the alternative border-style messages
         */
        border: "top" | "bottom" | "left" | "right";
        /**
         * The background colour opacity when using border-style messages
         */
        backgroundOpacity: string | number;
        /**
         * Background colour when using border-style messages
         */
        backgroundColor: string;
        /**
         * Base background colour when using border-style messages
         */
        baseBackgroundColor: string;
        /**
         * The default time in ms for messages to stay on the screen
         */
        duration: number;
        /**
         * Class string to add to each message
         */
        messageClass: string;
        /**
         * The z-index value of the snackbar container
         */
        zIndex: number;
        /**
         * Reduce padding on the y-axis for snackbar messages
         */
        dense: boolean;
        /**
         * Reverse the display order of snackbar messages
         */
        reverse: boolean;
        /**
         * Use snackbar groups with messages with the same group-key
         */
        groups: boolean;
        /**
         * Add shadow effect to messages
         */
        shadow: boolean;
        /**
         * The maximum number of messages/message groups to show
         */
        limit: number;
        /**
         * The preset icon settings for standard message types
         */
        iconPresets: IconPresets;
    };
}
//# sourceMappingURL=types.d.ts.map