<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(
            'Clients/Index', 
            [ 'clients' => Client::latest()->get()]
        );
    }

    public function show(Client $client)
    {
        return Inertia::render(
            'Client/Show',
            ['client' => $client]
        );    
    }
}
