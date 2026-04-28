<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

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


// ---- CON LOGIN (sea user o admin) ----
Route::middleware('auth:sanctum')->group(function () {

    Route::get('categories-with-products', [CategoryController::class, 'withProducts']);
});


// ---- CON ROL WORKER O ADMIN ----
Route::middleware(['auth:sanctum', 'role:admin,worker'])->group(function () {

    Route::get('categories', [CategoryController::class, 'index']);
});


// ---- SOLO CON ROL ADMIN ----
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

});
