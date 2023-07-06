<?php

namespace App\Http\Controllers\Api;

use Mockery\Exception;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistrationRequest;

class AuthController extends Controller
{
    public AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @OA\Post(
     *      path="/login",
     *      operationId="login",
     *      tags={"Авторизация"},
     *      summary="Авторизация в системе",
     *      description="Авторизация в системе",
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"email": "test@mail.ru", "password": "123"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"message": "Авторизация прошла успешно", "token": "abracadabra", "id": 1, "first_name": "", "last_name": "", "second_name": "", "email": "test@mail.ru"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->getByEmail($request->email);

            return new JsonResponse([
                'code' => 200,
                'user' => $user,
                'message' => 'Авторизация прошла успешно',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (Exception $e) {
            return new JsonResponse([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *      path="/registration",
     *      operationId="registration",
     *      tags={"Авторизация"},
     *      summary="Регистрация в системе",
     *      description="Регистрация в системе",
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"id": 1, "first_name": "", "last_name": "", "second_name": "", "email": "test@mail.ru", "password": "123"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"message": "Авторизация прошла успешно", "token": "abracadabra", "id": 1, "first_name": "", "last_name": "", "second_name": "", "email": "test@mail.ru"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function registration(RegistrationRequest $request): JsonResponse
    {
        try {
            $user = $this->authService->store($request->validated());

            return new JsonResponse([
                'code' => 200,
                'user' => $user,
                'message' => 'Регистрация прошла успешно',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
