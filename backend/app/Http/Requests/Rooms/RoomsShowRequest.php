<?php

namespace App\Http\Requests\Rooms;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RoomsShowRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'hotel_id' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'hotel_id.required' => 'Не указан ID для просмотра',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 500));
    }
}
