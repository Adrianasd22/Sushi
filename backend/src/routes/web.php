<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/products',[ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}',[ProductController::class, 'index'])->name('products.index');
Route::get('/products/crear', [ProductController::class, 'create'])->name('products.create');
Route::get('/products/{product}/editar', [ProductController::class, 'edit'])->name('products.edit');


Route::post('/products', [ProductController::class, 'store'])->name('products.store');

Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');

Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
