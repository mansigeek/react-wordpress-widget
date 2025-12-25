"use client";

import { ProgressProvider } from "@bprogress/next/app";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider color="#ffffff" height="4px" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressProvider>
    );
}

export default LayoutWrapper;
