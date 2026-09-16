import { Head, useForm } from "@inertiajs/react";
import CRMLayout from "@/Layouts/CRMLayout";
import { LeadFormData } from "./LeadForm";

type Option = {
    value: string;
    label: string;
};

type User = {
    id: number;
    name: string;
};

type Company = {
    id: number;
    name: string;
};

type Props = {
    statuses: Option[];
    sources: Option[];
    priorities: Option[];
    owners: User[];
    companies: Company[];
};

export default function Create({
    statuses,
    sources,
    priorities,
    owners,
    companies,
}: Props) {
    const { data, setData, post, processing, errors } = useForm<LeadFormData>({
        name: "",
        email: "",
        phone: "",
        status: "new",
        source: "",
        priority: "medium",
        owner_id: "",
        company_id: "",
    });

    const submit = (e: import("react").FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/leads");
    };

    return (
        <CRMLayout>
            <Head title="New Lead" />

            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-3xl font-bold">New Lead</h1>

                <form
                    onSubmit={submit}
                    className="rounded-3xl bg-white p-8 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            />

                            {errors.name && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            />

                            {errors.email && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            />

                            {errors.phone && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                {statuses.map((status) => (
                                    <option
                                        key={status.value}
                                        value={status.value}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>

                            {errors.status && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.status}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Source
                            </label>

                            <select
                                value={data.source}
                                onChange={(e) =>
                                    setData("source", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
                            >
                                <option value="">Select source</option>

                                {sources.map((source) => (
                                    <option
                                        key={source.value}
                                        value={source.value}
                                    >
                                        {source.label}
                                    </option>
                                ))}
                            </select>

                            {errors.source && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.source}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Priority
                            </label>

                            <select
                                value={data.priority}
                                onChange={(e) =>
                                    setData("priority", e.target.value)
                                }
                                className="w-full rounded-xl border-gray-300"
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

                            {errors.priority && (
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.priority}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Owner
                            </label>

                            <select
                                value={data.owner_id}
                                onChange={(e) =>
                                    setData("owner_id", e.target.value)
                                }
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
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.owner_id}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium">
                                Company
                            </label>

                            <select
                                value={data.company_id}
                                onChange={(e) =>
                                    setData("company_id", e.target.value)
                                }
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
                                <div className="mt-1 text-sm text-red-600">
                                    {errors.company_id}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save Lead"}
                        </button>
                    </div>
                </form>
            </div>
        </CRMLayout>
    );
}
