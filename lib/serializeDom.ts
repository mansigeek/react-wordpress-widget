export function serializeDomWithStyles(root: HTMLElement) {
    const clone = root.cloneNode(true) as HTMLElement;

    const walk = (node: HTMLElement) => {
        const styles = window.getComputedStyle(node);

        const cssText = Array.from(styles)
            .map(prop => {
                return `${prop}:${styles.getPropertyValue(prop)};`;
            })
            .join("");

        node.setAttribute("style", cssText);

        Array.from(node.children).forEach(child => {
            return walk(child as HTMLElement);
        });
    };

    walk(clone);
    return clone.innerHTML;
}
