import { ExternalLink, Package } from "lucide-react";

import { dependencies } from "@/data/packages/dependencies";
import { devDependencies } from "@/data/packages/devDependencies";
import { categories, type PackageItem } from "@/data/packages/types";

function PackageCard({ pkg }: { pkg: PackageItem }) {
    return (
        <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 p-4 rounded-lg transition-colors">
            <div className="flex gap-2 items-start justify-between mb-2">
                <div className="flex-1">
                    <div className="flex gap-2 items-center mb-1">
                        <Package className="size-4 text-blue-400" />
                        <a
                            className="font-mono font-semibold hover:text-blue-400 text-sm text-white transition-colors"
                            href={pkg.npmUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {pkg.name}
                        </a>
                        <span
                            className={`px-2 py-0.5 rounded-sm text-xs ${
                                pkg.type === "dependency" ?
                                    "bg-green-900/30 text-green-400"
                                :   "bg-blue-900/30 text-blue-400"
                            }`}
                        >
                            {pkg.type === "dependency" ? "dep" : "dev"}
                        </span>
                    </div>
                    <div className="mb-2 text-gray-400 text-xs">{pkg.version}</div>
                </div>
                <a
                    className="hover:text-blue-400 text-gray-500 transition-colors"
                    href={pkg.npmUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="View on npm"
                >
                    <ExternalLink className="size-4" />
                </a>
            </div>
            <p className="text-gray-300 text-sm">{pkg.description}</p>
        </div>
    );
}

export default function PackagesPage() {
    const allPackages = [...dependencies, ...devDependencies];
    const packagesByCategory = categories.map(category => {
        return {
            category,
            packages: allPackages.filter(pkg => {
                return pkg.category === category;
            }),
        };
    });

    return (
        <main className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-bold mb-4 md:text-5xl text-4xl text-white">Package Ecosystem</h1>
                    <p className="mb-6 text-gray-300 text-lg">
                        Complete overview of all dependencies and development tools included in this starter kit
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">
                            <span className="text-gray-400 text-sm">Production: </span>
                            <span className="font-semibold text-white">{dependencies.length}</span>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">
                            <span className="text-gray-400 text-sm">Development: </span>
                            <span className="font-semibold text-white">{devDependencies.length}</span>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg">
                            <span className="text-gray-400 text-sm">Total: </span>
                            <span className="font-semibold text-white">{allPackages.length}</span>
                        </div>
                    </div>
                </div>

                {/* Packages by Category */}
                <div className="space-y-12">
                    {packagesByCategory.map(({ category, packages }) => {
                        return (
                            packages.length > 0 && (
                                <div key={category}>
                                    <h2 className="flex font-bold gap-2 items-center mb-6 text-2xl text-white">
                                        <Package className="size-6 text-blue-400" />
                                        {category}
                                        <span
                                            className={`
                                              bg-gray-800 font-normal px-2 py-1 rounded-sm text-gray-400 text-sm
                                            `}
                                        >
                                            {packages.length}
                                        </span>
                                    </h2>
                                    <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-2">
                                        {packages.map(pkg => {
                                            return <PackageCard key={pkg.name} pkg={pkg} />;
                                        })}
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
