<?php

namespace App\Services;

use App\Dto\RoomsDto;
use App\Interfaces\Services\RoomsServiceInterface;
use App\Repositories\HotelsRepository;
use App\Repositories\RoomsRepository;
use Illuminate\Database\Eloquent\Collection;

class RoomsService implements RoomsServiceInterface
{
    private RoomsRepository $roomsRepository;

    public function __construct(RoomsRepository $roomsRepository)
    {
        $this->roomsRepository = $roomsRepository;
    }

    public function get(): Collection
    {
        return $this->roomsRepository->getAll();
    }

    public function getFiltered($filter): Collection
    {
        return $this->roomsRepository->getFiltered($filter)->get();
    }

    public function getById(int $id): Collection|array
    {
        return $this->roomsRepository->getById($id)->get();
    }

    public function getByHotelId(int $id, $filter): Collection|array
    {
        return $this->roomsRepository->getByHotelId($id, $filter)->get();
    }

    public function store(RoomsDto $data)
    {
        return $this->roomsRepository->store($data->toArray());
    }

    public function update(array $data)
    {
        return $this->roomsRepository->update($data);
    }

    public function delete(int $room_id): bool
    {
        return $this->roomsRepository->delete($room_id);
    }
}
