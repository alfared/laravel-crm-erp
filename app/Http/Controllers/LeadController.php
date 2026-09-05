<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use App\Models\Company;
use App\Models\User;
use App\Models\Lead;
use App\Models\Client;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;

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
        return Inertia::render('Leads/Create',[
            'statuses' => collect(LeadStatus::cases())
                ->map(fn (LeadStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ]),
            'sources' => collect(LeadSource::cases())
                ->map(fn (LeadSource $source) => [
                    'value' => $source->value,
                    'label' => $source->label(),
                ]),
            'priorities' => collect(LeadPriority::cases())
                ->map(fn (LeadPriority $priority) => [
                    'value' => $priority->value,
                    'label' => $priority->label(),
                ]),
            'owners' => User::query()
                ->select('id', 'name')
                ->get(),
            'companies' => Company::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(StoreLeadRequest $request)
    {
        $lead = Lead::create($request->validated());

        return redirect()
            ->route('leads.show', $lead)
            ->with('success', 'Lead created successfully.');
    }

    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update($request->validated());

        return redirect()
            ->route('leads.show', $lead)
            ->with('success', 'Lead updated successfully.');
    }

    public function edit(Lead $lead): Response
    {
        return Inertia::render('Leads/Edit', [
            'lead' => $lead->load([
                'owner:id,name',
                'company:id,name',
            ]),

            'statuses' => collect(LeadStatus::cases())
                ->map(fn (LeadStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ]),

            'sources' => collect(LeadSource::cases())
                ->map(fn (LeadSource $source) => [
                    'value' => $source->value,
                    'label' => $source->label(),
                ]),

            'priorities' => collect(LeadPriority::cases())
                ->map(fn (LeadPriority $priority) => [
                    'value' => $priority->value,
                    'label' => $priority->label(),
                ]),

            'owners' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'companies' => Company::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }
}