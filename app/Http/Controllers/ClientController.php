<?php

namespace App\Http\Controllers;

use App\Enums\ClientStatus;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => [
                'nullable',
                'string',   
                'max:255',
            ],
            
            'status' => [
                'nullable',
                Rule::enum(ClientStatus::class),
            ],

            'company_id' => [
                'nullable',
                'integer',
                Rule::exists('companies', 'id'),
            ],

            'owner_id' => [
                'nullable',
                'integer',
                Rule::exists('users', 'id'),
            ],

            'per_page' => [
                'nullable',
                'integer',
                Rule::in([10, 25, 50, 100]),
            ],
        ]);

        $perPage = $filters['per_page'] ?? 10;

        $clients = Client::query()
            ->with([
                'company:id,name',
                'owner:id,name'
            ])
            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%")
                            ->orWhere('job_title', 'like', "%{$search}%")
                            ->orWhere('department', 'like', "%{$search}%");
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
                $filters['company_id'] ?? null,
                function ($query, $companyId) {
                    $query->where('company_id', $companyId);
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

        return Inertia::render('Clients/Index', [
            'clients' => $clients, 
            'filters' => [
                'search' => $filters['search'] ?? null,
                'status' => $filters['status'] ?? null,
                'company_id' => $filters['company_id'] ?? null,
                'owner_id' => $filters['owner_id'] ?? null,
                'per_page' => $perPage,
            ],
            'statuses' => collect(ClientStatus::cases())
                ->map(fn(ClientStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ])
                ->values(),

            'companies' => Company::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'owners' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response 
    {
        return Inertia::render('Clients/Create', [
            'statuses' => collect(ClientStatus::cases())
                ->map(fn(ClientStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ])
                ->values(),

            'companies' => Company::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'owners' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client,
            'statuses' => collect(ClientStatus::cases())
                ->map(fn(ClientStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ])
                ->values(),

            'companies' => Company::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),

            'owners' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function show(Client $client): Response
    {
        $client->load([
            'company:id,name',
            'owner:id,name',
        ]);

        return Inertia::render(
            'Clients/Show',
            ['client' => $client]
        );    
    }

    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return redirect()
            ->route('clients.show', $client)
            ->with('success', 'Client created successfully.');
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return redirect()
            ->route('clients.show', $client)
            ->with('success', 'Client updated successfully.');
    }
}
