import CRMLayout from '@/Layouts/CRMLayout'
import { useForm } from '@inertiajs/react'

export default function Create() {
    const { data, setData, post, processing } =
        useForm({
            name: '',
            email: '',
            phone: '',
        })

    const submit = () => {
        post('/leads')
    }

      return (
        <CRMLayout>
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">
                    New Lead
                </h1>

                <div className="bg-white rounded-3xl p-8 shadow-sm space-y-4">
                    <input 
                        value={data.name}
                        onChange={(e) => 
                            setData(
                                'name',
                                e.target.value
                            )
                        }
                        placeholder='Name'
                        className="w-full border rounded-xl p-3"
                    />
                    <input 
                        value={data.email}
                        onChange={(e) =>
                            setData(
                                'email',
                                e.target.value
                            )
                        }
                        placeholder='Email'
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        value={data.phone}
                        onChange={(e) =>
                            setData(
                                'phone',
                                e.target.value
                            )
                        }
                        placeholder='Phone'
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        onClick={submit}
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                    >
                        Save Lead
                    </button>
                </div>
            </div>
        </CRMLayout>
      );
}