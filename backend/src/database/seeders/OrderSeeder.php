<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // ── Helpers ──────────────────────────────────────────────────────────
        // Busca un producto por nombre y devuelve su id (o null si no existe)
        $pid = fn(string $name): ?int => Product::where('name', $name)->value('id');

        // Crea un pedido y adjunta sus líneas a la tabla pivote
        $makeOrder = function (array $data, array $lines) {
            // Calcular total a partir de las líneas
            $total = collect($lines)->sum(fn($l) => $l['quantity'] * $l['unit_price']);

            $order = Order::create([
                'user_id' => $data['user_id'],
                'mode'    => $data['mode'],
                'phone'   => $data['phone'],
                'address' => $data['address'] ?? null,
                'notes'   => $data['notes']   ?? null,
                'total'   => round($total, 2),
            ]);

            // Adjuntar productos con quantity y unit_price en la tabla pivote
            foreach ($lines as $line) {
                if ($line['product_id']) {
                    $order->products()->attach($line['product_id'], [
                        'quantity'   => $line['quantity'],
                        'unit_price' => $line['unit_price'],
                    ]);
                }
            }

            return $order;
        };


        // ── Pedido 1 — Usuario 5, recogida en local ───────────────────────────
        $makeOrder(
            [
                'user_id' => 5,
                'mode'    => 'pickup',
                'phone'   => '611 222 333',
                'notes'   => 'Sin wasabi por favor',
            ],
            [
                ['product_id' => $pid('Takoyakis'),       'quantity' => 1, 'unit_price' => 5.50],
                ['product_id' => $pid('Maki de Salmón'),  'quantity' => 2, 'unit_price' => 6.50],
                ['product_id' => $pid('Sopa Miso'),       'quantity' => 2, 'unit_price' => 3.90],
                ['product_id' => $pid('Melon Soda'),      'quantity' => 2, 'unit_price' => 1.50],
            ]
        );


        // ── Pedido 2 — Usuario 6, delivery ───────────────────────────────────
        $makeOrder(
            [
                'user_id' => 6,
                'mode'    => 'delivery',
                'phone'   => '622 333 444',
                'address' => 'Calle Mayor 12, 2ºB, Pizarra',
                'notes'   => 'Llamar al llegar, no usar el portero automático',
            ],
            [
                ['product_id' => $pid('Ramen Tonkotsu'),   'quantity' => 1, 'unit_price' => 11.90],
                ['product_id' => $pid('Gyozas de Cerdo'),  'quantity' => 1, 'unit_price' =>  6.80],
                ['product_id' => $pid('Edamame con Sal Marina'), 'quantity' => 1, 'unit_price' => 2.30],
                ['product_id' => $pid('Cerveza Japonesa'), 'quantity' => 2, 'unit_price' =>  1.50],
                ['product_id' => $pid('Salsa de Soja'),   'quantity' => 1, 'unit_price' =>  0.50],
            ]
        );


        // ── Pedido 3 — Usuario 7, recogida en local ───────────────────────────
        $makeOrder(
            [
                'user_id' => 4,
                'mode'    => 'pickup',
                'phone'   => '633 444 555',
            ],
            [
                ['product_id' => $pid('Sushi California Roll'),   'quantity' => 2, 'unit_price' =>  7.20],
                ['product_id' => $pid('Niguiri de Atún'),         'quantity' => 4, 'unit_price' =>  3.20],
                ['product_id' => $pid('Niguiri de Anguila'),      'quantity' => 2, 'unit_price' =>  3.20],
                ['product_id' => $pid('Tartar de Salmón'),        'quantity' => 1, 'unit_price' => 12.90],
                ['product_id' => $pid('Agua Mineral'),            'quantity' => 2, 'unit_price' =>  0.50],
                ['product_id' => $pid('Jengibre Encurtido'),      'quantity' => 1, 'unit_price' =>  0.50],
                ['product_id' => $pid('Wasabi'),                  'quantity' => 1, 'unit_price' =>  0.50],
            ]
        );


        // ── Pedido 4 — Usuario 5, delivery ────────────────────────────────────
        $makeOrder(
            [
                'user_id' => 5,
                'mode'    => 'delivery',
                'phone'   => '611 222 333',
                'address' => 'Avenida de Andalucía 45, 1ºA, Málaga',
                'notes'   => 'Dejar en la puerta si no hay nadie',
            ],
            [
                ['product_id' => $pid('Katsu Curry'),          'quantity' => 1, 'unit_price' => 11.50],
                ['product_id' => $pid('Arroz Blanco al Vapor'), 'quantity' => 1, 'unit_price' =>  5.50],
                ['product_id' => $pid('Bao de Cerdo'),         'quantity' => 2, 'unit_price' =>  4.50],
                ['product_id' => $pid('Ebi Frita'),            'quantity' => 1, 'unit_price' =>  3.50],
                ['product_id' => $pid('Cocacola Zero'),        'quantity' => 2, 'unit_price' =>  1.50],
            ]
        );


        // ── Pedido 5 — Usuario 6, recogida en local ───────────────────────────
        $makeOrder(
            [
                'user_id' => 6,
                'mode'    => 'pickup',
                'phone'   => '622 333 444',
                'notes'   => 'Alergia al gluten en uno de los comensales, confirmar ingredientes',
            ],
            [
                ['product_id' => $pid('Roll Dragon'),            'quantity' => 1, 'unit_price' => 11.00],
                ['product_id' => $pid('Sashimi de Atún'),        'quantity' => 1, 'unit_price' => 12.50],
                ['product_id' => $pid('Dim Sum de Gambas'),      'quantity' => 1, 'unit_price' =>  5.80],
                ['product_id' => $pid('Mochi de Mango'),         'quantity' => 3, 'unit_price' =>  4.50],
                ['product_id' => $pid('Agua Mineral'),           'quantity' => 3, 'unit_price' =>  0.50],
                ['product_id' => $pid('Palillos de Madera'),     'quantity' => 3, 'unit_price' =>  0.50],
            ]
        );
    }
}
