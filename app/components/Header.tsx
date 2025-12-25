import Link from "next/link";

export function Header() {
    return (
        <header className={`backdrop-blur-sm bg-black/80 border-border rder-b sticky text-white top-0 w-full z-50`}>
            <nav className="container flex h-14 items-center">
                <div className="flex mr-4">
                    <Link className="flex items-center mr-6 space-x-2" href="/">
                        <span className="font-bold">Next.js Starter Kit</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
                    <nav className="flex items-center space-x-6">
                        <Link
                            className={`font-medium hover:text-white/80 text-sm text-white/60 transition-colors`}
                            href="/"
                        >
                            Home
                        </Link>
                        <Link
                            className={`font-medium hover:text-white/80 text-sm text-white/60 transition-colors`}
                            href="/packages"
                        >
                            Packages
                        </Link>
                        <Link
                            className={`font-medium hover:text-white/80 text-sm text-white/60 transition-colors`}
                            href="/features"
                        >
                            Features
                        </Link>
                    </nav>
                </div>
            </nav>
        </header>
    );
}
