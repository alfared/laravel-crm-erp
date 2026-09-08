import LeadForm, { LeadFormData } from "@/Pages/Leads/LeadForm";
import CRMLayout from "@/Layouts/CRMLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

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

type Lead = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    source: string | null;
    priority: string;
    owner_id: number | null;
    company_id: number | null;
};

type Props = {
    lead: Lead;
    statuses: Option[];
    sources: Option[];
    priorities: Option[];
    owners: Owner[];
    companies: Company[];
};

export default function Edit({
    lead,
    statuses,
    sources,
    priorities,
    owners,
    companies,
}: Props) {
    const { data, setData, put, processing, errors } = useForm<LeadFormData>({
        name: lead.name,
        email: lead.email ?? "",
        phone: lead.phone ?? "",
        status: lead.status,
        source: lead.source ?? "",
        priority: lead.priority ?? "medium",
        owner_id: lead.owner_id?.toString() ?? "",
        company_id: lead.company_id?.toString() ?? "",
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/leads/${lead.id}`);
    };

    return (
        <CRMLayout>
            <Head title={`Edit ${lead.name}`} />

            <div className="mx-auto max-w-6xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Edit Lead
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Update lead information and ownership.
                    </p>
                </div>

                <LeadForm
                    data={data}
                    setData={setData}
                    statuses={statuses}
                    sources={sources}
                    priorities={priorities}
                    owners={owners}
                    companies={companies}
                    errors={errors}
                    processing={processing}
                    submitLabel="Save Changes"
                    onSubmit={submit}
                />
            </div>
        </CRMLayout>
    );
}
