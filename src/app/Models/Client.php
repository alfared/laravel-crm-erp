<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Company;

class Client extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'owner_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
