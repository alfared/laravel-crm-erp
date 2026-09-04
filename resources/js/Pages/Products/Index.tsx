import CRMLayout from "@/Layouts/CRMLayout";
import type { Product } from "@/types/product";
import { Link } from "@inertiajs/react";

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    return (
        <CRMLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Products & Services
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Manage your sales catalog
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full">
                        <thead className="border-b border-slate-200 bg-slate-50"></thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                >
                                    <td className="p-4 font-mono text-sm text-slate-500">
                                        {product.sku}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-900">
                                            {product.name}
                                        </div>

                                        {product.description && (
                                            <div className="mt-1 line-clamp-1 text-sm text-slate-400">
                                                {product.description}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 capitalize">
                                        {product.type}
                                    </td>

                                    <td className="p-4 text-right font-medium">
                                        €{product.price}
                                    </td>

                                    <td className="p-4 text-right">
                                        {product.tax_rate}%
                                    </td>
                                    <td>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                product.active
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-100 text-slate-500"
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
            </div>
        </CRMLayout>
    );
}
