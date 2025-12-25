"use client";

import { ProgressProvider } from "@bprogress/next/app";

import { Header } from "@/app/components/Header";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider color="#ffffff" height="4px" options={{ showSpinner: false }} shallowRouting>
            <Header />
            {children}
        </ProgressProvider>
    );
}

export default LayoutWrapper;
