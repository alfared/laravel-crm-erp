import { FormEvent, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";

import CRMLayout from "@/Layouts/CRMLayout";
import LeadTable, { PaginatedLeads } from "@/Components/Leads/LeadTable";

type Option = {
    value: string;
    label: string;
};

type Owner = {
    id: number;
    name: string;
};

type Filters = {
    search: string;
    status: string;
    source: string;
    priority: string;
    owner_id: string | number;
    per_page: number;
};

type Props = {
    leads: PaginatedLeads;
    filters: Filters;
    statuses: Option[];
    sources: Option[];
    priorities: Option[];
    owners: Owner[];
};

export default function Index({
    leads,
    filters,
    statuses,
    sources,
    priorities,
    owners,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");
    const [source, setSource] = useState(filters.source ?? "");
    const [priority, setPriority] = useState(filters.priority ?? "");
    const [ownerId, setOwnerId] = useState(
        filters.owner_id ? String(filters.owner_id) : "",
    );
    const [perPage, setPerPage] = useState(String(filters.per_page ?? 10));

    const submit = (e: FormEvent) => {
        e.preventDefault();

        router.get(
            "/leads",
            {
                search: search || undefined,
                status: status || undefined,
                source: source || undefined,
                priority: priority || undefined,
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
        setSource("");
        setPriority("");
        setOwnerId("");
        setPerPage("10");

        router.get(
            "/leads",
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    };

    return (
        <CRMLayout>
            <Head title="Leads" />

            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Leads</h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {leads.total} leads total
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/leads/archived"
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Archived
                        </Link>
                        <Link
                            href="/leads/trash"
                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Trash
                        </Link>
                        <Link
                            href="/leads/create"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                        >
                            New Lead
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="mb-6 rounded-2xl bg-white p-5 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <div className="xl:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Search
                            </label>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Name, email or phone"
                                className="w-full rounded-xl border-gray-300"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
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
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Source
                            </label>

                            <select
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">All sources</option>

                                {sources.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Priority
                            </label>

                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">All priorities</option>

                                {priorities.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Per page
                            </label>
                            <select
                                value={perPage}
                                onChange={(e) => setPerPage(e.target.value)}
                                className="w-full rounded-xl border-gray-300"
                            ></select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Owner
                            </label>

                            <select
                                value={ownerId}
                                onChange={(e) => setOwnerId(e.target.value)}
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

                        <div className="flex items-end gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                            >
                                Apply filters
                            </button>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>

                <LeadTable leads={leads} mode="active" />
            </div>
        </CRMLayout>
    );
}
