<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Este middlewate se encarga de permitir o denegar el acceso a ciertas rutas dependiendo del rol del usuario.
     * Esto esta pensado tanto para rutas de la API como para rutas web, por eso se maneja tanto el caso de peticiones que esperan JSON como el caso de peticiones normales.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        //No autenticado
        if (!$user) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'No autenticado'], 401);
            }
            return redirect()->route('login');
        }

        //No tiene rol permitido
        if (!in_array($user->role, $roles)) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'No autorizado'], 403);
            }
            abort(403, 'No tienes permiso para acceder a esta sección.');
        }

        return $next($request);
    }
}
