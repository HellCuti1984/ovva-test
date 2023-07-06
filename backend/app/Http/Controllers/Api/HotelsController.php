<?php

namespace App\Http\Controllers\Api;

use App\Dto\HotelsDto;
use App\Services\HotelsService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Hotels\HotelsShowRequest;
use App\Http\Requests\Hotels\HotelsStoreRequest;
use App\Http\Requests\Hotels\HotelsUpdateRequest;
use App\Http\Requests\Hotels\HotelsDestroyRequest;
use App\Interfaces\Controllers\HotelsControllerInterface;

class HotelsController extends Controller implements HotelsControllerInterface
{
    private HotelsService $hotelsService;

    public function __construct(HotelsService $hotelsService)
    {
        $this->hotelsService = $hotelsService;
    }

    /**
     * @OA\Get(
     *    path="/hotels/get",
     *    operationId="indexHotels",
     *    tags={"Отели"},
     *     summary="Список отелей",
     *    description="Получить список всех отелей",
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"id": "1", "name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function index(): JsonResponse
    {
        $hotels = $this->hotelsService->get();

        return new JsonResponse([
            'code' => 200,
            'data' => $hotels
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/hotels/getById",
     *    operationId="showHotels",
     *    tags={"Отели"},
     *     summary="Получить объект отеля по ID",
     *    description="Получить объект отеля по ID",
     *    @OA\Parameter(name="hotel_id", in="query", description="ID отеля", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"id": "1", "name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function show(HotelsShowRequest $request): JsonResponse
    {
        $hotel_id = (int)$request->query('hotel_id');
        $hotels = $this->hotelsService->getById($hotel_id);

        return new JsonResponse([
            'code' => 200,
            'data' => $hotels
        ], 200);
    }

    /**
     * @OA\Post(
     *      path="/hotels/store",
     *      operationId="storeHotels",
     *      tags={"Отели"},
     *      summary="Создание нового объекта отеля",
     *      description="Создание нового объекта отеля",
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function store(HotelsStoreRequest $request): JsonResponse
    {
        $hotelDto = new HotelsDto(
            $request->name,
            $request->address,
            $request->description,
            $request->geo_lat,
            $request->geo_lon,
        );

        $created_hotel = $this->hotelsService->store($hotelDto);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Отель успешно создан',
            'data' => $created_hotel
        ], 200);
    }

    /**
     * @OA\Put(
     *      path="/hotels/update",
     *      operationId="updateHotels",
     *      tags={"Отели"},
     *      summary="Обновление объекта отеля",
     *      description="Обновление объекта отеля",
     *     @OA\Parameter(name="hotel_id", in="query", description="ID отеля", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"name": "Название отеля", "address": "г. Нижний Тагил, ул. Мира 56, д. 2", "description": "Супер-дупер отель", "user_id":"1", "geo_lat": "44.222", "geo_lon": "44.222", "deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function update(HotelsUpdateRequest $request): JsonResponse
    {
        $updated_hotel = $this->hotelsService->update($request->all());

        return new JsonResponse([
            'code' => 200,
            'message' => 'Отель успешно обновлен',
            'data' => $updated_hotel
        ], 200);
    }

    /**
     * @OA\Delete(
     *    path="/hotels/delete",
     *    operationId="destroyHotels",
     *    tags={"Отели"},
     *     summary="Удаление объекта отеля по ID",
     *    description="Удаление объекта отеля по ID",
     *    @OA\Parameter(name="hotel_id", in="query", description="ID отеля", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success"
     *     )
     *  )
     */
    public function destroy(HotelsDestroyRequest $request): JsonResponse
    {
        $hotel_id = $request->query('id');

        $deleted_hotel = $this->hotelsService->delete($hotel_id);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Отель успешно удален',
            'data' => $deleted_hotel
        ], 200);
    }
}
