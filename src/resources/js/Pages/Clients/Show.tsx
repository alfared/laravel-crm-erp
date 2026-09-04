import CRMLayout from '@/Layouts/CRMLayout'

interface Client {
    id: number
    name: string
    email?: string
    phone?: string
}

interface Props {
    client: Client
}

export default function Show({ client }: Props) {
    return (
        <CRMLayout>
            <div className="bg-white rounded-3xl shadow-sm p-8">
                <h1 className="text-4xl font-bold">{client.name}</h1>
                <p className="text-slate-500 mt-2">{client.email}</p>
                <p className="text-slate-500">{client.phone}</p>
            </div>
        </CRMLayout>
    )
}