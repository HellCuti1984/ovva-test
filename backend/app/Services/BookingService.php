<?php

namespace App\Services;

use App\Dto\BookingDto;
use App\Interfaces\Services\BookingServiceInterface;
use App\Repositories\BookingRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingService implements BookingServiceInterface
{
    private BookingRepository $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function get(): Collection
    {
        return $this->bookingRepository->getAll();
    }

    public function getById(int $id): Collection|array
    {
        return $this->bookingRepository->getById($id)->get();
    }

    public function store(BookingDto $data)
    {
        return $this->bookingRepository->store($data->toArray());
    }

    public function update(BookingDto $data)
    {
        return $this->bookingRepository->update($data->toArray());
    }

    public function delete(int $room_id): bool
    {
        return $this->bookingRepository->delete($room_id);
    }

}
