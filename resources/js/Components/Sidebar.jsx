import { Link } from "@inertiajs/react";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-slate-900 text-white p-4">
            <h1 className="text-2xl font-bold mb-8">Agency CRM</h1>

            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className="block p-2 hover:bg-slate-800 rounded"
                >
                    Dashboard
                </Link>

                <Link
                    href="/leads"
                    className="block p-2 hover:bg-slate-800 rounded"
                >
                    Leads
                </Link>

                <Link
                    href="/clients"
                    className="block p-2 hover:bg-slate-800 rounded"
                >
                    Clients
                </Link>

                <Link
                    href="/deals"
                    className="block p-2 hover:bg-slate-800 rounded"
                >
                    Deals
                </Link>
                <Link
                    href="/products"
                    className="block p-2 hover:bg-slate-800 rounded"
                >
                    Products & Services
                </Link>
            </nav>
        </aside>
    );
}
