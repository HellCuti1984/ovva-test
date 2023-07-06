<?php

namespace App\Interfaces\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

interface HotelsRepositoryInterface
{
    public function getAll(): Collection;

    public function getById(int $id): Builder;

    public function getByIdWithRooms(int $id): Builder;

    public function store(array $data);

    public function update(array $data);

    public function delete(int $hotel_id);
}
