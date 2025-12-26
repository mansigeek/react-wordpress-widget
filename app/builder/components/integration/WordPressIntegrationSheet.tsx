"use client";

import * as React from "react";
import { toast } from "sonner";

import { generateWidgetScript } from "@/builder/export/widgetPackager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function WordPressIntegrationSheet() {
    const [open, setOpen] = React.useState(false);
    const [script, setScript] = React.useState("");
    const [generated, setGenerated] = React.useState(false);

    function handleGenerate() {
        try {
            const output = generateWidgetScript();
            setScript(output);
            setGenerated(true);
            toast.success("Widget script generated");
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            toast.error("Failed to generate script");
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(script);
        toast.success("Script copied to clipboard");
    }

    function handleDownload() {
        const blob = new Blob([script], {
            type: "application/javascript",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "auto-connect-widget.js";
        a.click();

        URL.revokeObjectURL(url);
        toast.success("Widget downloaded");
    }

    function handleSheetClose(open: boolean) {
        setOpen(open);

        // Reset state when closing sheet
        if (!open) {
            setScript("");
            setGenerated(false);
        }
    }

    return (
        <Sheet onOpenChange={handleSheetClose} open={open}>
            <SheetTrigger asChild>
                <Button className="fixed right-6 top-6 z-40">Integrate / Export</Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-lg" side="right">
                <SheetHeader>
                    <SheetTitle>WordPress Integration</SheetTitle>
                </SheetHeader>

                <div className="p-5 space-y-6">
                    {/* Export Method */}
                    <div className="space-y-3">
                        <Label>Export Method</Label>
                        <div className="border flex items-center justify-between p-3 rounded-md">
                            <span className="font-medium text-sm">JavaScript Embed</span>
                            <Badge variant="secondary">Recommended</Badge>
                        </div>
                    </div>

                    {/* Generate */}
                    {!generated && (
                        <Button className="w-full" onClick={handleGenerate}>
                            Generate Script
                        </Button>
                    )}

                    {/* After Generate */}
                    {generated && (
                        <div className="space-y-4">
                            <div className="border leading-relaxed p-4 rounded-md text-sm">
                                ✅ Your widget script is ready.
                                <br />
                                Copy it or download the file and paste it into your WordPress site.
                            </div>

                            <div className="flex gap-3">
                                <Button className="flex-1" onClick={handleCopy}>
                                    Copy Script
                                </Button>

                                <Button className="flex-1" onClick={handleDownload} variant="outline">
                                    Download .js
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
