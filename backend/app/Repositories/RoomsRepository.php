<?php

namespace App\Repositories;

use App\Models\Rooms;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\Repositories\RoomsRepositoryInterface;

class RoomsRepository implements RoomsRepositoryInterface
{
    public function getAll(): Collection
    {
        return Rooms::all();
    }

    public function getFiltered($filter): Builder
    {
        $query = Rooms::query();

        if ($filter) {
            if ((isset($filter['priceMin']) && $filter['priceMin'] != '0') && (isset($filter['priceMax']) && $filter['priceMax'] != '0')) {
                $query->whereBetween('price', [(int)$filter['priceMin'], (int)$filter['priceMax']]);
            } elseif (isset($filter['priceMin'])) {
                $query->where('price', '>=', (int)$filter['priceMin']);
            } elseif (isset($filter['priceMax']) && $filter['priceMax'] != '0') {
                $query->where('price', '<=', (int)$filter['priceMax']);
            }

            if ((isset($filter['capacityMin']) && $filter['capacityMin'] != '0') && (isset($filter['capacityMax']) && $filter['capacityMax'] != '0')) {
                $query->whereBetween('capacity', [(int)$filter['capacityMin'], (int)$filter['capacityMax']]);
            } elseif (isset($filter['capacityMin'])) {
                $query->where('capacity', '>=', (int)$filter['capacityMin']);
            } elseif (isset($filter['capacityMax']) && $filter['capacityMin'] != '0') {
                $query->where('capacity', '<=', (int)$filter['capacityMax']);
            }
        }

        return $query;
    }

    public function getById(int $id): Builder
    {
        return Rooms::query()->where('id', $id);
    }

    public function getByHotelId(int $hotel_id, $filter): Builder
    {
        return $this->getFiltered($filter)->where('hotels_id', $hotel_id);
    }

    public function store(array $data)
    {
        return Rooms::query()
            ->create($data);
    }

    public function update(array $data)
    {
        $room = Rooms::query()->where('id', $data['id'])->update($data);
        $newRoom = Rooms::query()->where('id', $data['id'])->first();
        return $newRoom;
    }

    public function delete(int $room_id)
    {
        return Rooms::query()->where('id', $room_id)->delete();
    }
}
