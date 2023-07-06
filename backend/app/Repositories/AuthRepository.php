<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\Repositories\AuthRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class AuthRepository implements AuthRepositoryInterface
{
    public function getAll(): Collection
    {
        return User::all();
    }

    public function getByEmail(string $email): Builder
    {
        return User::query()->where('email', $email);
    }

    public function store(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return User::query()
            ->create($data);
    }

    public function update(int $room_id, array $data)
    {
        $hotel = User::query()->where('id', $room_id);
        return $hotel->update($data);
    }

    public function delete(int $room_id)
    {
        return User::query()->where('id', $room_id)->delete();
    }
}
