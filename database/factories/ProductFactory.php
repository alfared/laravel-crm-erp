<?php

namespace Database\Factories;

use App\Enums\ProductType;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 10, 50000);

        return [
            'sku' => strtoupper(fake()->unique()->bothify('SKU-####-??')),

            'name' => fake()->randomElement([
                'Website Development',
                'CRM Implementation',
                'ERP Implementation',
                'SEO Monthly Package',
                'Technical Consulting',
                'UI/UX Design',
                'Cloud Migration',
                'API Integration',
                'Support Package',
                'Security Audit',
                'Mobile Application Development',
                'Business Analysis',
                'Project Management',
                'Hosting Package',
                'Maintenance Package',
            ]).' '.fake()->unique()->numberBetween(100, 99999),

            'type' => fake()->randomElement(ProductType::cases())->value,
            'description' => fake()->sentence(),
            'price' => $price,
            'cost' => round(
                $price * fake()->randomFloat(2, 0.30, 0.75),
                2
            ),
            'tax_rate' => fake()->randomElement([
                0,
                12,
                21,
            ]),

            'active' => fake()->boolean(90),
        ];
    }
}
