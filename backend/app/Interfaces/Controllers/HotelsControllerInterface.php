<?php

namespace App\Interfaces\Controllers;

use App\Services\HotelsService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Hotels\HotelsShowRequest;
use App\Http\Requests\Hotels\HotelsStoreRequest;
use App\Http\Requests\Hotels\HotelsUpdateRequest;
use App\Http\Requests\Hotels\HotelsDestroyRequest;

interface HotelsControllerInterface
{
    public function __construct(HotelsService $roomsService);

    public function index(): JsonResponse;

    public function show(HotelsShowRequest $request): JsonResponse;

    public function store(HotelsStoreRequest $request): JsonResponse;

    public function update(HotelsUpdateRequest $request): JsonResponse;

    public function destroy(HotelsDestroyRequest $request): JsonResponse;
}
