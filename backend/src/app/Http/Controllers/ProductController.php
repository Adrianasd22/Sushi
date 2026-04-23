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

// public function index(Request $request)
// {
//     $query = Product::with(['category', 'intolerances']);

//     if ($request->search) {
//         $query->where('name', 'LIKE', "%{$request->search}%");
//     }

//     if ($request->category_id) {
//         $query->where('category_id', $request->category_id);
//     }

//     if ($request->sort) {
//         $query->orderBy($request->sort, $request->order ?? 'asc');
//     }

//     return ProductResource::collection(
//         $query->paginate(10)
//     );
// }
    }

    public function create()
    {
        return view('products.create');
        // return view('products.form', [
        //     'categories' => Category::all(),
        //     'intolerances' => Intolerance::all(),
        // ]);
    }

    public function store(Request $request)
    {
        // Validación: Aseguramos que los datos sean correctos.
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);
        Product::create($validated);
        return redirect()->route('products.index');
    }


    public function edit(Product $product)
    {
        return view('products.edit', ['product' => $product]);
    }

    // Procesa los cambios del formulario de edición
    public function update(Request $request, Product $product)
    {
        // 1. Validamos igual que al crear
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);
        // 2. ACTUALIZAR:
        $product->update($validated);
        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
