<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Lead;
use App\Models\User;

class LeadNote extends Model
{
    use HasFactory;


    protected $fillable = [
        'lead_id',
        'content',
        'user_id',
    ];

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

     public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
