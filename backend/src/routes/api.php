<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;

Route::get('/prueba', function () {
    return ['mensaje' => 'API funcionando correctamente'];
});

// ---- RUTAS PÚBLICAS ----
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);

//GET CATEGORIAS
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories-with-products', [CategoryController::class, 'withProducts']);


// ---- CON LOGIN (sea user o admin) ----
Route::middleware('auth:sanctum')->group(function () {
    // Aqui van las rutas de post y get order por usuario
    // Ademas de crear reservar y ver sus reservas
    Route::post('logout', [AuthController::class, 'logout']);
});


// ---- CON ROL WORKER O ADMIN ----
Route::middleware(['auth:sanctum', 'role:admin,worker'])->group(function () {
    //Aqui van las rutas de poder ver las reservas y los pedidos
});


// ---- SOLO CON ROL ADMIN ----
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

        Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('categories-with-products', [CategoryController::class, 'withProducts']);

    //Rutas de pedidos
    Route::get('orders',          [OrderController::class, 'index']);
    Route::get('orders/{id}',     [OrderController::class, 'show']);
    Route::post('orders',         [OrderController::class, 'store']);
    Route::put('orders/{id}',     [OrderController::class, 'update']);
    Route::delete('orders/{id}',  [OrderController::class, 'destroy']);
});
