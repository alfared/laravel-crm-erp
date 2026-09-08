<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
        'industry',
        'notes',
    ];

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}
