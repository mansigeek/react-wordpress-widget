import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    `
      [&_svg:not([class*='size-'])]:size-4
      [&_svg]:pointer-events-none [&_svg]:shrink-0
      aria-invalid:border-destructive aria-invalid:ring-destructive/20
      dark:aria-invalid:ring-destructive/40
      disabled:opacity-50 disabled:pointer-events-none
      focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
      font-medium gap-2 inline-flex items-center justify-center outline-none rounded-md shrink-0 text-sm transition-all
      whitespace-nowrap
    `,
    {
        defaultVariants: {
            size: "default",
            variant: "default",
        },
        variants: {
            size: {
                default: "h-9 has-[>svg]:px-3 px-4 py-2",
                icon: "size-9",
                "icon-lg": "size-10",
                "icon-sm": "size-8",
                lg: "h-10 has-[>svg]:px-4 px-6 rounded-md",
                sm: "gap-1.5 h-8 has-[>svg]:px-2.5 px-3 rounded-md",
            },
            variant: {
                default: "bg-primary hover:bg-primary/90 text-primary-foreground",
                destructive: `
                  bg-destructive
                  dark:bg-destructive/60 dark:focus-visible:ring-destructive/40
                  focus-visible:ring-destructive/20
                  hover:bg-destructive/90
                  text-white
                `,
                ghost: "dark:hover:bg-accent/50 hover:bg-accent hover:text-accent-foreground",
                link: "hover:underline text-primary underline-offset-4",
                outline: `
                  bg-background border
                  dark:bg-input/30 dark:border-input dark:hover:bg-input/50
                  hover:bg-accent hover:text-accent-foreground
                  shadow-xs
                `,
                secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
            },
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(buttonVariants({ className, size, variant }))}
            data-size={size}
            data-slot="button"
            data-variant={variant}
            {...props}
        />
    );
}

export { Button, buttonVariants };
