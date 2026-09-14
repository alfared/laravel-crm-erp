import { FormEvent } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import CRMLayout from "@/Layouts/CRMLayout";
import ClientForm, {
    ClientFormData,
    Company,
    Option,
    Owner,
} from "./ClientForm";

type Props = {
    statuses: Option[];
    companies: Company[];
    owners: Owner[];
};

export default function Create({ statuses, companies, owners }: Props) {
    const { data, setData, post, processing, errors } = useForm<ClientFormData>(
        {
            name: "",
            email: "",
            phone: "",
            company_id: "",
            owner_id: "",
            job_title: "",
            department: "",
            birthday: "",
            preferred_language: "",
            timezone: "",
            status: "active",
        },
    );

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post("/clients");
    };

    return (
        <CRMLayout>
            <Head title="New Client" />
            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <Link
                        href="/clients"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Back to Clients
                    </Link>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-900">
                        New Client
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create a new CRM client.
                    </p>
                    <ClientForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        statuses={statuses}
                        companies={companies}
                        owners={owners}
                        submitLabel="Create Client"
                        onSubmit={submit}
                    />
                </div>
            </div>
        </CRMLayout>
    );
}
