<?php

namespace Tests\Feature\Activity;

use App\Models\Activity;
use App\Models\Client;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityPolymorphicTest extends TestCase
{
    use RefreshDatabase;

    public function test_lead_can_have_polymorphic_activities(): void
    {
        $lead = Lead::factory()->create();

        $activity = $lead->activities()->create([
            'type' => 'lead_created',
            'description' => 'Lead created',
        ]);

        $this->assertDatabaseHas('activities', [
            'id' => $activity->id,
            'activityable_type' => Lead::class,
            'activityable_id' => $lead->id,
            'type' => 'lead_created',
        ]);

        $this->assertTrue(
            $lead->fresh()->activities->contains($activity)
        );
    }

    public function test_client_can_have_polymorphic_activities(): void
    {
        $client = Client::factory()->create();

        $activity = $client->activities()->create([
            'type' => 'client_updated',
            'description' => 'Client updated',
        ]);

        $this->assertDatabaseHas('activities', [
            'id' => $activity->id,
            'activityable_type' => Client::class,
            'activityable_id' => $client->id,
            'type' => 'client_updated',
        ]);

        $this->assertTrue(
            $client->fresh()->activities->contains($activity)
        );
    }

    public function test_activity_can_have_an_author(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create();

        $activity = $client->activities()->create([
            'type' => 'client_updated',
            'description' => 'Client updated',
            'user_id' => $user->id,
        ]);

        $this->assertTrue($user->is($activity->user));
    }


    public function test_activity_resolves_its_activityable_model(): void
    {
        $lead = Lead::factory()->create();

        $activity = $lead->activities()->create([
            'type' => 'lead_created',
            'description' => 'Lead created',
        ]);

        $activity = Activity::findOrFail($activity->id);

        $this->assertInstanceOf(
            Lead::class,
            $activity->activityable
        );

        $this->assertTrue(
            $lead->is($activity->activityable)
        );
    }

    public function test_activity_meta_is_cast_to_array(): void
    {
        $lead = Lead::factory()->create();
        $activity = $lead->activities()->create([
            'type' => 'status_changed',
            'description' => 'Status changed',
            'meta' => [
                'from' => 'new',
                'to' => 'contacted',
            ],
        ]);

        $activity->refresh();

        $this->assertSame([
            'from' => 'new',
            'to' => 'contacted',
        ], $activity->meta);
    }
}
