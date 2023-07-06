<?php

namespace App\Interfaces\Services;

use App\Dto\RoomsDto;
use App\Repositories\RoomsRepository;
use Illuminate\Database\Eloquent\Collection;

interface RoomsServiceInterface
{
    public function __construct(RoomsRepository $roomsRepository);

    public function get(): Collection;

    public function getFiltered($filter): Collection;

    public function getById(int $id): Collection|array;

    public function store(RoomsDto $data);

    public function update(array $data);

    public function delete(int $room_id): bool;
}
