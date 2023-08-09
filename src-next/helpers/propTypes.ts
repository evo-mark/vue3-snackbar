export const isBrowser = typeof window !== 'undefined';

export const HTMLShim = isBrowser ? HTMLElement : Object;
