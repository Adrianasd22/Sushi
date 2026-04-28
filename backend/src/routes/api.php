<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

Route::get('/prueba', function () {
    return ['mensaje' => 'API funcionando correctamente'];
});

// ---- RUTAS PÚBLICAS ----
// Autenticación básica
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);


Route::get('categories/{id}', [CategoryController::class, 'show']);

//estas rutas deben estar en privada pero lo usare para probar el funcionamiento de la api, luego las pondre en privado
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);


// ---- RUTAS PRIVADAS ----
Route::middleware('auth:sanctum')->group(function () {
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    Route::get('categories', [CategoryController::class, 'index']);

    Route::get('categories-with-products', [CategoryController::class, 'withProducts']);

    //Rutas de pedidos
    Route::get('orders',          [OrderController::class, 'index']);
    Route::get('orders/{id}',     [OrderController::class, 'show']);
    Route::post('orders',         [OrderController::class, 'store']);
    Route::put('orders/{id}',     [OrderController::class, 'update']);
    Route::delete('orders/{id}',  [OrderController::class, 'destroy']);
});
