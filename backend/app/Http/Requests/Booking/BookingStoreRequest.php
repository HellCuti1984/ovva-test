<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class BookingStoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'room_id' => 'required',
            'customer_name' => 'required|string|max:60',
            'customer_email' => 'required|email',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'room_id.required' => 'Не указан ID для просмотра',
            'customer_name.required' => 'Не указано ФИО',
            'customer_name.string' => 'ФИО должно быть строковым типом',
            'customer_name.max:100' => 'ФИО не должно превышать 60 символов',
            'customer_email.required' => 'Не указан Email',
            'customer_email.email' => 'Неправильны Email адрес',
            'start_date' => 'Не указана начальная дата пребывания',
            'end_date' => 'Не указана конечная дата пребывания',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 500));
    }
}
