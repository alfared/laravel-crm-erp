import CRMLayout from "@/Layouts/CRMLayout";
import { router } from "@inertiajs/react";
import type { Lead } from "@/types/lead";

interface IndexProps {
    leads: Lead[];
}

export default function Index({ leads }: IndexProps) {
    return (
        <CRMLayout>
            <div className="flex justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Leads</h1>

                    <p className="text-slate-500">Manage incoming leads</p>
                </div>

                <button
                    onClick={() => router.visit("/leads/create")}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl"
                >
                    Add Lead
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="border-b bg-slate-50">
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Phone</th>
                            <th className="text-left p-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leads.map((lead) => (
                            <tr
                                key={lead.id}
                                onClick={() =>
                                    router.visit(`/leads/${lead.id}`)
                                }
                                className="cursor-pointer hover:bg-slate-50 transition"
                            >
                                <td className="p-4">{lead.name}</td>

                                <td className="p-4">{lead.email}</td>

                                <td className="p-4">{lead.phone}</td>

                                <td className="p-4">{lead.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CRMLayout>
    );
}
