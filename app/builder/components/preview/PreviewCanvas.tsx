"use client";

import { CardPreview } from "./CardPreview";

export function PreviewCanvas() {
    return (
        <section className="bg-gradient-to-br flex-1 from-muted/30 md:p-12 overflow-auto p-8 to-muted/20 via-background">
            <div
                className={`
                  backdrop-blur-sm bg-background/95 border border-border/50 max-w-[1000px]
                  md:p-12
                  mx-auto p-8 rounded-2xl shadow-xl
                `}
            >
                <div className="mb-8">
                    <h3
                        className={`
                          bg-clip-text bg-gradient-to-r font-bold from-foreground mb-2 text-transparent text-xl
                          to-foreground/70
                        `}
                    >
                        Preview
                    </h3>
                    <p className="text-muted-foreground text-sm">This is what will be exported to WordPress</p>
                </div>

                <div
                    className={`
                      bg-muted/20 border-2 border-border/60 border-dashed flex
                      hover:border-primary/30
                      items-center justify-center p-12 rounded-xl transition-colors
                    `}
                >
                    <div id="auto-connect-preview-root">
                        <CardPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}
