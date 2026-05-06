<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        $categories = Category::all();                    // ← necesario para el <select>
        return view('products.create', compact('categories'));
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
        return redirect()->route('products.index')
                ->with('success', 'Producto creado correctamente.');  // ← mensaje flash
    }


    public function edit(Product $product)
    {
        $categories = Category::all();                    // ← necesario para el <select>
        return view('products.edit', compact('product', 'categories'));
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
        return redirect()->route('products.index')
                ->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')
                ->with('success', 'Producto eliminado.');
    }
}
