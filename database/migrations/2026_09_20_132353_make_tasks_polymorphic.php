<?php

use App\Models\Lead;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add polymorphic columns to the tasks table
        Schema::table('tasks', function (Blueprint $table) {
            $table->string('taskable_type')
                  ->nullable()
                  ->after('lead_id');
            $table->unsignedBigInteger('taskable_id')
                  ->nullable()
                  ->after('taskable_type');
            $table->index(['taskable_type', 'taskable_id'], 'tasks_taskable_index');
        });

        // 2. Migrate existing lead tasks to polymorphic relation
        DB::table('tasks')->whereNotNull('lead_id')->update([
              'taskable_type' => Lead::class,
              'taskable_id' => DB::raw('lead_id'),
        ]);

        // 3. Remove legacy Lead relation.
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['lead_id']);
            $table->dropColumn('lead_id');
        });
    }

    public function down(): void
    {
        // Restore legacy lead_id column.
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('lead_id')
                ->nullable()
                ->after('id');
        });

        DB::table('tasks')->where('taskable_type', Lead::class)->update([
            'lead_id' => DB::raw('taskable_id'),
        ]);
        
        DB::table('tasks')
            ->where('taskable_type', '!=', Lead::class)
            ->delete();

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign('lead_id')
                ->references('id')
                ->on('leads')
                ->cascadeOnDelete();

            $table->dropIndex('tasks_taskable_index');

             $table->dropColumn([
                'taskable_type',
                'taskable_id',
            ]);
        });
    }
};
