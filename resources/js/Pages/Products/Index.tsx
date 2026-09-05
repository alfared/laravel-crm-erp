import CRMLayout from "@/Layouts/CRMLayout";
import { Head, Link } from "@inertiajs/react";

type Product = {
    id: number;
    sku: string;
    name: string;
    type: string;
    price: string;
    tax_rate: string;
    active: boolean;
};

type Props = {
    products: Product[];
};

export default function Index({ products }: Props) {
    return (
        <CRMLayout>
            <Head title="Products & Services" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Products & Services
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your sales catalog
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    {products.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <h2 className="text-base font-semibold text-slate-900">
                                No products yet
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Create your first product or service.
                            </p>

                            <Link
                                href="/products/create"
                                className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Add Product
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-[800px] w-full">
                                <thead className="border-b border-slate-200 bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            SKU
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Name
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Type
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Price
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Tax
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {products.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {product.sku}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-medium text-slate-900">
                                                {product.name}
                                            </td>

                                            <td className="px-5 py-4 text-sm capitalize text-slate-600">
                                                {product.type}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {product.price}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {product.tax_rate}%
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        product.active
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-slate-100 text-slate-600"
                                                    }`}
                                                >
                                                    {product.active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </CRMLayout>
    );
}
