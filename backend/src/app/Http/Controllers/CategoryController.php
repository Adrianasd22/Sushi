<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        // Cargar categorías con sus productos
        // $categories = Category::with('products')->get();
        $categories = Category::all();

        // Enviar los datos a la vista
        return view('categories.index', ['categories' => $categories]);
    }
}
