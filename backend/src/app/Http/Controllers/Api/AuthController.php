<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // 1. REGISTRO: Solo crea el usuario
    public function register(Request $request)
    {
        // Validamos el name y el email.
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Guardamos el usuario en la base de datos con password hasheada.
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user'
        ]);

        // RESPUESTA: Solo confirmamos que se ha creado. NO entregamos token aquí.
        return response()->json([
            'mensaje' => 'Usuario registrado exitosamente. Por favor inicia sesión.',
            'user' => $user, // Opcional: devolver los datos del usuario creado
            'role' => $user->role
        ], 201);
    }

    // 2. LOGIN: El único encargado de dar Tokens
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Busca en la base de datos si existe el usuario y los datos son correctos.
        if (!Auth::attempt($validated)) {
            return response()->json(['mensaje' => 'Credenciales inválidas'], 401);
        }

        $user = User::where('email', $validated['email'])->firstOrFail();

        // AQUÍ es donde se genera el token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensaje' => 'Hola ' . $user->name,
            'access_token' => $token, // La llave de acceso
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // 3. LOGOUT: (Igual que antes)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['mensaje' => 'Sesión cerrada correctamente']);
    }
}
