<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    // Entrantes = 1
        Product::create([
            'name' => 'Takoyakis',
            'description' => 'Crujientes bolas de masa estilo Osaka rellenas de pulpo tierno, cubiertas con salsa teriyaki, mayonesa japonesa y copos de bonito seco.',
            'price' => 5.50,
            'category_id' => 1,
            'image' => 'products/takoyakis.png',
        ]);
        Product::create([
            'name' => 'Rollitos de Primavera',
            'description' => 'Rollitos crujientes rellenos de verduras frescas y carne',
            'price' => 3.00,
            'category_id' => 1,
            'image' => 'products/rollitos-primavera.png',
        ]);
        Product::create([
            'name' => 'Edamame con Sal Marina',
            'description' => 'Vainas de soja al vapor espolvoreadas con sal marina gruesa, un aperitivo saludable y delicioso.',
            'price' => 2.30,
            'category_id' => 1,
            'image' => 'products/edamame.png',
        ]);
        Product::create([
            'name' => 'Ebi Frita',
            'description' => 'Gambas japonesas empanadas en panco y fritas en aceite de sésamo.',
            'price' => 3.50,
            'category_id' => 1,
            'image' => 'products/ebi-frita.png',
        ]);

    // Niguiris = 2
        Product::create([
            'name' => 'Niguiri de Atún',
            'description' => 'Delicada pieza de arroz moldeado a mano cubierta con lámina de atún rojo fresco.',
            'price' => 3.20,
            'category_id' => 2,
            'image' => 'products/niguiri-atun.png',
        ]);
        Product::create([
            'name' => 'Niguiri de Anguila',
            'description' => 'Delicada pieza de arroz moldeado a mano cubierta con lámina de anguila cocinada con salsa teriyaki.',
            'price' => 3.20,
            'category_id' => 2,
            'image' => 'products/niguiri-anguila.png',
        ]);
        Product::create([
            'name' => 'Niguiri de Salmon Flambeado con salsa de Miso',
            'description' => 'Delicada pieza de arroz moldeado a mano cubierta con lámina de salmón flambeado y salsa de miso.',
            'price' => 5.20,
            'category_id' => 2,
            'image' => 'products/niguiri-pescado-salsaClara.png',
        ]);
    // Makis = 3
        Product::create([
            'name' => 'Maki de Salmón',
            'description' => 'Rollo tradicional de arroz sazonado envuelto en alga nori y relleno de salmón fresco de alta calidad.',
            'price' => 6.50,
            'category_id' => 3,
            'image' => 'products/maki-salmon.png',
        ]);

    // Uramakis = 4
        Product::create([
            'name' => 'Sushi California Roll',
            'description' => 'Uramaki relleno de surimi, pepino y aguacate, con arroz en el exterior y semillas de sésamo.',
            'price' => 7.20,
            'category_id' => 4,
            'image' => 'products/california-roll.png',
        ]);
        Product::create([
            'name' => 'Roll Dragon',
            'description' => 'Uramaki relleno de anguila y pepino, cubierto con láminas de aguacate y salsa unagi.',
            'price' => 11.00,
            'category_id' => 4,
            'image' => 'products/roll-dragon.png',
        ]);

    // Sashimis = 6
        Product::create([
            'name' => 'Sashimi de Atún',
            'description' => 'Cortes finos de atún fresco de calidad sashimi, servidos sin arroz para apreciar su sabor puro.',
            'price' => 12.50,
            'category_id' => 6,
            'image' => 'products/sashimi-atun.png',
        ]);
        Product::create([
            'name' => 'Tartar de Salmón',
            'description' => 'Dados de salmón fresco marinados en soja y aceite de sésamo, acompañados de aguacate y semillas tostadas.',
            'price' => 12.90,
            'category_id' => 6,
            'image' => 'products/tartar-salmon.png',
        ]);

    // Al vapor = 7
        Product::create([
            'name' => 'Gyozas de Cerdo',
            'description' => 'Empanadillas japonesas rellenas de carne de cerdo y verduras, doradas a la plancha.',
            'price' => 6.80,
            'category_id' => 7,
            'image' => 'products/gyozas.png',
        ]);
        Product::create([
            'name' => 'Gyozas de Verduras',
            'description' => 'Empanadillas japonesas rellenas de verduras frescas y especias, doradas a la plancha.',
            'price' => 6.00,
            'category_id' => 7,
            'image' => 'products/gyozas-verduras.png',
        ]);
        Product::create([
            'name' => 'Dim Sum de Cerdo',
            'description' => 'Saquitos rellenas de carne de cerdo y verduras hechas al vapor.',
            'price' => 5.40,
            'category_id' => 7,
            'image' => 'products/dim-sum-cerdo.png',
        ]);
        Product::create([
            'name' => 'Dim Sum de Gambas',
            'description' => 'Empanadillas japonesas rellenas de carne de gambas y verduras, hechas al vapor.',
            'price' => 5.80,
            'category_id' => 7,
            'image' => 'products/dim-sum-gambas.png',
        ]);

    // Baos = 8
        Product::create([
            'name' => 'Bao de Cerdo',
            'description' => 'Panecillo al vapor relleno de cerdo asado estilo asiático, lechuga y salsa hoisin.',
            'price' => 4.50,
            'category_id' => 8,
            'image' => 'products/bao-cerdo.png',
        ]);
        Product::create([
            'name' => 'Bao de Pollo',
            'description' => 'Panecillo al vapor relleno de pollo asado estilo asiático, lechuga y salsa hoisin.',
            'price' => 4.50,
            'category_id' => 8,
            'image' => 'products/bao-pollo.png',
        ]);

    // Noodels = 9
        Product::create([
            'name' => 'Yakisoba de Verduras',
            'description' => 'Fideos salteados al wok con verduras frescas y salsa yakisoba ligeramente dulce y especiada.',
            'price' => 9.50,
            'category_id' => 9,
            'image' => 'products/yakisoba-verduras.png',
        ]);
        Product::create([
            'name' => 'Udon con Tempura',
            'description' => 'Fideos udon en caldo suave acompañados de tempura crujiente de verduras de temporada.',
            'price' => 10.90,
            'category_id' => 9,
            'image' => 'products/udon-tempura.png',
        ]);
        Product::create([
            'name' => 'Chow Mein',
            'description' => 'Fideos chinos salteados con pollo y verduras frescas al estilo tradicional.',
            'price' => 8.90,
            'category_id' => 9,
            'image' => 'products/chow-mein.png',
        ]);

    // Principales = 10
        Product::create([
            'name' => 'Katsu Curry',
            'description' => 'Crujiente filete de cerdo empanado servido con curry japonés suave y arroz blanco al vapor.',
            'price' => 11.50,
            'category_id' => 10,
            'image' => 'products/katsu-curry.png',
        ]);
        Product::create([
            'name' => 'Pollo Teriyaki',
            'description' => 'Jugoso pollo a la plancha glaseado con salsa teriyaki casera y acompañado de arroz.',
            'price' => 9.50,
            'category_id' => 10,
            'image' => 'products/pollo-teriyaki.png',
        ]);
        Product::create([
            'name' => 'Tonkatsu',
            'description' => 'Corte de cerdo empanado en panco servido con salsa tonkatsu.',
            'price' => 7.50,
            'category_id' => 10,
            'image' => 'products/tonkatsu.png',
        ]);
        Product::create([
            'name' => 'Pollo Karaage',
            'description' => 'Pollo marinado en soja y jengibre, rebozado y frito hasta quedar crujiente por fuera y jugoso por dentro.',
            'price' => 7.50,
            'category_id' => 10,
            'image' => 'products/karaage.png',
        ]);
        Product::create([
            'name' => 'Hot Pot de Res',
            'description' => 'Olla caliente con finas láminas de ternera, tofu y verduras cocinadas en caldo aromático.',
            'price' => 15.90,
            'category_id' => 10,
            'image' => 'products/hot-pot-res.png',
        ]);
        Product::create([
            'name' => 'Gaifan de Cerdo',
            'description' => 'Salteado de cerdo con salsa de soja servido sobre arroz blanco al vapor.',
            'price' => 8.70,
            'category_id' => 10,
            'image' => 'products/gaifan-cerdo.png',
        ]);
        Product::create([
            'name' => 'Pato Pekin',
            'description' => 'Pato asado al estilo Pekín con piel crujiente, servido con crepes, cebolleta y salsa hoisin.',
            'price' => 10.00,
            'category_id' => 10,
            'image' => 'products/pato-pekin.png',
        ]);
        Product::create([
            'name' => 'Pato a la Naranja',
            'description' => 'Pato asado con salsa agridulce de naranja.',
            'price' => 8.70,
            'category_id' => 10,
            'image' => 'products/pato-naranja.png',
        ]);
        Product::create([
            'name' => 'Pollo al Limón',
            'description' => 'Pollo empanado con salsa de limón.',
            'price' => 5.60,
            'category_id' => 10,
            'image' => 'products/pollo-limon.png',
        ]);
        Product::create([
            'name' => 'Anguila con Arroz',
            'description' => 'Anguila salteada con arroz blanco al vapor y salsa unagi.',
            'price' => 13.50,
            'category_id' => 10,
            'image' => 'products/anguila-arroz.png',
        ]);

    // Sopas = 11
        Product::create([
            'name' => 'Sopa Miso',
            'description' => 'Caldo tradicional japonés elaborado con pasta de miso, tofu, algas wakame y cebollino fresco.',
            'price' => 3.90,
            'category_id' => 11,
            'image' => 'products/sopa-miso.png',
        ]);
        Product::create([
            'name' => 'Ramen Tonkotsu',
            'description' => 'Intenso caldo de huesos de cerdo cocinado durante horas, acompañado de fideos ramen, panceta chashu, huevo marinado y bambú.',
            'price' => 11.90,
            'category_id' => 11,
            'image' => 'products/ramen.png',
        ]);
        Product::create([
            'name' => 'Sopa Wantun',
            'description' => 'Sopa ligera con wantun rellenos de carne y verduras, servida en un caldo claro y aromático.',
            'price' => 13.50,
            'category_id' => 11,
            'image' => 'products/sopa-wantun.png',
        ]);

    // Arroces = 12
        Product::create([
            'name' => 'Arroz Blanco al Vapor',
            'description' => 'Arroz blanco al vapor para acompañar.',
            'price' => 5.50,
            'category_id' => 12,
            'image' => 'products/arroz-blanco-vapor.png',
        ]);
        Product::create([
            'name' => 'Arroz Frito Japonés',
            'description' => 'Arroz salteado al estilo japonés con huevo, zanahoria, cebolleta y un toque de salsa de soja.',
            'price' => 8.50,
            'category_id' => 12,
            'image' => 'products/arroz-frito-japones.png',
        ]);
        Product::create([
            'name' => 'Yakimeshi',
            'description' => 'Arroz frito japonés con pollo, verduras frescas y huevo, salteado al wok.',
            'price' => 9.00,
            'category_id' => 12,
            'image' => 'products/yakimeshi.png',
        ]);
        Product::create([
            'name' => 'Arroz con Curry',
            'description' => 'Arroz frito con pollo especiado, curry, huevo y verduras salteadas.',
            'price' => 9.50,
            'category_id' => 12,
            'image' => 'products/arroz-curry.png',
        ]);

    // Bebidas = 13
        Product::create([
            'name' => 'Agua Mineral',
            'description' => 'Agua mineral natural sin gas.',
            'price' => 0.50,
            'category_id' => 13,
            'image' => 'products/agua-mineral.png',
        ]);
        Product::create([
            'name' => 'Cocacola Zero',
            'description' => 'Refresco de cola sin azúcar.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/cocacola-zero.png',
        ]);
        Product::create([
            'name' => 'Cocacola Normal',
            'description' => 'Refresco de cola.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/cocacola-normal.png',
        ]);
        Product::create([
            'name' => 'Fanta Naranja',
            'description' => 'Refresco de naranja.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/fanta-naranja.png',
        ]);
        Product::create([
            'name' => 'Fanta Limón',
            'description' => 'Refresco de limón.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/fanta-limon.png',
        ]);
        Product::create([
            'name' => 'Acuarius',
            'description' => 'Refresco de sabor limon sin gas.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/acuarius.png',
        ]);
        Product::create([
            'name' => 'Cerveza Sin Alcohol',
            'description' => 'Cerveza sin alcohol.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/cerveza-sin-alcohol.png',
        ]);
        Product::create([
            'name' => 'Cerveza Normal',
            'description' => 'Cerveza normal.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/cerveza-normal.png',
        ]);
        Product::create([
            'name' => 'Cerveza Japosnesa',
            'description' => 'Cerveza tradicional japonesa.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/cerveza-japonesa.png',
        ]);
        Product::create([
            'name' => 'Melon Soda',
            'description' => 'Refresco de melón japones con un sabor dulce y refrescante.',
            'price' => 1.50,
            'category_id' => 13,
            'image' => 'products/melon-soda.png',
        ]);


    // Extras = 14
        Product::create([
            'name' => 'Palillos de Madera',
            'description' => 'Palillos de madera para comer al igual que en Japón',
            'price' => 0.50,
            'category_id' => 14,
            'image' => 'products/palillos-madera.png',
        ]);
        Product::create([
            'name' => 'Salsa de Soja',
            'description' => 'Salsa tradicional japonesa ideal para acompañar tus platos de sushi',
            'price' => 0.50,
            'category_id' => 14,
            'image' => 'products/salsa-soja.png',
        ]);
        Product::create([
            'name' => 'Wasabi',
            'description' => 'Salsa picante  para acompañar sushi',
            'price' => 0.50,
            'category_id' => 14,
            'image' => 'products/wasabi.png',
        ]);
        Product::create([
            'name' => 'Jengibre Encurtido',
            'description' => 'Jengibre fresco encurtido en vinagre y sal, ideal para acompañar sushi.',
            'price' => 0.50,
            'category_id' => 14,
            'image' => 'products/jengibre-encurtido.png',
        ]);
        Product::create([
            'name' => 'Salsa Teriyaki',
            'description' => 'Salsa dulce y salada ideal para acompañar platos de pollo o pescado.',
            'price' => 1.00,
            'category_id' => 14,
            'image' => 'products/salsa-teriyaki.png',
        ]);
        Product::create([
            'name' => 'Salsa Agridulce',
            'description' => 'Salsa agridulce con un equilibrio perfecto entre dulce y ácido, ideal para acompañar platos de cerdo o pollo o unos rollitos de primavera.',
            'price' => 0.50,
            'category_id' => 14,
            'image' => 'products/salsa-agridulce.png',
        ]);


    // Postres = 15
        Product::create([
            'name' => 'Mochi de Mango',
            'description' => 'Dulce japonés de textura suave relleno de cremoso helado de mango.',
            'price' => 4.50,
            'category_id' => 15,
            'image' => 'products/mochi-mango.png',
        ]);
    }
}
