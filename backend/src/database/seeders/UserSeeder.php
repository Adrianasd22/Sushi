<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Worker',
            'email' => 'worker@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'worker',
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'user',
        ]);

        // Nosotros
        User::create([
            'name' => 'Joaqui',
            'email' => 'joaqui@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Adriana',
            'email' => 'adriana@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Ainhoa',
            'email' => 'ainhoa@miyu.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);
    }
}
