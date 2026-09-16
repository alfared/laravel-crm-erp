<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->string('source')
                ->nullable()
                ->index();  

            $table->foreignId('owner_id')
                ->nullable()
                     ->constrained('users')
                ->nullOnDelete();

            $table->string('priority')
                ->default('medium')
                ->index();

            $table->timestamp('archived_at')
                ->nullable()
                ->index();   

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
          $table->dropForeign(['owner_id']);

          $table->dropIndex(['source']);
          $table->dropIndex(['priority']);
          $table->dropIndex(['archived_at']);

          $table->dropColumn([
                'source',
                'owner_id',
                'priority',
                'archived_at',
          ]);

          $table->dropSoftDeletes();
        });
    }
};
