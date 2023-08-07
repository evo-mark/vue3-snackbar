interface Vue3Icon {
    type?: String,
    path: String,
    faIcon?: Object,
    size?: Number|String,
    viewbox?: String,
    flip?: "horizontal"|"vertical"|"both",
    rotate?: Number|String
}

export interface MessageType {
    color?: String,
    class?: String,
    icon?: String|Vue3Icon,
}

export interface PositionProps {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
    class?: string;
  }