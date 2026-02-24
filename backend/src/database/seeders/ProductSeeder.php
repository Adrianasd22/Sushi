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
        Product::create([
            'name' => 'Gyozas',
            'description' => 'Empanadillas de carne de cerdo hechas al vapor',
            'price' => 5.30,
            'category_id' => 1
        ]);
        Product::create([
            'name' => 'Ramen',
            'description' => 'Deliciosa sopa asiática con fideos, carne y huevo cocido',
            'price' => 14.50,
            'category_id' => 2
        ]);
    }
}
