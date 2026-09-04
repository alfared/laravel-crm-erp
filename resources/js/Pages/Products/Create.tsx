import CRMLayout from "@/Layouts/CRMLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type ProductType = {
    value: string;
    label: string;
};

type Props = {
    types: ProductType[];
};

export default function Create({ types }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sku: "",
        name: "",
        type: "product",
        description: "",
        price: "",
        cost: "",
        tax_rate: "0",
        active: true,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post("/products");
    };

    return (
        <CRMLayout>
            <Head title="New Product or Service" />

            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/products"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Products & Services
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        New Product or Service
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a product or service to your catalog.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                        {/* SKU / Type */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field label="SKU" error={errors.sku}>
                                <input
                                    value={data.sku}
                                    onChange={(e) =>
                                        setData("sku", e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="SEO-MONTHLY"
                                />
                            </Field>

                            <Field label="Type" error={errors.type}>
                                <select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    className={inputClass}
                                >
                                    {types.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="Name" error={errors.name}>
                            <input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={inputClass}
                                placeholder="SEO Monthly"
                            />
                        </Field>

                        <Field label="Description" error={errors.description}>
                            <textarea
                                rows={5}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className={`${inputClass} resize-y`}
                                placeholder="Describe this product or service..."
                            />
                        </Field>

                        {/* Finance */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <Field label="Price" error={errors.price}>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="0.00"
                                />
                            </Field>

                            <Field label="Cost" error={errors.cost}>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.cost}
                                    onChange={(e) =>
                                        setData("cost", e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="0.00"
                                />
                            </Field>

                            <Field label="Tax rate (%)" error={errors.tax_rate}>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.tax_rate}
                                    onChange={(e) =>
                                        setData("tax_rate", e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                        </div>

                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.active}
                                onChange={(e) =>
                                    setData("active", e.target.checked)
                                }
                                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                            />

                            <span className="text-sm font-medium text-slate-700">
                                Active
                            </span>
                        </label>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <Link
                            href="/products"
                            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </CRMLayout>
    );
}

const inputClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200";

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>

            {children}

            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
}
