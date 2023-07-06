<?php

namespace App\Interfaces\Services;

use App\Dto\BookingDto;
use App\Repositories\AuthRepository;
use Illuminate\Database\Eloquent\Collection;

interface AuthServiceInterface
{
    public function __construct(AuthRepository $authRepository);

    public function get(): Collection;

    public function getByEmail(string $email);

    public function store($data);

    public function update(int $room_id, $data);

    public function delete(int $room_id): bool;
}
