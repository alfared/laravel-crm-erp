<?php

namespace App\Http\Controllers;

use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Client;
use App\Models\Company;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', Rule::enum(LeadStatus::class)],
            'source' => ['nullable', Rule::enum(LeadSource::class)],
            'priority' => ['nullable', Rule::enum(LeadPriority::class)],
            'owner_id' => ['nullable', 'integer', Rule::exists('users', 'id')],
            'per_page' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ]);

        $perPage = $filters['per_page'] ?? 10;

        $leads = Lead::query()
            ->active()
            ->with([
                'owner:id,name',
                'company:id,name',
            ])
            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $filters['status'] ?? null,
                function ($query, $status) {
                    $query->where('status', $status);
                }
            )
            ->when(
                $filters['source'] ?? null,
                function ($query, $source) {
                    $query->where('source', $source);
                }
            )
            ->when(
                $filters['priority'] ?? null,
                function ($query, $priority) {
                    $query->where('priority', $priority);
                }
            )
            ->when(
                $filters['owner_id'] ?? null,
                function ($query, $ownerId) {
                    $query->where('owner_id', $ownerId);
                }
            )
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Leads/Index', [
            'leads' => $leads,

            'filters' => [
                'search'  => $filters['search'] ?? null,
                'status'  => $filters['status'] ?? null,
                'source'  => $filters['source'] ?? null,
                'priority' => $filters['priority'] ?? null,
                'owner_id' => $filters['owner_id'] ?? null,
                'per_page' => $perPage,
            ],
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
        ]);
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

    public function archive(Lead $lead)
    {
        if (! $lead->isArchived()) {
            $lead->archive();
        }

        return redirect()
            ->route('leads.index')
            ->with('success', 'Lead archived successfully.');
    }

    public function unarchive(Lead $lead)
    {
        if ($lead->isArchived()) {
            $lead->unarchive();
        }

        return redirect()
            ->route('leads.index')
            ->with('success', 'Lead unarchived successfully.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()
            ->route('leads.index')
            ->with('success', 'Lead moved to trash.');
    }

    public function trash(Request $request)
    {
        $perPage = $request->integer('per_page', 10);

        if (!in_array($perPage, [10, 25, 50, 100], true)) {
            $perPage = 10;
        }

         $leads = Lead::onlyTrashed()
            ->with([
                'owner:id,name',
                'company:id,name',
            ])
            ->latest('deleted_at')
            ->paginate($perPage)
            ->withQueryString();

            return Inertia::render('Leads/Trash', [
                'leads' => $leads,
                'filters' => [
                    'per_page' => $perPage,
                ],
            ]);
    }

    public function restore(int $id)
    {
        $lead = Lead::onlyTrashed()->findOrFail($id);

        $lead->restore();

        return back()->with(
            'success',
            'Lead restored successfully.'
        );
    }

    public function archived(Request $request)
    {
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 25, 50, 100], true)) {
            $perPage = 10;
        }

        $leads = Lead::query()
            ->archived()
            ->with([
                'owner:id,name',
                'company:id,name',
            ])
            ->latest('archived_at')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Leads/Archived', [
            'leads' => $leads,
            'filters' => [
                'per_page' => $perPage,
            ],
        ]);
    }
}