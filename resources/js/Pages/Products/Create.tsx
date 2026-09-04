import CRMLayout from "@/Layouts/CRMLayout";
import { Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

interface ProductTypeOption {
    value: string;
    label: string;
}

interface Props {
    types: ProductTypeOption[];
}

export default function Create({ types }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sku: "",
        name: "",
        type: "service",
        description: "",
        price: "",
        cost: "",
        tax_rate: "0",
        active: true,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post("/products");
    };

    return (
        <CRMLayout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <Link
                        href="/products"
                        className="text-sm text-slate-500 hover:text-slate-900"
                    >
                        ← Products
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">
                        New Product or Service
                    </h1>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                SKU
                            </label>
                            <input
                                value={data.sku}
                                onChange={(e) => setData("sku", e.target.value)}
                                className="w-full rounded-lg border border-slate-200 p-2"
                                placeholder="SEO-MONTHLY"
                            />
                            {errors.sku && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.sku}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Type
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            >
                                {types.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Name
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="SEO Monthly"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows={4}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            placeholder="Price"
                            className="rounded-xl border border-slate-200 px-4 py-3"
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={data.cost}
                            onChange={(e) => setData("cost", e.target.value)}
                            placeholder="Cost"
                            className="rounded-xl border border-slate-200 px-4 py-3"
                        />
                        <input
                            type="number"
                            step="0.01"
                            value={data.tax_rate}
                            onChange={(e) =>
                                setData("tax_rate", e.target.value)
                            }
                            placeholder="Tax %"
                            className="rounded-xl border border-slate-200 px-4 py-3"
                        />
                    </div>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.active}
                            onChange={(e) =>
                                setData("active", e.target.checked)
                            }
                        />
                        <span>Active</span>
                    </label>
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
                        <Link
                            href="/products"
                            className="rounded-xl px-5 py-3 text-slate-500 hover:bg-slate-100"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </CRMLayout>
    );
}
