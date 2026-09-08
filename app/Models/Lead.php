<?php

namespace App\Models;

use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
     use HasFactory, SoftDeletes;

     protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'source',
        'priority',
        'company_id',
        'owner_id',
        'archived_at',
    ];

    protected function casts(): array 
    {
        return [
            'status' => LeadStatus::class,
            'source' => LeadSource::class,
            'priority' => LeadPriority::class,
            'archived_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');   
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
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

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->whereNotNull('archived_at');
    }

    public function archive(): void
    {
        $this->update([
            'archived_at' => now(),
        ]);
    }

    public function unarchive(): void
    {
        $this->update([
            'archived_at' => null,
        ]);
    }

    public function isArchived(): bool
    {
        return $this->archived_at !== null;
    }
}