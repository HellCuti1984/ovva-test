<?php

namespace App\Services;

use App\Dto\LoginDto;
use App\Interfaces\Services\AuthServiceInterface;
use App\Repositories\AuthRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthService implements AuthServiceInterface
{
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function get(): Collection
    {
        return $this->authRepository->getAll();
    }

    public function getByEmail(string $email)
    {
        $user = $this->authRepository->getByEmail($email)->first();

        if (!$user) {
            throw new HttpResponseException(response()->json([
                'code' => 402,
                'errors' => 'Такого пользователя не существует'
            ], 402));
        }

        return $user;
    }

    public function store($data)
    {
        return $this->authRepository->store($data)->first();
    }

    public function update(int $room_id, $data)
    {
        return $this->authRepository->update($room_id, $data);
    }

    public function delete(int $room_id): bool
    {
        return $this->authRepository->delete($room_id);
    }

}
