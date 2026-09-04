<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Lead\Models\Lead;
use App\Models\Task;

class LeadTaskController extends Controller
{
    public function store(
        Request $request,
        Lead $lead
    ) {

        $request->validate([
            'title' => [
                'required',
                'string'
            ]
        ]);

        $task = $lead->tasks()->create([
            'title' => $request->title,
            'due_at' => $request->due_at,
            'user_id' => auth()->id(),
        ]);

        $lead->activities()->create([
            'type' => 'task_created',
            'description' => 
                'Task created: ' .
                $task->title,

        ]);

        return back();
    }

    public function toggle(Task $task)
    {
        $task->update([
            'completed' =>
                ! $task->completed,
        ]);

          $task->lead
            ->activities()
            ->create([
                'type' => 'task_updated',
                'description' =>
                    $task->completed
                        ? 'Task completed'
                        : 'Task reopened',
            ]);

        return back();
    }


}
