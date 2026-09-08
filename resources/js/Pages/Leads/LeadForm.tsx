import { FormEvent } from "react";

export type Option = {
    value: string;
    label: string;
};

export type Owner = {
    id: number;
    name: string;
};

export type Company = {
    id: number;
    name: string;
};

export type LeadFormData = {
    name: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    priority: string;
    owner_id: string;
    company_id: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

type Props = {
    data: LeadFormData;

    setData: <K extends keyof LeadFormData>(
        key: K,
        value: LeadFormData[K],
    ) => void;

    errors: LeadFormErrors;

    processing: boolean;

    statuses: Option[];
    sources: Option[];
    priorities: Option[];
    owners: Owner[];
    companies: Company[];

    submitLabel?: string;

    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function LeadForm({
    data,
    setData,
    errors,
    processing,
    statuses,
    sources,
    priorities,
    owners,
    companies,
    submitLabel = "Save Lead",
    onSubmit,
}: Props) {
    return (
        <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                        autoComplete="name"
                        required
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                        autoComplete="email"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Phone
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                        autoComplete="tel"
                    />

                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                        </p>
                    )}
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
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                    >
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>

                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.status}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="source"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Source
                    </label>

                    <select
                        id="source"
                        value={data.source}
                        onChange={(e) => setData("source", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                    >
                        <option value="">No source</option>

                        {sources.map((source) => (
                            <option key={source.value} value={source.value}>
                                {source.label}
                            </option>
                        ))}
                    </select>

                    {errors.source && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.source}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="priority"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Priority
                    </label>

                    <select
                        id="priority"
                        value={data.priority}
                        onChange={(e) => setData("priority", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                    >
                        {priorities.map((priority) => (
                            <option key={priority.value} value={priority.value}>
                                {priority.label}
                            </option>
                        ))}
                    </select>

                    {errors.priority && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.priority}
                        </p>
                    )}
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
                        value={data.owner_id}
                        onChange={(e) => setData("owner_id", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                    >
                        <option value="">Unassigned</option>

                        {owners.map((owner) => (
                            <option key={owner.id} value={owner.id}>
                                {owner.name}
                            </option>
                        ))}
                    </select>

                    {errors.owner_id && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.owner_id}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="company_id"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Company
                    </label>

                    <select
                        id="company_id"
                        value={data.company_id}
                        onChange={(e) => setData("company_id", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
                    >
                        <option value="">No company</option>

                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    {errors.company_id && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.company_id}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
