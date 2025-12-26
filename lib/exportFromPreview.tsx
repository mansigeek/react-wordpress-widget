export function exportFromPreview(rootId: string) {
    const root = document.getElementById(rootId);
    if (!root) {
        throw new Error("Preview root not found");
    }

    const html = root.innerHTML;

    return `
  (function () {
    class AcExportedLayout extends HTMLElement {
      connectedCallback() {
        if (this.shadowRoot) return;
  
        const shadow = this.attachShadow({ mode: "open" });
  
        shadow.innerHTML = \`
          <style>
            :host {
              display: block;
              all: initial;
            }
          </style>
          ${html}
        \`;
      }
    }
  
    if (!customElements.get("ac-exported-layout")) {
      customElements.define("ac-exported-layout", AcExportedLayout);
    }
  })();
  `;
}
