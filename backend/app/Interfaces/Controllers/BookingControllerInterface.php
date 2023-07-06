<?php

namespace App\Interfaces\Controllers;

use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Booking\BookingShowRequest;
use App\Http\Requests\Booking\BookingStoreRequest;
use App\Http\Requests\Booking\BookingUpdateRequest;
use App\Http\Requests\Booking\BookingDestroyRequest;

interface BookingControllerInterface
{
    public function __construct(BookingService $roomsService);

    public function index(): JsonResponse;

    public function show(BookingShowRequest $request): JsonResponse;

    public function store(BookingStoreRequest $request): JsonResponse;

    public function update(BookingUpdateRequest $request): JsonResponse;

    public function destroy(BookingDestroyRequest $request): JsonResponse;
}
