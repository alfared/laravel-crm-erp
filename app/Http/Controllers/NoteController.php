<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Lead;
use App\Models\Note;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function storeForLead(Request $request, Lead $lead): RedirectResponse
    {
        return $this->store($request, $lead);
    }

    public function storeForClient(Request $request, Client $client): RedirectResponse
    {
        return $this->store($request, $client);
    }
    
    private function store(Request $request, Model $noteable): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:10000'],
        ]);

        $noteable->notes()->create([
            'user_id' => $request->user()->id,
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function destroy(Note $note): RedirectResponse
    {
        $note->delete();
        return back();
    }
}
