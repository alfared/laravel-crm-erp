<?php

namespace Tests\Feature\Task;

use App\Models\Client;
use App\Models\Lead;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class TaskPolymorphicTest extends TestCase
{
    use RefreshDatabase;

    public function test_lead_can_have_polymorphic_tasks(): void
    {
        $lead = Lead::factory()->create();
        
        $task = $lead->tasks()->create([
            'title' => 'Follow up with lead',
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'taskable_type' => Lead::class,
            'taskable_id' => $lead->id,
            'title' => 'Follow up with lead',
        ]);

        $this->assertTrue(
             $lead->fresh()->tasks->contains($task)
        );
    }

    public function test_client_can_have_polymorphic_tasks(): void
    {
        $client = Client::factory()->create();

        $task = $client->tasks()->create([
             'title' => 'Prepare client proposal',
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'taskable_type' => Client::class,
            'taskable_id' => $client->id,
            'title' => 'Prepare client proposal',
        ]);

        $this->assertTrue(
             $client->fresh()->tasks->contains($task)
        );
    }

    public function test_task_resolves_its_taskable_model(): void
    {
        $lead = Lead::factory()->create();

        $task = $lead->tasks()->create([
            'title' => 'Call lead',
        ]);

        $task = Task::findOrFail($task->id);

        $this->assertInstanceOf(Lead::class, $task->taskable);

        $this->assertTrue($lead->is($task->taskable));
    }

    public function test_task_casts_completed_and_due_at(): void
    {
        $lead = Lead::factory()->create();

        $task = $lead->tasks()->create([
            'title' => 'Complete follow up',
            'completed' => 1,
            'due_at' => '2026-09-25 12:00:00',
        ]);

        $task->refresh();

        $this->assertTrue($task->completed);
        $this->assertInstanceOf(Carbon::class, $task->due_at);

        $this->assertSame(
            '2026-09-25 12:00:00',
            $task->due_at->format('Y-m-d H:i:s')
        );
    }

    public function test_factory_can_create_task_for_lead(): void
    {
        $lead = Lead::factory()->create();

        $task = Task::factory()
            ->for($lead, 'taskable')
            ->create();

        $this->assertSame(
            Lead::class,
            $task->taskable_type
        );

        $this->assertSame(
            $lead->id,
            $task->taskable_id
        );

        $this->assertTrue(
            $lead->is($task->taskable)
        );
    }

    public function test_factory_can_create_task_for_client(): void
    {
        $client = Client::factory()->create();

        $task = Task::factory()
            ->for($client, 'taskable')
            ->create();

        $this->assertSame(
            Client::class,
            $task->taskable_type
        );

        $this->assertSame(
            $client->id,
            $task->taskable_id
        );

        $this->assertTrue(
            $client->is($task->taskable)
        );
    }
}
