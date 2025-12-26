const STYLE_TAG_ID = "__auto_connect_styles__";

export function getCollectedCSS(): string {
    const styleTag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    return styleTag?.innerHTML ?? "";
}
