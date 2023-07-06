<?php

namespace App\Interfaces\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

interface AuthRepositoryInterface
{
    public function getAll(): Collection;

    public function getByEmail(string $email): Builder;

    public function store(array $data);

    public function update(int $hotel_id, array $data);

    public function delete(int $hotel_id);
}
