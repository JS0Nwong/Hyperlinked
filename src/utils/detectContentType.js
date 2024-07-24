const detectContentType = (string) => {
    const isRGB = /rgb\(/.test(string);
    const isHex = /#/.test(string);
    const isLink = /^(https:\/\/|www\.)/i.test(string);

    if (isRGB) {
        return "rgb";
    } else if (isHex) {
        return "hex";
    } 
    else if (isLink) {
        return "link";
    } else {
        return "plain-text";
    }
}
export { detectContentType };