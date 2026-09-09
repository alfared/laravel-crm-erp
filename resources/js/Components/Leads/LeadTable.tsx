import { Link, router } from "@inertiajs/react";
import LeadBadge from "@/Components/Leads/LeadBadge";

export type LeadOwner = {
    id: number;
    name: string;
};

export type LeadCompany = {
    id: number;
    name: string;
};

export type Lead = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    source: string | null;
    priority: string;
    owner: LeadOwner | null;
    company: LeadCompany | null;
    archived_at: string | null;
    deleted_at: string | null;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedLeads = {
    data: Lead[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Mode = "active" | "archived" | "trash";

type Props = {
    leads: PaginatedLeads;
    mode?: Mode;
};
export default function LeadTable({ leads, mode = "active" }: Props) {
    const archiveLead = (lead: Lead) => {
        if (!window.confirm(`Archive "${lead.name}"?`)) {
            return;
        }

        router.post(
            `/leads/${lead.id}/archive`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const unarchiveLead = (lead: Lead) => {
        router.post(
            `/leads/${lead.id}/unarchive`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deleteLead = (lead: Lead) => {
        if (!window.confirm(`Move "${lead.name}" to trash?`)) {
            return;
        }

        router.delete(`/leads/${lead.id}`, {
            preserveScroll: true,
        });
    };

    const restoreLead = (lead: Lead) => {
        router.post(
            `/leads/${lead.id}/restore`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Lead
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Status
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Source
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Priority
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Owner
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Company
                            </th>

                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.data.map((lead) => (
                            <tr
                                key={lead.id}
                                className={
                                    mode === "trash"
                                        ? ""
                                        : "cursor-pointer hover:bg-gray-50"
                                }
                                onClick={() => {
                                    if (mode !== "trash") {
                                        router.visit(`/leads/${lead.id}`);
                                    }
                                }}
                            >
                                <td className="px-6 py-4">
                                    {mode === "trash" ? (
                                        <>
                                            <div className="font-semibold text-gray-900">
                                                {lead.name}
                                            </div>

                                            <div className="mt-1 text-sm text-gray-500">
                                                {lead.email || "—"}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={`/leads/${lead.id}`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="font-semibold text-gray-900 hover:text-blue-600"
                                            >
                                                {lead.name}
                                            </Link>

                                            <div className="mt-1 text-sm text-gray-500">
                                                {lead.email || "—"}
                                            </div>
                                        </>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <LeadBadge
                                        type="status"
                                        value={lead.status}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <LeadBadge
                                        type="source"
                                        value={lead.source}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <LeadBadge
                                        type="priority"
                                        value={lead.priority}
                                    />
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {lead.owner?.name || "Unassigned"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {lead.company?.name || "—"}
                                </td>
                                <td
                                    className="px-6 py-4 text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-end gap-3">
                                        {mode === "active" && (
                                            <>
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        archiveLead(lead)
                                                    }
                                                    className="text-sm font-medium text-amber-600 hover:text-amber-800"
                                                >
                                                    Archive
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteLead(lead)
                                                    }
                                                    className="text-sm font-medium text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                        {mode === "archived" && (
                                            <>
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        unarchiveLead(lead)
                                                    }
                                                    className="text-sm font-medium text-green-600 hover:text-green-800"
                                                >
                                                    Unarchive
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteLead(lead)
                                                    }
                                                    className="text-sm font-medium text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                        {mode === "trash" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    restoreLead(lead)
                                                }
                                                className="text-sm font-medium text-green-600 hover:text-green-800"
                                            >
                                                Restore
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {leads.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No leads found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-gray-500">
                    Showing {leads.from ?? 0} to {leads.to ?? 0} of{" "}
                    {leads.total}
                </div>
                {leads.last_page > 1 && (
                    <div className="flex flex-wrap gap-2">
                        {leads.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? "#"}
                                preserveScroll
                                className={[
                                    "rounded-lg border px-3 py-2 text-sm",
                                    link.active
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url
                                        ? "pointer-events-none opacity-40"
                                        : "",
                                ].join(" ")}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            ></Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
