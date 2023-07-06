<?php

namespace App\Services;

use App\Dto\HotelsDto;
use App\Interfaces\Services\HotelsServiceInterface;
use App\Repositories\HotelsRepository;
use Illuminate\Database\Eloquent\Collection;

class HotelsService implements HotelsServiceInterface
{
    private HotelsRepository $hotelsRepository;

    public function __construct(HotelsRepository $hotelsRepository)
    {
        $this->hotelsRepository = $hotelsRepository;
    }

    public function get(): Collection
    {
        return $this->hotelsRepository->getAll();
    }

    public function getById(int $id): Collection|array
    {
        return $this->hotelsRepository->getById($id)->get();
    }

    public function store(HotelsDto $data)
    {
        return $this->hotelsRepository->store($data->toArray());
    }

    public function update(array $data)
    {
        return $this->hotelsRepository->update($data);
    }

    public function delete(int $hotel_id): bool
    {
        return $this->hotelsRepository->delete($hotel_id);
    }
}
