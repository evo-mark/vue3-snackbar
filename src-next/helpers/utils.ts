export const createHash = (s: string, length: number = 16): string => {
    return Math.abs(Array.from(s).reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)).toString(length);
}
