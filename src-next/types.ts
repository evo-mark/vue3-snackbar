export interface Vue3Icon {
    type?: string;
    path: string;
    faIcon?: object;
    size?: number|string;
    viewbox?: string;
    flip?: "horizontal"|"vertical"|"both";
    rotate?: number|string;
}

export interface MessageType {
    color?: string;
    class?: string;
    icon?: string|Vue3Icon;
}

export interface PositionProps {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    class?: string;
  }

export interface SnackbarServiceConfig {
    global?: boolean;
    window?: boolean;
}

export interface SnackbarServiceCentre {
    add(message: SnackbarMessage): void;
    clear(): void;
}

export interface SnackbarMessage {
    id?: string;
    class?: string;
    icon?: string|Vue3Icon;
    type?: "success"|"error"|"warning"|"info";
    duration?: number;
    group?: string;
}
