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
        Schema::table('clients', function (Blueprint $table) {
            $table->string('job_title')->nullable();
            
            $table->string('department')->nullable();
            
            $table->date('birthday')->nullable();

            $table->string('preferred_language', 10)->nullable();
            
            $table->string('timezone')->nullable();

            $table->string('status')
                ->default('active')
                ->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropIndex((['status']));

            $table->dropDown([
                'job_title',
                'department',
                'birthday',
                'preferred_language',
                'timezone',
                'status',
            ]);
        });
    }
};
