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
    const [loading, setLoading] = React.useState(false);
    const [generated, setGenerated] = React.useState(false);
    const [scriptTag, setScriptTag] = React.useState("");

    async function handleGenerate() {
        try {
            setLoading(true);

            const script = generateWidgetScript();

            const res = await fetch("/api/publish-widget", {
                body: JSON.stringify({ script }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Publish failed");
            }

            const data = await res.json();

            setScriptTag(data.scriptTag);
            setGenerated(true);

            toast.success("Widget published to CDN");
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            toast.error("Failed to generate widget");
        } finally {
            setLoading(false);
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(scriptTag);
        toast.success("Script tag copied");
    }

    function handleSheetClose(isOpen: boolean) {
        setOpen(isOpen);

        if (!isOpen) {
            setGenerated(false);
            setScriptTag("");
            setLoading(false);
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
                        <Button className="w-full" disabled={loading} onClick={handleGenerate}>
                            {loading ? "Publishing..." : "Generate & Publish"}
                        </Button>
                    )}

                    {/* After Generate */}
                    {generated && (
                        <div className="space-y-4">
                            <div className="border leading-relaxed p-4 rounded-md text-sm">
                                ✅ Your widget is live on CDN.
                                <br />
                                Copy the script tag below and paste it into WordPress.
                            </div>

                            <div className="bg-muted border break-all font-mono p-3 rounded-md text-xs">
                                {scriptTag}
                            </div>

                            <Button className="w-full" onClick={handleCopy}>
                                Copy Script Tag
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
