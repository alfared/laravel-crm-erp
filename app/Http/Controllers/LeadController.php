<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Lead\Models\Lead;
use App\Models\Client;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::latest()->get();

        return Inertia::render(
            'Leads/Index',
            [
                'leads' => $leads,
            ]
        );
    }

    public function show(Lead $lead) 
    {
        $lead->load([
            'notes',
            'activities',
            'tasks',
        ]);

        return Inertia::render('Leads/Show', [
            'lead' => $lead,
        ]);
    }

    public function updateStatus(
        Request $request,
        Lead $lead
    ) {
        $request->validate([
            'status' => [
                'required',
                'string',
            ],
        ]);

        $oldStatus = $lead->status;

        $lead->update([
            'status' => $request->status,
        ]);

        $lead->activities()->create([
            'type' => 'status_changed',
            'description' =>
            "Status changed: {$oldStatus->value} → {$request->status}",
            'user_id' => auth()->id(),
        ]);

        return back();
    }

    public function convert(Lead $lead)
    {
        $client = Client::create([
            'name' => $lead->name,
            'email' => $lead->email,
            'phone' => $lead->phone,
            'owner_id' => $lead->owner_id,
        ]);

        $lead->activities()->create([
            'type' => 'converted',
            'description' => 'Lead converted to client',
        ]);

        $lead->delete();

        return redirect()
            ->route('clients.show', $client);
    }

    public function create()
    {
        return Inertia::render('Leads/Create');
    }
}
