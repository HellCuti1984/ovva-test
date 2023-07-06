<?php

namespace App\Http\Requests\Rooms;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class RoomsUpdateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'id' => 'required|int',
            'hotels_id' => 'required',
            'number' => 'required|int',
            'price' => 'required|int',
            'capacity' => 'required|int',
            'description' => 'required|string|max:250',
        ];
    }

    public function messages(): array
    {
        return [
            'hotels_id.required' => 'Не указан ID отеля',
            'id.required' => 'Не указан ID комнаты',
            'number.required' => 'Не указан номер комнаты',
            'number.int' => 'Поле "Номер комнаты" должно быть числом',
            'capacity.required' => 'Не указана вместимость комнаты',
            'capacity.int' => 'Поле "Вместимость" должно быть числом',
            'price.required' => 'Не указана цена комнаты',
            'price.float' => 'Поле "Цена" должно быть float',
            'description.required' => 'Не указано описание комнаты',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 500));
    }
}
