<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->search) {
            $query->where('name', 'LIKE', "%{$request->search}%");
        }

        if ($request->sort) {
            $query->orderBy($request->sort, $request->order ?? 'asc');
        }

        $categories = $query->get();
        return CategoryResource::collection($categories);
    }

    // GET /api/categories/{id}
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        /// RECURSOO
        return new CategoryResource($category);
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'mensaje' => 'Categoría creada con éxito',
            'data' => new CategoryResource($category)
        ], 201);
    }

    // PUT /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);

        if (empty($validated)) {
            return response()->json(['error' => 'No hay datos para actualizar'], 400);
        }

        $category->update($validated);

        return new CategoryResource($category);
    }

    // DELETE /api/categories/{id}
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        $category->delete();

        return response()->json(null, 204);
    }

    // EXTRA: GET /api/categories-with-products
    public function withProducts()
    {
        $categories = Category::with('products')->get();
        return CategoryResource::collection($categories);
    }
}
