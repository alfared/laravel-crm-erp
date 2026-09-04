import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leads", href: "/leads" },
    { name: "Clients", href: "/clients" },
    { name: "Deals", href: "/deals" },
    { name: "Products & Services", href: "/products" },
];

export default function CRMLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (href: string) =>
        url === href || (href !== "/dashboard" && url.startsWith(href));

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    w-64
                    bg-slate-950 text-white
                    transition-transform duration-200
                    lg:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
                    <Link href="/dashboard" className="text-lg font-semibold">
                        Agency CRM
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                <nav className="space-y-1 p-3">
                    {navigation.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    block rounded-lg px-3 py-2.5
                                    text-sm font-medium
                                    transition-colors
                                    ${
                                        active
                                            ? "bg-slate-800 text-white"
                                            : "text-slate-300 hover:bg-slate-900 hover:text-white"
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main wrapper */}
            <div className="min-h-screen lg:pl-64">
                {/* Mobile header */}
                <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
                    >
                        ☰
                    </button>

                    <span className="ml-3 font-semibold text-slate-900">
                        Agency CRM
                    </span>
                </header>

                <main>
                    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
