import { ExportButton } from "./builder/components/ExportButton";
import { PreviewCanvas } from "./builder/components/preview/PreviewCanvas";
import { Sidebar } from "./builder/components/sidebar/Sidebar";

export default function Home() {
    return (
        <main className="grid grid-cols-[auto_1fr] min-h-screen">
            <Sidebar />
            <PreviewCanvas />
            <ExportButton />
        </main>
    );
}
