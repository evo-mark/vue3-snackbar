import { computed } from "vue";
import type { PositionProps } from "../types";

export function useSnackbarPosition(props: PositionProps) {
    return computed(() => {
        const classes: string[] = [];
        const noX = !props.left && !props.right && !props.class;
        const noY = !props.top && !props.bottom && !props.class;

        if (noX && noY) {
            classes.push("vue3-snackbar--bottom", "vue3-snackbar--centre")
        }
        else if (noY) {
            classes.push("vue3-snackbar--middle");
        }
        else if (noX) {
            classes.push("vue3-snackbar--centre");
        }
        if (props.top) classes.push("vue3-snackbar--top");
        if (props.bottom && !props.top) classes.push("vue3-snackbar--bottom");
        if (props.left) classes.push("vue3-snackbar--left");
        if (props.right && !props.left) classes.push("vue3-snackbar--right");
        return classes.join(" ");
    })
}