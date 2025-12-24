import { createRoot } from "react-dom/client";
import App from "./App.jsx";

class LayoutBuilderWidget extends HTMLElement {
  connectedCallback() {
    // 🔒 Normalize host element
    this.normalizeHost(this);

    // 🔐 Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // 🎨 Scoped styles
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      .container {
        padding: 12px;
        background: white;
        border: 1px solid #ccc;
        width: 300px;
        font-family: system-ui, sans-serif;
      }
    `;

    const mountPoint = document.createElement("div");

    shadow.appendChild(style);
    shadow.appendChild(mountPoint);

    // ⚛️ Mount React
    createRoot(mountPoint).render(<App />);
  }

  normalizeHost(host) {
    host.style.display = "block";
    host.style.margin = "0";
    host.style.padding = "0";
    host.style.boxSizing = "border-box";
    host.style.contain = "content";
    host.style.isolation = "isolate";
  }
}

customElements.define("layout-builder-widget", LayoutBuilderWidget);
