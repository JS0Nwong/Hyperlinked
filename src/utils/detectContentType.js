const detectContentType = (string) => {
    const isLink = /^(https:\/\/|http:\/\/|www\.)/i.test(string);
    const isRGB = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(string.trim());
    const isHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(string.trim());

    if (isLink) {
        return "link";
    } else if (isRGB) {
        return "rgb";
    } else if (isHex) {
        return "hex";
    } else {
        return "plain-text";
    }
}
export { detectContentType };
