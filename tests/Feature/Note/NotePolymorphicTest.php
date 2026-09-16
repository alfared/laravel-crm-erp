<?php

namespace Tests\Feature\Note;

use App\Models\Client;
use App\Models\Lead;
use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotePolymorphicTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_add_note_to_lead(): void
    {
        $user = User::factory()->create();
        $lead = Lead::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('leads.notes.store', $lead), [
                'body' => 'New lead note',
            ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('notes', [
            'noteable_id' => $lead->id,
            'noteable_type' => Lead::class,
            'body' => 'New lead note',
            'user_id' => $user->id,
        ]);
    }

    public function test_authenticated_user_can_add_note_to_client(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('clients.notes.store', $client), [
                'body' => 'New client note',
            ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('notes', [
            'noteable_type' => Client::class,
            'noteable_id' => $client->id,
            'user_id' => $user->id,
            'body' => 'New client note',
        ]);
    }

    public function test_note_body_is_required(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('clients.notes.store', $client), [
                'body' => '',
            ]);

        $response->assertSessionHasErrors('body');

        $this->assertDatabaseCount('notes', 0);
    }


    public function test_client_can_have_polymorphic_notes(): void
    {
        $client = Client::factory()->create();
        $user = User::factory()->create();

        $note = $client->notes()->create([
            'body' => 'Client note',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('notes', [
            'id' => $note->id,
            'noteable_type' => Client::class,
            'noteable_id' => $client->id,
            'body' => 'Client note',
            'user_id' => $user->id,
        ]);

        $this->assertTrue($client->fresh()->notes->contains($note));
    }

    public function test_client_can_have_shared_polymorphic_notes(): void
    {
        $client = Client::factory()->create();
        $user = User::factory()->create();

        $note = $client->notes()->create([
            'body' => 'Client note',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('notes', [
            'id' => $note->id,
            'noteable_type' => Client::class,
            'noteable_id' => $client->id,
            'body' => 'Client note',
            'user_id' => $user->id,
        ]);

        $this->assertTrue($client->fresh()->notes->contains($note));
    }

    public function test_authenticated_user_can_delete_note(): void
    {
        $user = User::factory()->create();
        $lead = Lead::factory()->create();

        $note = $lead->notes()->create([
            'body' => 'Lead note to be deleted',
            'user_id' => $user->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete(route('notes.destroy', $note));

        $response->assertRedirect();

        $this->assertDatabaseMissing('notes', [
            'id' => $note->id,
        ]);
    }
}
