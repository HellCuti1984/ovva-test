<?php

namespace App\Repositories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\Repositories\BookingRepositoryInterface;
use Illuminate\Http\Exceptions\HttpResponseException;

class BookingRepository implements BookingRepositoryInterface
{
    public function getAll(): Collection
    {
        return Booking::all();
    }

    public function getById(int $id): Builder
    {
        return Booking::query()->where('id', $id);
    }

    public function store(array $data)
    {
        $existedBooking = Booking::query()
            ->where('rooms_id', $data['rooms_id'])
            ->where('start_date', '>=', $data['start_date'])
            ->orWhere('end_date', '>=', $data['end_date'])
            ->orWhere('end_date', '>=', $data['start_date'])
            ->orWhere('start_date', '>=', $data['end_date'])->first();

        if ($existedBooking) {
            return throw new HttpResponseException(response()->json([
                'error' => 'Номер на данную дату забронирован'
            ], 500));
        }

        return Booking::query()
            ->create($data);
    }

    public function update(array $data)
    {
        $hotel = Booking::query()->where('id', $data['rooms_id']);
        return $hotel->update($data);
    }

    public function delete(int $room_id)
    {
        return Booking::query()->where('id', $room_id)->delete();
    }
}
