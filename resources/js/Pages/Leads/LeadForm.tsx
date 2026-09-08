import { FormEvent } from "react";
import { Link } from "@inertiajs/react";

type Option = {
    value: string;
    label: string;
};

type Owner = {
    id: number;
    name: string;
};

type Company = {
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

type Props = {
    data: LeadFormData;
    setData: (key: keyof LeadFormData, value: string) => void;

    statuses: Option[];
    sources: Option[];
    priorities: Option[];
    owners: Owner[];
    companies: Company[];

    errors: Partial<Record<keyof LeadFormData, string>>;

    processing: boolean;
    submitLabel: string;

    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const inputClass =
    "mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";

const labelClass = "block text-sm font-medium text-slate-700";

export default function LeadForm({
    data,
    setData,
    statuses,
    sources,
    priorities,
    owners,
    companies,
    errors,
    processing,
    submitLabel,
    onSubmit,
}: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-base font-semibold text-slate-900">
                    Lead information
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Status" error={errors.status}>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className={inputClass}
                        >
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Source" error={errors.source}>
                        <select
                            value={data.source}
                            onChange={(e) => setData("source", e.target.value)}
                            className={inputClass}
                        >
                            {sources.map((source) => (
                                <option key={source.value} value={source.value}>
                                    {source.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Priority" error={errors.priority}>
                        <select
                            value={data.priority}
                            onChange={(e) =>
                                setData("priority", e.target.value)
                            }
                            className={inputClass}
                        >
                            {priorities.map((priority) => (
                                <option
                                    key={priority.value}
                                    value={priority.value}
                                >
                                    {priority.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Owner" error={errors.owner_id}>
                        <select
                            value={data.owner_id}
                            onChange={(e) =>
                                setData("owner_id", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">Unassigned</option>

                            {owners.map((owner) => (
                                <option key={owner.id} value={owner.id}>
                                    {owner.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                    href="/leads"
                    className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            {children}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
