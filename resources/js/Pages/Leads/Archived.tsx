import { Head, Link } from "@inertiajs/react";
import CRMLayout from "@/Layouts/CRMLayout";
import LeadTable, { PaginatedLeads } from "@/Components/Leads/LeadTable";

type Props = {
    leads: PaginatedLeads;
};

export default function Archived({ leads }: Props) {
    return (
        <CRMLayout>
            <Head title="Archived Leads" />
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Archived Leads</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {leads.total} archived leads
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/leads"
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Active
                        </Link>
                        <Link
                            href="/leads/trash"
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Trash
                        </Link>
                    </div>
                </div>
            </div>
            <LeadTable leads={leads} mode="archived" />
        </CRMLayout>
    );
}
