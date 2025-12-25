import Link from "next/link";

import { features } from "@/data/home/features";
import { stats } from "@/data/home/stats";

export default function Home() {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="font-bold mb-4 md:text-6xl text-5xl text-white">Next.js Starter Kit</h1>
                    <p className="max-w-2xl mb-8 md:text-xl mx-auto text-gray-300 text-lg">
                        A production-ready Next.js starter template with modern tools, best practices, and a
                        comprehensive package ecosystem. Clone and build your next application with confidence.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            className={`
                              bg-white font-semibold
                              hover:bg-gray-100
                              px-6 py-3 rounded-lg text-black transition-colors
                            `}
                            href="/packages"
                        >
                            View Packages
                        </Link>
                        <Link
                            className={`
                              bg-gray-800 border border-gray-700 font-semibold
                              hover:bg-gray-700
                              px-6 py-3 rounded-lg text-white transition-colors
                            `}
                            href="/features"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="gap-6 grid mb-16 md:grid-cols-3">
                    {stats.map(stat => {
                        const Icon = stat.icon;
                        return (
                            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg" key={stat.label}>
                                <div className="flex gap-4 items-center mb-2">
                                    <Icon className="size-8 text-blue-400" />
                                    <div className="font-bold text-3xl text-white">{stat.value}</div>
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Features Grid */}
                <div className="mb-12">
                    <h2 className="font-bold mb-8 text-3xl text-center text-white">Key Features</h2>
                    <div className="gap-6 grid lg:grid-cols-4 md:grid-cols-2">
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
                                    <Icon className={`${feature.color} mb-4 size-8`} />
                                    <h3 className="font-semibold mb-2 text-white text-xl">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Start Section */}
                <div className="bg-gradient-to-r border border-gray-700 from-gray-900 p-8 rounded-lg to-gray-800">
                    <h2 className="font-bold mb-4 text-2xl text-white">Quick Start</h2>
                    <div className="space-y-3 text-gray-300">
                        <div className="flex gap-3 items-start">
                            <span className="bg-gray-800 font-mono px-2 py-1 rounded-sm text-sm">1</span>
                            <p>Clone this repository and install dependencies</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-gray-800 font-mono px-2 py-1 rounded-sm text-sm">2</span>
                            <p>Explore the Packages page to see all available dependencies</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-gray-800 font-mono px-2 py-1 rounded-sm text-sm">3</span>
                            <p>Check the Features page to understand capabilities</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-gray-800 font-mono px-2 py-1 rounded-sm text-sm">4</span>
                            <p>Start building your production-ready application!</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
