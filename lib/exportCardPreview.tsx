// lib/exportCardPreview.ts

type CardConfig = {
    bgColor: string;
    textColor: string;
    fontSize: number;
    radius: number;
    padding: number;
};

export function exportCardPreview(config: CardConfig) {
    return `
class AcCardPreview extends HTMLElement {
connectedCallback() {
  const shadow = this.attachShadow({ mode: "open" });

  shadow.innerHTML = \`
    <style>
      :host {
        display: block;
        max-width: 28rem;
        width: 100%;
      }

      .card {
        background-color: ${config.bgColor};
        color: ${config.textColor};
        font-size: ${config.fontSize}px;
        border-radius: ${config.radius}px;
        padding: ${config.padding}px;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        transition: all 0.2s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .title {
        font-weight: 600;
        font-size: 1.125rem; /* text-lg */
        margin-bottom: 0.5rem;
      }

      .desc {
        font-size: 0.875rem; /* text-sm */
        line-height: 1.6;
        opacity: 0.9;
      }
    </style>

    <div class="card">
      <h4 class="title">Card Title</h4>
      <p class="desc">
        This is a preview card. Styles applied here will be exported exactly the same into WordPress.
      </p>
    </div>
  \`;
}
}

if (!customElements.get("ac-card-preview")) {
customElements.define("ac-card-preview", AcCardPreview);
}
`;
}
