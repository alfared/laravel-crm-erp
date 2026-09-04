<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Lead\Models\Lead;

class Activity extends Model
{
    protected $fillable = [
        'type',
        'description',
        'meta',
        'user_id'
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function lead(): BelongsTo
    {
         return $this->belongsTo(Lead::class);
    }
}
