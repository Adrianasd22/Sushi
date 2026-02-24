<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Cargar productos
        $products = Product::with('category')->get();

        // Enviar los datos a la vista
        return view('products.index', ['products' => $products]);
    }
}
