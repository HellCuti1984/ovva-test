<?php

namespace App\Interfaces\Controllers;

use App\Services\RoomsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Rooms\RoomsShowRequest;
use App\Http\Requests\Rooms\RoomsStoreRequest;
use App\Http\Requests\Rooms\RoomsUpdateRequest;
use App\Http\Requests\Rooms\RoomsDestroyRequest;

interface RoomsControllerInterface
{
    public function __construct(RoomsService $roomsService);

    public function index(Request $request): JsonResponse;

    public function show(RoomsShowRequest $request): JsonResponse;

    public function store(RoomsStoreRequest $request): JsonResponse;

    public function update(RoomsUpdateRequest $request): JsonResponse;

    public function destroy(RoomsDestroyRequest $request): JsonResponse;
}
