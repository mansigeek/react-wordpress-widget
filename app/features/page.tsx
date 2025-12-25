import { CheckCircle2 } from "lucide-react";

import { features } from "@/data/features/features";

export default function FeaturesPage() {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="font-bold mb-4 md:text-5xl text-4xl text-white">Features & Capabilities</h1>
                    <p className="max-w-2xl mb-6 mx-auto text-gray-300 text-lg">
                        Everything you need to build production-ready applications. This starter kit includes
                        comprehensive tooling, modern libraries, and best practices out of the box.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="gap-6 grid lg:grid-cols-3 md:grid-cols-2">
                    {features.map(feature => {
                        const Icon = feature.icon;
                        return (
                            <div
                                className={`
                                  bg-gray-900 border border-gray-800
                                  hover:border-gray-700
                                  p-6 rounded-lg transition-colors
                                `}
                                key={feature.title}
                            >
                                <div className="flex gap-3 items-center mb-4">
                                    <Icon className={`${feature.color} size-6`} />
                                    <h3 className="font-semibold text-white text-xl">{feature.title}</h3>
                                </div>
                                <p className="mb-4 text-gray-400 text-sm">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.items.map(item => {
                                        return (
                                            <li className="flex gap-2 items-center text-gray-300 text-sm" key={item}>
                                                <CheckCircle2 className="size-4 text-green-400" />
                                                <span>{item}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Info Section */}
                <div className="bg-gradient-to-r border border-gray-700 from-gray-900 mt-16 p-8 rounded-lg to-gray-800">
                    <h2 className="font-bold mb-6 text-2xl text-white">What&apos;s Included</h2>
                    <div className="gap-6 grid md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg text-white">Production Ready</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• Optimized build configuration</li>
                                <li>• Error handling and boundaries</li>
                                <li>• SEO-friendly structure</li>
                                <li>• Performance optimizations</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-lg text-white">Best Practices</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>• TypeScript for type safety</li>
                                <li>• Consistent code formatting</li>
                                <li>• Automated linting</li>
                                <li>• Git hooks for quality control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
