<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Lead\Models\Lead;

class LeadNoteController extends Controller
{
    public function store(Request $request, Lead $lead) 
    {
        $request->validate([
            'content' => ['required', ' string'],
        ]);  

        $lead->notes()->create([
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        $lead->activities()->create([
            'type' => 'note_added',
            'description' => 'Added a note',
            'user_id' => auth()->id(),
            'meta' => [
                'note_id' => $note->id,
            ],
        ]);

         return back();
    }
}
