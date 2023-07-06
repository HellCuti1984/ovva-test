<?php

namespace App\Http\Requests\Hotels;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class HotelsStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'description' => 'required|string|max:250',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Не указано поле "Название"',
            'name.string' => 'Поле "Название" должно быть строковым типом',
            'name.max' => 'Поле "Название" не должно быть больше 100 символов',
            'address.required' => 'Не указано поле "Адресс"',
            'address.string' => 'Поле "Адресс" должно быть строковым типом',
            'address.max' => 'Поле "Адресс" не должно быть больше 100 символов',
            'description.required' => 'Не указано поле "Описание"',
            'description.string' => 'Поле "Описание" должно быть строковым типом',
            'description.max' => 'Поле "Описание" не должно быть больше 250 символов',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 500));
    }
}
