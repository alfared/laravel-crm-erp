import { Client } from "@/Components/Clients/ClientTable";
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

export type ClientFormData = {
    name: string;
    email: string;
    phone: string;
    company_id: string;
    owner_id: string;
    job_title: string;
    department: string;
    birthday: string;
    preferred_language: string;
    timezone: string;
    status: string;
};

type ClientFormErrors = Partial<Record<keyof ClientFormData, string>>;

type Props = {
    data: ClientFormData;
    setData: <K extends keyof ClientFormData>(
        key: K,
        value: ClientFormData[K],
    ) => void;
    errors: ClientFormErrors;

    processing: boolean;

    statuses: Option[];
    companies: Company[];
    owners: Owner[];

    submitLabel?: string;

    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ClientForm({
    data,
    setData,
    errors,
    processing,
    statuses,
    companies,
    owners,
    submitLabel = "Save Client",
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
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full rounded-xl border-gray-300"
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
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        className="w-full rounded-xl border-gray-300"
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
                        onChange={(event) =>
                            setData("phone", event.target.value)
                        }
                        className="w-full rounded-xl border-gray-300"
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
                        onChange={(event) =>
                            setData("status", event.target.value)
                        }
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
                        htmlFor="company_id"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Company
                    </label>
                    <select
                        id="company_id"
                        value={data.company_id}
                        onChange={(event) =>
                            setData("company_id", event.target.value)
                        }
                        className="w-full rounded-xl border-gray-300"
                    >
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
                        onChange={(event) =>
                            setData("owner_id", event.target.value)
                        }
                        className="w-full rounded-xl border-gray-300"
                    >
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
                <div>
                    <label
                        htmlFor="job_title"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Job Title
                    </label>

                    <input
                        id="job_title"
                        type="text"
                        value={data.job_title}
                        onChange={(event) =>
                            setData("job_title", event.target.value)
                        }
                        placeholder="Job Title"
                        className="w-full rounded-xl border-gray-300"
                    />

                    {errors.job_title && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.job_title}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="department"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Department
                    </label>

                    <input
                        id="department"
                        type="text"
                        value={data.department}
                        onChange={(event) =>
                            setData("department", event.target.value)
                        }
                        placeholder="Department"
                        className="w-full rounded-xl border-gray-300"
                    />

                    {errors.department && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.department}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="birthday"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Birthday
                    </label>
                    <input
                        id="birthday"
                        type="date"
                        value={data.birthday}
                        onChange={(event) =>
                            setData("birthday", event.target.value)
                        }
                        className="w-full rounded-xl border-gray-300"
                    />
                    {errors.birthday && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.birthday}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="preferred_language"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Preferred Language
                    </label>
                    <input
                        id="preferred_language"
                        type="text"
                        value={data.preferred_language}
                        onChange={(event) =>
                            setData("preferred_language", event.target.value)
                        }
                        placeholder="Preferred Language"
                        className="w-full rounded-xl border-gray-300"
                    />

                    {errors.preferred_language && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.preferred_language}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="timezone"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Timezone
                    </label>
                    <input
                        id="timezone"
                        type="text"
                        value={data.timezone}
                        onChange={(event) =>
                            setData("timezone", event.target.value)
                        }
                        placeholder="Europe/Prague"
                        className="w-full rounded-xl border-gray-300"
                    />
                    {errors.timezone && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.timezone}
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
