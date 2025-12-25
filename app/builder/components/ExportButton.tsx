"use client";

import { useBuilderStore } from "@/builder/state/builder-store";
import { exportCardPreview } from "@/lib/exportCardPreview";
export function ExportButton() {
    const config = useBuilderStore();

    const handleExport = () => {
        const jsFile = exportCardPreview({
            bgColor: config.bgColor,
            fontSize: config.fontSize,
            padding: config.padding,
            radius: config.radius,
            textColor: config.textColor,
        });

        const blob = new Blob([jsFile], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "card-preview.js";
        a.click();
    };

    return <button onClick={handleExport}>Export</button>;
}
