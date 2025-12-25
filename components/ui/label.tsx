"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
    return (
        <LabelPrimitive.Root
            className={cn(
                `
                  flex font-medium gap-2
                  group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:pointer-events-none
                  items-center leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-50
                  select-none text-sm
                `,
                className,
            )}
            data-slot="label"
            {...props}
        />
    );
}

export { Label };
