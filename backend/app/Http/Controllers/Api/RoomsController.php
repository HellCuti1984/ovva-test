<?php

namespace App\Http\Controllers\Api;

use App\Dto\RoomsDto;
use App\Services\RoomsService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Rooms\RoomsShowRequest;
use App\Http\Requests\Rooms\RoomsStoreRequest;
use App\Http\Requests\Rooms\RoomsUpdateRequest;
use App\Http\Requests\Rooms\RoomsDestroyRequest;
use App\Interfaces\Controllers\RoomsControllerInterface;
use Illuminate\Http\Request;

class RoomsController extends Controller implements RoomsControllerInterface
{
    private RoomsService $roomsService;

    public function __construct(RoomsService $roomsService)
    {
        $this->roomsService = $roomsService;
    }

    /**
     * @OA\Get(
     *    path="/rooms/get",
     *    operationId="indexRooms",
     *    tags={"Комнаты"},
     *     summary="Список комнат",
     *    description="Список комнат",
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"filter": {"priceMin" : "0", "priceMax": "0", "capacityMin": "0", "capacityMax": "0"}}
     *            )
     *        )
     *    ),
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function index(Request $request): JsonResponse
    {
        $filter = $request->filter;
        $rooms = $this->roomsService->getFiltered($filter);

        return new JsonResponse([
            'code' => 200,
            'data' => $rooms
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/rooms/getById",
     *    operationId="showRoom",
     *    tags={"Комнаты"},
     *     summary="Получить объект комнаты по ID",
     *    description="Получить объект комнаты по ID",
     *    @OA\Parameter(name="room_id", in="query", description="ID комнаты", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function show(RoomsShowRequest $request): JsonResponse
    {
        $room_id = (int)$request->query('room_id');
        $rooms = $this->roomsService->getById($room_id);

        return new JsonResponse([
            'code' => 200,
            'data' => $rooms
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/rooms/getByHotelId",
     *    operationId="showRoomByHotelId",
     *    tags={"Комнаты"},
     *     summary="Получить объект комнаты по ID отеля",
     *    description="Получить объект комнаты по ID отеля",
     *    @OA\Parameter(name="hotel_id", in="query", description="ID комнаты", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function showByHotelId(RoomsShowRequest $request): JsonResponse
    {
        $hotel_id = (int)$request->query('hotel_id');
        $filter = [
            "priceMin" => (int)$request->query('priceMin'),
            "priceMax" => (int)$request->query('priceMax'),
            "capacityMin" => (int)$request->query('capacityMin'),
            "capacityMax" => (int)$request->query('capacityMax')
        ];
        $rooms = $this->roomsService->getByHotelId($hotel_id, $filter);

        return new JsonResponse([
            'code' => 200,
            'data' => $rooms
        ], 200);
    }

    /**
     * @OA\Post(
     *      path="/rooms/store",
     *      operationId="storeRoom",
     *      tags={"Комнаты"},
     *      summary="Создание объекта отеля",
     *      description="Создание объекта отеля",
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function store(RoomsStoreRequest $request): JsonResponse
    {
        $roomsDto = new RoomsDto(
            $request->hotels_id,
            $request->number,
            $request->price,
            $request->capacity,
            $request->description,
        );

        $created_room = $this->roomsService->store($roomsDto);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Комната успешно создана',
            'data' => $created_room
        ], 200);
    }


    /**
     * @OA\Put(
     *      path="/rooms/update",
     *      operationId="updateRoom",
     *      tags={"Комнаты"},
     *      summary="Обновление объекта комнаты",
     *      description="Обновление объекта комнаты",
     *     @OA\Parameter(name="room_id", in="query", description="ID комнаты", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"hotels_id": "1", "number": "1", "capacity": "1", "price":"42.23", "description": "Комната", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function update(RoomsUpdateRequest $request): JsonResponse
    {
        $updated_room = $this->roomsService->update($request->all());

        return new JsonResponse([
            'code' => 200,
            'message' => 'Комната успешно обновлена',
            'data' => $updated_room
        ], 200);
    }

    /**
     * @OA\Delete(
     *    path="/rooms/delete",
     *    operationId="destroyRoom",
     *    tags={"Комнаты"},
     *     summary="Удаление объекта комнаты по ID",
     *    description="Удаление объекта комнаты по ID",
     *    @OA\Parameter(name="room_id", in="query", description="ID комнаты", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success"
     *     )
     *  )
     */
    public function destroy(RoomsDestroyRequest $request): JsonResponse
    {
        $room_id = $request->query('id');

        $deleted_room = $this->roomsService->delete($room_id);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Комната успешно удалена',
            'data' => $deleted_room
        ], 200);
    }
}
