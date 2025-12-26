"use client";

import { ProgressProvider } from "@bprogress/next/app";

import { Toaster } from "@/components/ui/sonner";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider color="#ffffff" height="4px" options={{ showSpinner: false }} shallowRouting>
            {children}
            <Toaster />
        </ProgressProvider>
    );
}

export default LayoutWrapper;
