import { FormEvent, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";

import CRMLayout from "@/Layouts/CRMLayout";
import ClientTable, {
    PaginatedClients,
} from "@/Components/Clients/ClientTable";

type Option = {
    value: string;
    label: string;
};

type Company = {
    id: number;
    name: string;
};

type Owner = {
    id: number;
    name: string;
};

type Filters = {
    search: string;
    status: string;
    company_id: string | number;
    owner_id: string | number;
    per_page: number;
};

type Props = {
    clients: PaginatedClients;
    filters: Filters;
    statuses: Option[];
    companies: Company[];
    owners: Owner[];
};

export default function Index({
    clients,
    filters,
    statuses,
    companies,
    owners,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");
    const [companyId, setCompanyId] = useState(
        filters.company_id ? String(filters.company_id) : "",
    );
    const [ownerId, setOwnerId] = useState(
        filters.owner_id ? String(filters.owner_id) : "",
    );
    const [perPage, setPerPage] = useState(Number(filters.per_page ?? 10));

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            "/clients",
            {
                search: search || undefined,
                status: status || undefined,
                company_id: companyId || undefined,
                owner_id: ownerId || undefined,
                per_page: perPage,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("");
        setCompanyId("");
        setOwnerId("");
        setPerPage(10);

        router.get(
            "/clients",
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const changePerPage = (value: number) => {
        setPerPage(value);

        router.get(
            "/clients",
            {
                search: search || undefined,
                status: status || undefined,
                company_id: companyId || undefined,
                owner_id: ownerId || undefined,
                per_page: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <CRMLayout>
            <Head title="Clients" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Clients
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage customers and contacts.
                        </p>
                    </div>

                    <Link
                        href="/clients/create"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        New Client
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <div>
                            <label
                                htmlFor="search"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Search
                            </label>

                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Name, email, phone..."
                                className="w-full rounded-xl border-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">All statuses</option>

                                {statuses.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="company_id"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Company
                            </label>

                            <select
                                id="company_id"
                                value={companyId}
                                onChange={(event) =>
                                    setCompanyId(event.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">All companies</option>

                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="owner_id"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Owner
                            </label>

                            <select
                                id="owner_id"
                                value={ownerId}
                                onChange={(event) =>
                                    setOwnerId(event.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">All owners</option>

                                {owners.map((owner) => (
                                    <option key={owner.id} value={owner.id}>
                                        {owner.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="per_page"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Per Page
                            </label>

                            <select
                                id="per_page"
                                value={perPage}
                                onChange={(event) =>
                                    changePerPage(Number(event.target.value))
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="submit"
                            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Apply Filters
                        </button>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                <ClientTable clients={clients} />
            </div>
        </CRMLayout>
    );
}
