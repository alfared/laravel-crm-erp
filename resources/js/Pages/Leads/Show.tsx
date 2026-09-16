import { Head, Link } from "@inertiajs/react";
import CRMLayout from "@/Layouts/CRMLayout";
import Notes, { type Note } from "@/Components/CRM/Notes";

type Lead = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    notes: Note[];
};

type Props = {
    lead: Lead;
};

export default function Show({ lead }: Props) {
    return (
        <CRMLayout>
            <Head title={lead.name} />

            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{lead.name}</h1>

                        <p className="mt-1 text-gray-500">Lead profile</p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/leads/${lead.id}/edit`}
                            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white"
                        >
                            Edit
                        </Link>

                        <Link
                            href="/leads"
                            className="rounded-xl border border-gray-300 px-4 py-2"
                        >
                            Back
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <dt className="text-sm text-gray-500">Email</dt>

                            <dd className="mt-1 font-medium">
                                {lead.email || "—"}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-sm text-gray-500">Phone</dt>

                            <dd className="mt-1 font-medium">
                                {lead.phone || "—"}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-6">
                    <Notes
                        notes={lead.notes}
                        storeUrl={`/leads/${lead.id}/notes`}
                    />
                </div>
            </div>
        </CRMLayout>
    );
}
