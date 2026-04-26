<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request)
    {
        $query = Product::with('category');

        // 🔍 Buscar por nombre
        if ($request->search) {
            $query->where('name', 'LIKE', "%{$request->search}%");
        }

        // 📂 Filtrar por categoría
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // 🔀 Ordenar
        if ($request->sort) {
            $query->orderBy($request->sort, $request->order ?? 'asc');
        }

        // 📦 Ejecutar query
        $products = $query->get();

        return ProductResource::collection($products);
    }

    /**
     * Display the specified resource by id.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        return new ProductResource($product);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|string',
            // 'name' => 'sometimes|required'
        ]);

        // Guardar imagen si tiene
        // if ($request->hasFile('image')) {
        //     $validated['image'] = $request->file('image')
        //         ->store('products', 'public');
        // }

        // Crear producto
        $product = Product::create($validated);

        // Devolvemos el recurso creado y código 201 (Created)
        return response()->json([
            'mensaje' => 'Producto creado con éxito',
            'data' => new ProductResource($product)
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        //Si no hay datos
        if (empty($validated)) {
            return response()->json(['error' => 'No hay datos para actualizar'], 400);
        }

        $product->update($validated);

        return response()->json([
            'mensaje' => 'Producto actualizado correctamente',
            'data' => new ProductResource($product)
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $product->delete();

        return response()->json(['mensaje' => 'Producto eliminado correctamente'], 200);
    }
}
