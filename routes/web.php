<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\LeadController;
use App\Http\Controllers\LeadNoteController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\LeadTaskController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    /*
    |--------------------------------------------------------------------------
    | Leads special routes
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | These routes MUST be before Route::resource('leads', ...)
    |
    */

    Route::get('/leads/archived', [LeadController::class, 'archived'])
        ->name('leads.archived');

    Route::get('/leads/trash', [LeadController::class, 'trash'])
        ->name('leads.trash');

    Route::post('/leads/{id}/restore', [LeadController::class, 'restore'])
        ->whereNumber('id')
        ->name('leads.restore');

    Route::post('/leads/{lead}/archive', [LeadController::class, 'archive'])
        ->name('leads.archive');

    Route::post('/leads/{lead}/unarchive', [LeadController::class, 'unarchive'])
        ->name('leads.unarchive');

    Route::post('/leads/{lead}/convert', [LeadController::class, 'convert'])
        ->name('leads.convert');

    Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus'])
        ->name('leads.status.update');

    Route::post('/leads/{lead}/notes', [LeadNoteController::class, 'store'])
        ->name('lead.notes.store');

    Route::post('/leads/{lead}/tasks', [LeadTaskController::class, 'store'])
        ->name('lead.tasks.store');

    Route::patch('/tasks/{task}/toggle', [LeadTaskController::class, 'toggle'])
        ->name('tasks.toggle');


    /*
    |--------------------------------------------------------------------------
    | Standard resources
    |--------------------------------------------------------------------------
    */

    Route::resource('leads', LeadController::class);

    Route::resource('clients', ClientController::class);

    Route::resource('deals', DealController::class);

    Route::resource('products', ProductController::class)
        ->only([
            'index',
            'create',
            'store',
        ]);
});
require __DIR__.'/auth.php';
