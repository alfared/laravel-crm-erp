<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::query()
                ->latest()
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'types' => collect(ProductType::cases())
                ->map(fn (ProductType $type) => [
                    'value' => $type->value,
                    'label' => ucfirst($type->value),
                ]),
        ]);
    }

    public function store(Request $request)
    {
         $validated = $request->validate([
            'sku' => [
                'required',
                'string',
                'max:100',
                'unique:products,sku',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
                 'type' => [
                'required',
                Rule::enum(ProductType::class),
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'price' => [
                'required',
                'numeric',
                'min:0',
            ],
            'cost' => [
                'nullable',
                'numeric',
                'min:0', 
            ],
            'tax_rate' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],
            'active' => [
                'boolean',
            ],
         ]);

         Product::create($validated);

         return redirect()->route('products.index');
    }
}
