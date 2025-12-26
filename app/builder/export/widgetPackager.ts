import { getWidgetCSS } from "./cssSnapshot";
import { getPreviewHTML } from "./domSnapshot";

/**
 * Packages the current Preview widget into a WordPress-safe JS embed
 */
export function generateWidgetScript() {
    const html = getPreviewHTML("auto-connect-preview-root");
    const css = getWidgetCSS(html);

    if (!html.trim()) {
        throw new Error("Export failed: Preview HTML is empty");
    }

    return `
(function () {
  const WIDGET_ID = "auto-connect-widget";

  // Avoid mounting twice
  if (document.getElementById(WIDGET_ID)) return;

  const mount = document.createElement("div");
  mount.id = WIDGET_ID;
  document.body.appendChild(mount);

  const shadow = mount.attachShadow({ mode: "open" });

  // Inject styles
  const style = document.createElement("style");
  style.textContent = \`${css}\`;

  // Inject HTML
  const wrapper = document.createElement("div");
  wrapper.innerHTML = \`${html}\`;

  shadow.appendChild(style);
  shadow.appendChild(wrapper);
})();
`.trim();
}
