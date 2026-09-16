<?php

use App\Models\Lead;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('lead_notes')
            ->orderBy('id')
            ->chunkById(100, function ($leadNotes): void {
                $rows = [];
                foreach ($leadNotes as $leadNote) {
                    $rows[] = [
                        'noteable_type' => Lead::class,
                        'noteable_id' => $leadNote->lead_id,
                        'user_id' => $leadNote->user_id,
                        'body' => $leadNote->content,
                        'created_at' => $leadNote->created_at,
                        'updated_at' => $leadNote->updated_at,
                    ];
                }
                
                if ($rows !== []){
                    DB::table('notes')->insert($rows);
                }
            }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('notes')
        ->where('notable_type', Lead::class)
        ->delete();
    }
};
