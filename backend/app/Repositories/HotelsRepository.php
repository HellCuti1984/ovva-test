<?php

namespace App\Repositories;

use App\Models\Hotels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\Repositories\HotelsRepositoryInterface;

class HotelsRepository implements HotelsRepositoryInterface
{
    public function getAll(): Collection
    {
        return Hotels::all();
    }

    public function getById(int $id): Builder
    {
        return Hotels::query()->where('id', $id);
    }

    public function getByIdWithRooms(int $id): Builder
    {
        return Hotels::query()->with('rooms')->where('id', $id);
    }

    public function store(array $data)
    {
        return Hotels::query()
            ->create(array_merge($data, ['users_id' => Auth::id()]));
    }

    public function update(array $data)
    {
        $hotel = Hotels::query()->where('id', $data['id']);
        return $hotel->update($data);
    }

    public function delete(int $hotel_id)
    {
        return Hotels::query()->where('id', $hotel_id)->delete();
    }
}
