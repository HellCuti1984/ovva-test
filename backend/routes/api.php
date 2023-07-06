<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoomsController;
use App\Http\Controllers\Api\HotelsController;
use App\Http\Controllers\Api\BookingController;

/*
|--------------------------------------------------------------------------
| API Main
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('guest')->group(function () {
    /*AUTH*/
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/registration', [AuthController::class, 'registration'])->name('registration');

    /*HOTELS*/
    Route::get('/hotels/get', [HotelsController::class, 'index'])->name('getHotels');
    Route::get('/hotels/getById', [HotelsController::class, 'show'])->name('getHotelsById');

    /*ROOMS*/
    Route::get('/rooms/get', [RoomsController::class, 'index'])->name('getRooms');
    Route::get('/rooms/getById', [RoomsController::class, 'show'])->name('getRoomById');
    Route::get('/rooms/getByHotelId', [RoomsController::class, 'showByHotelId'])->name('getRoomsByHotelId');

    /*BOOKING*/
    Route::get('/booking/get', [BookingController::class, 'index'])->name('getBooking');
    Route::get('/booking/getById', [BookingController::class, 'show'])->name('getBookingById');
    Route::post('/booking/store', [BookingController::class, 'store'])->name('storeBooking');
    Route::put('/booking/update', [BookingController::class, 'update'])->name('updateBooking');
});

Route::middleware('auth:sanctum')->group(function () {
    /*HOTELS*/
    Route::post('/hotels/store', [HotelsController::class, 'store'])->name('storeHotel');
    Route::put('/hotels/update', [HotelsController::class, 'update'])->name('updateHotel');
    Route::delete('/hotels/delete', [HotelsController::class, 'destroy'])->name('destroyHotel');

    /*ROOMS*/
    Route::post('/rooms/store', [RoomsController::class, 'store'])->name('storeRooms');
    Route::put('/rooms/update', [RoomsController::class, 'update'])->name('updateRoom');
    Route::delete('/rooms/delete', [RoomsController::class, 'destroy'])->name('destroyRoom');

    /*BOOKING*/
    Route::delete('/booking/delete', [BookingController::class, 'destroy'])->name('destroyBooking');
});
