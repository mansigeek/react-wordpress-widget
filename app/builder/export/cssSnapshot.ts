import { getCollectedCSS } from "../styles/style-registry";

export function getWidgetCSS(): string {
    const css = getCollectedCSS();

    if (!css.trim()) {
        // eslint-disable-next-line no-console
        console.warn("No widget CSS found to export");
    }

    return css;
}
