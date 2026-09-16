<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id' => Lead::query()->inRandomOrder()->value('id'),
            
            'user_id' => User::query()
                ->inRandomOrder()
                ->value('id'),
       
            'title' => fake()->randomElement([
                'Call customer',
                'Send proposal',
                'Follow up',
                'Prepare meeting',
                'Send pricing information',
                'Schedule demo',
                'Review requirements',
                'Contact decision maker',
            ]),

            'description' => fake()->optional()->sentence(),

            'due_at' => fake()->dateTimeBetween('-5 days', '+30 days'),

            'completed' => fake()->boolean(30),
        ];
    }
}
