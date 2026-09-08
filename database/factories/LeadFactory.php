<?php

namespace Database\Factories;

use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),

            'status' => fake()->randomElement(LeadStatus::cases())->value,
            'source' => fake()->randomElement(LeadSource::cases())->value,
            'priority' => fake()->randomElement(LeadPriority::cases())->value,

            'company_id' => Company::query()
                ->inRandomOrder()
                ->value('id'),

            'owner_id' => User::query()
                ->inRandomOrder()
                ->value('id'),

            'archived_at' => fake()->boolean(10)
                ? fake()->dateTimeBetween('-3 months', 'now')
                : null,
        ];
    }
}
