<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //A diferencia del AuthController, este sera para el CRUD de usuarios
    // Listar usuarios
    public function index()
    {
        return UserResource::collection(User::all());
    }

    // Ver usuario por id
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        return new UserResource($user);
    }

    //Crear un usuario, con la diferencia de registrarse que aqui podras especificar el rol
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role' => 'required|in:admin,worker,user',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json([
            'mensaje' => 'Usuario creado con exito',
            'data' => new UserResource($user)
        ], 201);
    }

    // Cambiar rol
    public function updateRole(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        //En src/routes/auth.php, hay algo de roles pero son distintos (auth, guest)
        $request->validate([
            'role' => 'required|in:admin,worker,user',
        ]);

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'mensaje' => 'Rol actualizado',
            'data' => new UserResource($user)
        ]);
    }

    // Eliminar usuario
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'No encontrado'], 404);
        }

        $user->delete();

        return response()->json(['mensaje' => 'Usuario eliminado']);
    }


    //Funcion para el registro de usuarios
    public function register(Request $request)
    {

        //Validacion de los parametros
        $request->validate([
            'name' => 'required|string|max:255',        //String. No mas de 255 caracteres
            'email' => 'required|email|unique:users',   //Email. Unico en la tabla users
            'password' => 'required|min:8',             //String. Minimo 8 caracteres
        ]);

        //Mensajes de error comunes. No pongo más porque el validate ya se encarga de eso, pero por si acaso
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'El email ya esta registrado'], 400);
        }
        if (strlen($request->password) < 8) {
            return response()->json(['error' => 'La contraseña debe tener al menos 8 caracteres'], 400);
        }

        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        

        return response()->json([
            'mensaje' => 'Usuario registrado con exito',
            'data' => new UserResource($user)
        ], 201);
    }
}
