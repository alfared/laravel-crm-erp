<?php

namespace App\Domain\Lead\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Domain\Lead\Models\LeadNote;
use App\Enums\LeadStatus;
use App\Models\Activity;
use App\Models\Task;


class Lead extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
    ];

    protected function casts(): array 
    {
        return [
            'status' => LeadStatus::class,
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');   
    }

    public function notes(): HasMany
    {
        return $this->hasMany(LeadNote::class)->latest();
    }

    public function activities()
    {
        return $this->hasMany(Activity::class)->latest();
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->latest();
    }
}