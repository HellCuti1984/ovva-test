<?php

namespace App\Interfaces\Services;

use App\Dto\HotelsDto;
use App\Repositories\HotelsRepository;
use Illuminate\Database\Eloquent\Collection;

interface HotelsServiceInterface
{
    public function __construct(HotelsRepository $hotelsRepository);

    public function get(): Collection;

    public function getById(int $id): Collection|array;

    public function store(HotelsDto $data);

    public function update(array $data);

    public function delete(int $hotel_id): bool;
}
