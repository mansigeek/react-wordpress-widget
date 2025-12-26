export function getPreviewHTML(rootId: string): string {
    const root = document.getElementById(rootId);

    if (!root) {
        throw new Error(`Preview root #${rootId} not found`);
    }

    const clone = root.cloneNode(true) as HTMLElement;

    return clone.outerHTML;
}
