<?php

namespace App\Models;

use App\Enums\ClientStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company_id',
        'owner_id',
        'job_title',
        'department',
        'birthday',
        'preferred_language',
        'timezone',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'birthday' => 'date',
            'status' => ClientStatus::class,
        ];
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
