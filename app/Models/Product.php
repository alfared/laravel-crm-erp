<?php

namespace App\Models;

use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'type',
        'description',
        'price',
        'cost',
        'tax_rate',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'type' => ProductType::class,
            'price' => 'decimal:2',
            'cost' => 'decimal:2',
            'tax_rate' => 'decimal:2',
            'active' => 'boolean',
        ];
    }
}
