import hash from "object-hash";

const styleSheetId = "__auto_connect_styles__";

function getStyleSheet(): HTMLStyleElement {
    let styleTag = document.getElementById(styleSheetId) as HTMLStyleElement | null;

    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleSheetId;
        document.head.appendChild(styleTag);
    }

    return styleTag;
}

function cssObjectToString(css: Record<string, string | number>) {
    return Object.entries(css)
        .map(([key, value]) => {
            const prop = key.replace(/[A-Z]/g, m => {
                return `-${m.toLowerCase()}`;
            });
            return `${prop}:${value};`;
        })
        .join("");
}

export function registerStyle(css: Record<string, string | number>) {
    const hashKey = hash(css);
    const className = `ac-${hashKey.slice(0, 8)}`;

    const styleTag = getStyleSheet();

    if (!styleTag.innerHTML.includes(className)) {
        styleTag.innerHTML += `
.${className} {
    ${cssObjectToString(css)}
}
`;
    }

    return className;
}
