<?php

namespace App\Http\Requests;

use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'nullable',
                'email',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:50',
            ],

            'status' => [
                'required',
                Rule::enum(LeadStatus::class),
            ],

            'source' => [
                'nullable',
                Rule::enum(LeadSource::class),
            ],

            'priority' => [
                'required',
                Rule::enum(LeadPriority::class),
            ],

            'owner_id' => [
                'nullable',
                'integer',
                Rule::exists('users', 'id'),
            ],

            'company_id' => [
                'nullable',
                'integer',
                Rule::exists('companies', 'id'),
            ],
        ];
    }
}
