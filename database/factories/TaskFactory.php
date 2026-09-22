<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    
    public function definition(): array
    {
        return [
            'taskable_type' => Lead::class,
            'taskable_id' => Lead::factory(),
            'user_id' => User::factory(),
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
