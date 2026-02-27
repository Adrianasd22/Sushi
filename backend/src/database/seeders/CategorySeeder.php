<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([ 'name' => 'entrantes']); //1
        Category::create([ 'name' => 'niguiris']); //2
        Category::create([ 'name' => 'makis']); //3
        Category::create([ 'name' => 'uramakis']); //4
        Category::create([ 'name' => 'temakis']); //5
        Category::create([ 'name' => 'sashimi']); //6
        Category::create([ 'name' => 'al vapor']); //7
        Category::create([ 'name' => 'baos']); //8
        Category::create([ 'name' => 'noodles']); //9
        Category::create([ 'name' => 'principales']); //10
        Category::create([ 'name' => 'sopas']); //11
        Category::create([ 'name' => 'arroces']); //12
        Category::create([ 'name' => 'bebidas']); //13
        Category::create([ 'name' => 'extras']); //14
        Category::create([ 'name' => 'postres']); //15
    }

}
