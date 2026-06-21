<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_section_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_section_id')
                ->unique()
                ->constrained('page_sections')
                ->cascadeOnDelete();
            $table->string('subtitle')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_section_settings');
    }
};
