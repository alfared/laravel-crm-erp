<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'activityable_type' => Lead::class,
            'activityable_id' => Lead::factory(),
            'user_id' => User::factory(),
            'type' => fake()->randomElement([
                'lead_created',
                'status_changed',
                'note_added',
                'task_created',
            ]),

            'description' => fake()->sentence(),

            'meta' => null,
         ];
    }
}
