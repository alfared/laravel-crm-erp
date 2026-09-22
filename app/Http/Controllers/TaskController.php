<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Lead;
use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function storeForLead(
        Request $request,
        Lead $lead
    ): RedirectResponse {
        return $this->store($request, $lead);
    }

    public function storeForClient(
        Request $request,
        Client $client
    ): RedirectResponse {
        return $this->store($request, $client);
    }

    public function toggle(Task $task)
    {
        $task->update([
            'completed' =>
                ! $task->completed,
        ]);

        $taskable = $task->taskable;

        abort_if($taskable === null, 409, 'Task parent is missing.');

        $taskable->activities()->create([
            'type' => 'task_updated',
            'description' =>
                $task->completed
                    ? 'Task completed'
                    : 'Task reopened',
        ]);

        return back();
    }

    public function destroy(Task $task): RedirectResponse
    {
        $taskable = $task->taskable;
        $title = $task->title;

        $task->delete();

        $taskable->activities()->create([
            'type' => 'task_deleted',
            'description' => 'Task deleted: ' . $title,
            'user_id' => request()->user()->id,
        ]);
        return back();
    }


    public function store(
        Request $request,
        Model $taskable
    ): RedirectResponse {

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'due_at' => ['nullable', 'date'],
        ]);

        $task = $taskable->tasks()->create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        $taskable->activities()->create([
            'type' => 'task_created',
            'description' => 'Task created: ' . $task->title,
            'user_id' => $request->user()->id,
        ]);

        return back();
    }


}
