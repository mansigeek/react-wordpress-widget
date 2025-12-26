"use client";

import { CardPreview } from "./CardPreview";

export function PreviewCanvas() {
    return (
        <section className="bg-muted/40 flex-1 overflow-auto p-10">
            <div className="bg-background border max-w-[900px] mx-auto p-10 rounded-lg shadow-sm">
                <div className="mb-6">
                    <h3 className="font-medium text-base">Preview</h3>
                    <p className="text-muted-foreground text-sm">This is what will be exported</p>
                </div>

                <div className="border border-dashed flex justify-center p-10 rounded-md">
                    <div id="ac-preview-root">
                        <CardPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
