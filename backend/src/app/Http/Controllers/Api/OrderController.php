<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;


class OrderController extends Controller
{
    //GET /api/orders
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('products')->get();
        return OrderResource::collection($orders);
    }

    //GET pero por id del pedido
    public function show(Request $request, string $id)
    {
        $order = $request->user()->orders()->with('products')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Orden no encontrada'], 404);
        }

        return new OrderResource($order);
    }


    //POST /api/orders para crear un nuevo pedido
    public function store(Request $request)
    {
        $validated = $request->validate([
            'products'           => 'required|array|min:1',
            'products.*.id'      => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
        ]);

        $total = 0;
        foreach ($validated['products'] as $item) {
            $product = Product::find($item['id']);
            $order->products()->attach($product->id, [
                'quantity'   => $item['quantity'],
                'unit_price' => $product->price,
            ]);
            $total += $product->price * $item['quantity'];
        }

        $order->update(['total' => $total]);

        return response()->json([
            'mensaje' => 'Pedido creado con éxito',
            'data'    => new OrderResource($order->load('products'))
        ], 201);
    }


    //PUT /api/orders/{id} para actualizar un pedido
    public function update(Request $request, string $id)
    {
        $order = $request->user()->orders()->find($id);

        if (!$order) {
            return response()->json(['error' => 'Orden no encontrada'], 404);
        }

        $validated = $request->validate([
            'products'           => 'required|array|min:1',
            'products.*.id'      => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Eliminar productos actuales
        $order->products()->detach();

        // Agregar nuevos productos
        $total = 0;
        foreach ($validated['products'] as $item) {
            $product = Product::find($item['id']);
            $order->products()->attach($product->id, [
                'quantity'   => $item['quantity'],
                'unit_price' => $product->price,
            ]);
            $total += $product->price * $item['quantity'];
        }

        $order->update(['total' => $total]);

        return response()->json([
            'mensaje' => 'Pedido actualizado con éxito',
            'data'    => new OrderResource($order->load('products'))
        ], 201);
    }


    // DELETE /api/orders/{id}
    public function destroy(Request $request, string $id)
    {
        $order = $request->user()->orders()->find($id);
        if (!$order) return response()->json(['error' => 'Pedido no encontrado'], 404);

        $order->delete();
        return response()->json(['mensaje' => 'Pedido cancelado'], 200);
    }
}
