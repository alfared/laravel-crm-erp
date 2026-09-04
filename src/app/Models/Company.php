<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Company;

class Company extends Model
{
    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
