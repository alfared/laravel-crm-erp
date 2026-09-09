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
       $type = fake()->randomElement([
            'created',
            'status_changed',
            'note_added',
            'email',
            'call',
            'meeting',
            'assignment',
        ]);

        return [
            'lead_id' => Lead::query()->inRandomOrder()->value('id'),
            'user_id' => User::query()->inRandomOrder()->value('id'),
            'type' => $type,
            'description' => match ($type) {
                'created' => 'Lead was created.',
                'status_changed' => 'Lead status was updated.',
                'note_added' => 'A note was added to the lead.',
                'email' => 'Email communication with lead.',
                'call' => 'Phone call with lead.',
                'meeting' => 'Meeting with lead.',
                'assignment' => 'Lead owner was changed.',
            },

            'meta' => [
                'generated' => true,
            ]
        ];
    }
}
