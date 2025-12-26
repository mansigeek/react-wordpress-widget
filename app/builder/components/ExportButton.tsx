// ExportButton.tsx
"use client";

import { exportFromPreview } from "@/lib/exportFromPreview";

export function ExportButton() {
    const handleExport = () => {
        const js = exportFromPreview("ac-preview-root");

        const blob = new Blob([js], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "auto-connect-layout.js";
        a.click();
    };

    return <button onClick={handleExport}>Export</button>;
}
