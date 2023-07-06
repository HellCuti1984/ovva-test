<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegistrationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:40',
            'last_name' => 'required|string|max:40',
            'second_name' => 'required|string|max:40',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Заполните поле "Имя"',
            'first_name.string' => 'Неправильный тип. "Имя". Должно быть - строковый',
            'first_name.max:40' => 'Поле "Имя" максимум 40 символов',
            'last_name.required' => 'Заполните поле "Фамилия"',
            'last_name.string' => 'Неправильный тип. "Фамилия". Должно быть - строковый',
            'last_name.max:40' => 'Поле "Отчество" максимум 40 символов',
            'second_name.required' => 'Заполните поле "Отчество"',
            'second_name.string' => 'Неправильный тип. "Отчество". Должно быть - строковый',
            'second_name.max:40' => 'Поле "Отчество" максимум 40 символов',
            'email.email' => 'Некорректный email',
            'email.unique' => 'Пользователь с таким Email уже существует',
            'password.required' => 'Заполните поле "Пароль"',
            'password' => 'Некорректный пароль',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'code' => 401,
            'errors' => $validator->errors()
        ], 401));
    }
}
