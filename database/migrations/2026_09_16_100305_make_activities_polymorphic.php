<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Lead;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
         * Step 1:
         * Add polymorphic columns while legacy lead_id still exists.
         */
        Schema::table('activities', function (Blueprint $table) {
            $table->string('activityable_type')
                ->nullable()
                ->after('id');
            $table->unsignedBigInteger('activityable_id')
                ->nullable()
                ->after('activityable_type');
            $table->index(
                ['activityable_type', 'activityable_id'], 
                'activities_activityable_index'
            );
        });


         /*
         * Step 2:
         * Every existing Activity currently belongs to a Lead.
         */
        DB::table('activities')
            ->whereNotNull('lead_id')
            ->update([
                'activityable_type' => Lead::class,
                'activityable_id' => DB::raw('lead_id'),
            ]);

        /*
         * Step 3:
         * Remove the old FK + column only after backfill.
         */
        Schema::table('activities', function (Blueprint $table) {
            $table->dropForeign(['lead_id']);
            $table->dropColumn('lead_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        /**
         * Rollback can restore lead_id only for Lead activities.
         * 
         * Client activities cannot be represented by the legacy schema.
         */
        Schema::table('activities', function (Blueprint $table) {
            $table->foreignId('lead_id')
                ->nullable()
                ->after('id');
        });

        DB::table('activities')
            ->where('activityable_type', Lead::class)
            ->delete();
        
        Schema::table('activities', function (Blueprint $table) {
            $table->foreign('lead_id')
                ->references('id')
                ->on('leads')
                ->cascadeOnDelete();

            $table->dropIndex('activities_activityable_index');

            $table->dropColumn([
                'activityable_type',
                'activityable_id',
            ]);
        });
    }
};
