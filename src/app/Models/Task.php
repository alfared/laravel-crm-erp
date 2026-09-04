<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Lead\Models\Lead;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'due_at',
        'completed',
        'user_id',
    ];

    protected function casts(): array 
    {
        return [
            'completed' => 'boolean',
            'due_at' => 'datetime',
        ];
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

}
