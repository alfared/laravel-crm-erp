import { Link } from "@inertiajs/react";

export type ClientCompany = {
    id: number;
    name: string;
};

export type ClientOwner = {
    id: number;
    name: string;
};

export type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    job_title: string;
    department: string;
    preferred_language: string | null;
    timezone: string | null;
    company: ClientCompany | null;
    owner: ClientOwner | null;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedClients = {
    data: Client[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
};

type Props = {
    clients: PaginatedClients;
};

function statusClasses(status: string): string {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-700";

        case "inactive":
            return "bg-gray-100 text-gray-700";

        case "prospect":
            return "bg-blue-100 text-blue-700";

        case "vip":
            return "bg-purple-100 text-purple-700";

        case "blocked":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

function statusLabel(status: string): string {
    return status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ClientTable({ clients }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Client
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Company
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Owner
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Job
                            </th>

                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {clients.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-12 text-center text-sm text-gray-500"
                                >
                                    No clients found.
                                </td>
                            </tr>
                        ) : (
                            clients.data.map((client) => (
                                <tr
                                    key={client.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/clients/${client.id}`}
                                            className="block"
                                        >
                                            <div className="font-medium text-gray-900">
                                                {client.name}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {client.email || "No email"}
                                            </div>

                                            {client.phone && (
                                                <div className="mt-0.5 text-xs text-gray-400">
                                                    {client.phone}
                                                </div>
                                            )}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses(
                                                client.status,
                                            )}`}
                                        >
                                            {statusLabel(client.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {client.company?.name ?? "—"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {client.owner?.name ?? "Unassigned"}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700">
                                            {client.job_title ?? "—"}
                                        </div>

                                        {client.department && (
                                            <div className="mt-1 text-xs text-gray-500">
                                                {client.department}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                href={`/clients/${client.id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/clients/${client.id}/edit`}
                                                className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {clients.last_page > 1 && (
                <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {clients.from ?? 0} to {clients.to ?? 0} of{" "}
                        {clients.total} clients
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {clients.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="cursor-not-allowed rounded-lg border border-gray-100 px-3 py-2 text-sm text-gray-300"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
