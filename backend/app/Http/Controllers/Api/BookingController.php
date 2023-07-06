<?php

namespace App\Http\Controllers\Api;

use App\Dto\BookingDto;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\BookingShowRequest;
use App\Http\Requests\Booking\BookingStoreRequest;
use App\Http\Requests\Booking\BookingUpdateRequest;
use App\Http\Requests\Booking\BookingDestroyRequest;
use App\Interfaces\Controllers\BookingControllerInterface;

class BookingController extends Controller implements BookingControllerInterface
{
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }
    /**
     * @OA\Get(
     *    path="/booking/get",
     *    operationId="indexBooking",
     *    tags={"Бронь"},
     *     summary="Получить объекты брони по ID",
     *    description="Получить объекты брони по ID",
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function index(): JsonResponse
    {
        $booking = $this->bookingService->get();

        return new JsonResponse([
            'code' => 200,
            'data' => $booking
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/booking/getById",
     *    operationId="showBooking",
     *    tags={"Бронь"},
     *     summary="Получить объект брони по ID",
     *    description="Получить объект брони по ID",
     *     @OA\Parameter(name="id", in="query", description="ID брони", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *     )
     *  )
     */
    public function show(BookingShowRequest $request): JsonResponse
    {
        $room_id = (int)$request->query('id');
        $booking = $this->bookingService->getById($room_id);

        return new JsonResponse([
            'code' => 200,
            'data' => $booking
        ], 200);
    }

    //TODO: ЧТО ТУТ ЗА ПРОБЛЕМА! :(
//    /**
//     * @OA\Post(
//     *      path="/booking/store",
//     *      operationId="storeBooking",
//     *      tags={"Бронь"},
//     *      summary="Создание объекта брони",
//     *      description="Создание объекта брони",
//     *     @OA\RequestBody(
//     *     required=true,
//     *        @OA\MediaType(
//     *            mediaType="application/json",
//     *            @OA\Schema(
//     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
//     *            )
//     *        )
//     *    ),
//     *      @OA\Response(
//     *          response=200,
//     *          description="Успех",
//     *     @OA\MediaType(
//     *            mediaType="application/json",
//     *            @OA\Schema(
//     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
//     *            )
//     *        )
//     *       )
//     * )
//     */
    public function store(BookingStoreRequest $request): JsonResponse
    {
        $roomsDto = new BookingDto(
            $request->room_id,
            $request->customer_name,
            $request->customer_email,
            $request->start_date,
            $request->end_date
        );

        $created_booking = $this->bookingService->store($roomsDto);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Бронь успешно создана',
            'data' => $created_booking
        ], 200);
    }

    /**
     * @OA\Put(
     *      path="/booking/update",
     *      operationId="updateBooking",
     *      tags={"Бронь"},
     *      summary="Обновление объекта брони",
     *      description="Обновление объекта брони",
     *     @OA\Parameter(name="hotel_id", in="query", description="ID брони", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *     @OA\RequestBody(
     *     required=true,
     *        @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *    ),
     *      @OA\Response(
     *          response=200,
     *          description="Успех",
     *     @OA\MediaType(
     *            mediaType="application/json",
     *            @OA\Schema(
     *                example={"customer_name": "ФИО человека", "email": "test@mail.ru", "room_id": "1", "start_date": "2023-07-12 06:45:23","end_date": "2023-07-12 06:45:23","deleted_at": "2023-07-12 06:45:23", "created_at": "2023-07-12 06:45:23", "updated_at": "2023-07-12 06:45:23"}
     *            )
     *        )
     *       )
     * )
     *
     */
    public function update(BookingUpdateRequest $request): JsonResponse
    {
        $bookingDto = new BookingDto(
            $request->rooms_id,
            $request->customer_name,
            $request->customer_email,
            $request->start_date,
            $request->end_date
        );

        $updated_booking = $this->bookingService->update($bookingDto);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Бронь успешно обновлена',
            'data' => $updated_booking
        ], 200);
    }

    /**
     * @OA\Delete(
     *    path="/booking/delete",
     *    operationId="destroyBooking",
     *    tags={"Бронь"},
     *     summary="Удаление объекта брони по ID",
     *    description="Удаление объекта брони по ID",
     *    @OA\Parameter(name="booking_id", in="query", description="ID брони", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *          response=200, description="Success"
     *     )
     *  )
     */
    public function destroy(BookingDestroyRequest $request): JsonResponse
    {
        $booking_id = $request->query('id');

        $deleted_booking = $this->bookingService->delete($booking_id);

        return new JsonResponse([
            'code' => 200,
            'message' => 'Бронь успешно удалена',
            'data' => $deleted_booking
        ], 200);
    }
}
