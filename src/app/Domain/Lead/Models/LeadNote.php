<?php

namespace  App\Domain\Lead\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Domain\Lead\Models\Lead;

class LeadNote extends Model
{
    protected $fillable = [
        'content',
        'user_id',
    ];

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }
}
