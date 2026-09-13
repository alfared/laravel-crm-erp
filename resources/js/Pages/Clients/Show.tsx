import { Head, Link } from "@inertiajs/react";

import CRMLayout from "@/Layouts/CRMLayout";

type Company = {
    id: number;
    name: string;
};

type Owner = {
    id: number;
    name: string;
};
type Client = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    company_id: number | null;
    owner_id: number | null;
    job_title: string | null;
    department: string | null;
    birthday: string | null;
    preferred_language: string | null;
    timezone: string | null;
    created_at: string;
    updated_at: string;
    company: Company | null;
    owner: Owner | null;
};

type Props = {
    client: Client;
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

function formatDate(value: string): string {
    if (!value) {
        return "—";
    }

    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(value));
}

export default function Show({ client }: Props) {
    return (
        <CRMLayout>
            <Head title={client.name} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <Link
                            href="/clients"
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            ← Back to Clients
                        </Link>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {client.name}
                            </h1>

                            <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses(
                                    client.status,
                                )}`}
                            >
                                {statusLabel(client.status)}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Client profile
                        </p>
                    </div>
                    <Link
                        href={`/clients/${client.id}/edit`}
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Edit Client
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <section className="rounded-2xl bg-white p-6 shadow-sm"></section>
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Professional
                        </h2>
                    </section>
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            CRM Information
                        </h2>
                        <dl className="mt-5 space-y-4">
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Status
                                </dt>
                                <dd className="mt-1">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses(
                                            client.status,
                                        )}`}
                                    >
                                        {statusLabel(client.status)}
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Account Manager
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {client.owner?.name ?? "Unassigned"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Created
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {formatDate(client.created_at)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Last Updated
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {formatDate(client.updated_at)}
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>
        </CRMLayout>
    );
}
