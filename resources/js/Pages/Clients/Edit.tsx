import { FormEvent } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import CRMLayout from "@/Layouts/CRMLayout";
import ClientForm, {
    ClientFormData,
    Company,
    Option,
    Owner,
} from "./ClientForm";

type Client = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    company_id: number | null;
    owner_id: number | null;
    job_title: string | null;
    department: string | null;
    birthday: string | null;
    preferred_language: string | null;
    timezone: string | null;
    status: string;
};

type Props = {
    client: Client;
    statuses: Option[];
    companies: Company[];
    owners: Owner[];
};

export default function Edit({ client, statuses, companies, owners }: Props) {
    const { data, setData, put, processing, errors } = useForm<ClientFormData>({
        name: client.name ?? "",
        email: client.email ?? "",
        phone: client.phone ?? "",
        company_id: client.company_id ? String(client.company_id) : "",
        owner_id: client.owner_id ? String(client.owner_id) : "",
        job_title: client.job_title ?? "",
        department: client.department ?? "",
        birthday: client.birthday ? client.birthday.slice(0, 10) : "",
        preferred_language: client.preferred_language ?? "",
        timezone: client.timezone ?? "",
        status: client.status ?? "active",
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/clients/${client.id}`);
    };

    return (
        <CRMLayout>
            <Head title={`Edit ${client.name}`} />

            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <Link
                        href={`/clients/${client.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Client
                    </Link>

                    <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                        Edit Client
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Update {client.name}.
                    </p>
                </div>

                <ClientForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    statuses={statuses}
                    companies={companies}
                    owners={owners}
                    submitLabel="Update Client"
                    onSubmit={submit}
                />
            </div>
        </CRMLayout>
    );
}
