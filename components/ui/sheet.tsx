"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
    return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
    return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
    return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
    return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
    return (
        <SheetPrimitive.Overlay
            className={cn(
                `
                  bg-black/50
                  data-[state=closed]:animate-out data-[state=closed]:fade-out-0
                  data-[state=open]:animate-in data-[state=open]:fade-in-0
                  fixed inset-0 z-50
                `,
                className,
            )}
            data-slot="sheet-overlay"
            {...props}
        />
    );
}

function SheetContent({
    className,
    children,
    side = "right",
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
                className={cn(
                    `
                      bg-background
                      data-[state=closed]:animate-out data-[state=closed]:duration-300
                      data-[state=open]:animate-in data-[state=open]:duration-500
                      ease-in-out fixed flex flex-col gap-4 shadow-lg transition z-50
                    `,
                    side === "right" &&
                        `
                          border-l
                          data-[state=closed]:slide-out-to-right
                          data-[state=open]:slide-in-from-right
                          h-full inset-y-0 right-0
                          sm:max-w-sm
                          w-3/4
                        `,
                    side === "left" &&
                        `
                          border-r
                          data-[state=closed]:slide-out-to-left
                          data-[state=open]:slide-in-from-left
                          h-full inset-y-0 left-0
                          sm:max-w-sm
                          w-3/4
                        `,
                    side === "top" &&
                        `
                          border-b
                          data-[state=closed]:slide-out-to-top
                          data-[state=open]:slide-in-from-top
                          h-auto inset-x-0 top-0
                        `,
                    side === "bottom" &&
                        `
                          border-t bottom-0
                          data-[state=closed]:slide-out-to-bottom
                          data-[state=open]:slide-in-from-bottom
                          h-auto inset-x-0
                        `,
                    className,
                )}
                data-slot="sheet-content"
                {...props}
            >
                {children}
                <SheetPrimitive.Close
                    className={`
                      absolute
                      data-[state=open]:bg-secondary
                      disabled:pointer-events-none
                      focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-ring
                      hover:opacity-100
                      opacity-70 right-4 ring-offset-background rounded-xs top-4 transition-opacity
                    `}
                >
                    <XIcon className="size-4" />
                    <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
            </SheetPrimitive.Content>
        </SheetPortal>
    );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("flex flex-col gap-1.5 p-4", className)} data-slot="sheet-header" {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("flex flex-col gap-2 mt-auto p-4", className)} data-slot="sheet-footer" {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
    return (
        <SheetPrimitive.Title
            className={cn("font-semibold text-foreground", className)}
            data-slot="sheet-title"
            {...props}
        />
    );
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
    return (
        <SheetPrimitive.Description
            className={cn("text-muted-foreground text-sm", className)}
            data-slot="sheet-description"
            {...props}
        />
    );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger };
