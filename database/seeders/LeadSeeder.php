<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Domain\Lead\Models\Lead;

class LeadSeeder extends Seeder
{

    public function run(): void
    {
        $lead1 = Lead::create([
            'name' => 'John Doe',
            'email' => 'john@test.com',
            'phone' => '+380991111111',
            'status' => 'new',
        ]);

        $lead1->activities()->create([
            'type' => 'lead_created',
            'description' => 'Lead created',
        ]);

        $lead1->notes()->create([
            'content' => 'Interested in SEO services',
        ]);

        $lead1->activities()->create([
            'type' => 'note_added',
            'description' => 'Added a note',
        ]);

        $lead2 = Lead::create([
            'name' => 'Jane Smith',
            'email' => 'jane@test.com',
            'phone' => '+380992222222',
            'status' => 'contacted'
        ]);

        $lead2->activities()->create([
            'type' => 'lead_created',
            'description' => 'Lead created',
        ]);
    }
}
