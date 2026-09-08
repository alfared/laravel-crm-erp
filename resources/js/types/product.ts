export type ProductType = "product" | "service";

export interface Product {
    id: number;
    sku: string;
    name: string;
    type: ProductType;
    description: string | null;
    price: string;
    cost: string | null;
    tax_rate: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}
