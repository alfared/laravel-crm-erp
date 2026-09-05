<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Client;
use App\Models\Company;
use App\Models\Lead;
use App\Models\LeadNote;
use App\Models\Product;
use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@crm.local',
            ],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $usersToCreate = max(0, 70 - User::count());
        if ($usersToCreate > 0) {
               User::factory()
                ->count($usersToCreate)
                ->create();
        }

        Company::factory()
            ->count(70)
            ->create();
        
        Client::factory()
            ->count(70)
            ->create();

        Lead::factory()
            ->count(70)
            ->create();

        LeadNote::factory()
            ->count(70)
            ->create();

        Activity::factory()
            ->count(70)
            ->create();

        Task::factory()
            ->count(70)
            ->create();

        Product::factory()
            ->count(70)
            ->create();
    }
}
