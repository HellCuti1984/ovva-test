<?php

namespace App\Interfaces\Services;

use App\Dto\BookingDto;
use App\Repositories\BookingRepository;
use Illuminate\Database\Eloquent\Collection;

interface BookingServiceInterface
{
    public function __construct(BookingRepository $bookingRepository);

    public function get(): Collection;

    public function getById(int $id): Collection|array;

    public function store(BookingDto $data);

    public function update(BookingDto $data);

    public function delete(int $room_id): bool;
}
