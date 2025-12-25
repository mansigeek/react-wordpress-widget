"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function WordPressIntegrationSheet() {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger asChild>
                <Button className="fixed right-6 top-6 z-40" variant="default">
                    Integrate / Export
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto sm:max-w-lg" side="right">
                <SheetHeader>
                    <SheetTitle>WordPress Integration</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                    <p className="text-muted-foreground text-sm">
                        WordPress integration content will be added here. This is where we will generate scripts and
                        export functionality.
                    </p>
                    {/* WordPress integration content will go here */}
                </div>
            </SheetContent>
        </Sheet>
    );
}
