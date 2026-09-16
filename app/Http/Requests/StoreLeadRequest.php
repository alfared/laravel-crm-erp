<?php

namespace App\Http\Requests;

use App\Enums\LeadPriority;
use App\Enums\LeadSource;
use App\Enums\LeadStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string', 
                'max:255'
            ],
            'email' => [
                'required', 
                'string', 
                'email', 
                'max:255'
            ],
            'phone' => [
                'required', 
                'string', 
                'max:255'
            ],
            'status' => [
                'required',  
                Rule::enum(LeadStatus::class)
            ],
            'source' => [
                'required', 
                Rule::enum(LeadSource::class)
                ],
            'priority' => [
                'required', 
                Rule::enum(LeadPriority::class)
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
