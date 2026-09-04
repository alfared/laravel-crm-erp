import CRMLayout from '@/Layouts/CRMLayout'
import { router } from '@inertiajs/react'

interface Client {
    id: number
    name: string
    email?: string
    phone?: string
}

interface Props {
    clients: Client[]
}

export default function Index({ clients }: Props) {
    return (
        <CRMLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Clients</h1>
                <p className="text-slate-500">Converted customers</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead
                        className='border-b bg-slate-50'
                    >
                         <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map((client) => (
                            <tr
                                
                            >
                                <td className="p-4">{client.name}</td>
                                <td className="p-4">{client.email}</td>
                                <td className="p-4">{client.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CRMLayout>
    );
}