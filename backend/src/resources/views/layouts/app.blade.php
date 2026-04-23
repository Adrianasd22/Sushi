<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Sushi Miyu')</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#dc2626'
                    }
                }
            }
        }
    </script>
</head>

<body class="bg-gray-900 text-gray-100 p-3">

    <!-- HEADER GLOBAL -->
    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">

        <!-- LOGO -->
        <div class="flex items-center gap-3">
            <img src="{{ asset('images/logo.svg') }}" class="w-8 h-8">
            <span class="text-xl font-bold">Sushi Miyu</span>
        </div>

        <!-- NAV -->
        <nav class="flex gap-6 text-sm text-gray-300">
            <a href="#" class="hover:text-white">Inicio</a>
            <a href="{{ route('products.index') }}"
                class="{{ request()->routeIs('products.*') ? 'text-primary' : 'hover:text-white' }}">
                Productos
            </a>
            <a href="#" class="hover:text-white">Categorías</a>
            <a href="#" class="hover:text-white">Pedidos</a>
            <a href="#" class="hover:text-white">Usuarios</a>
        </nav>

    </header>

    <!-- CONTENIDO DINÁMICO -->
    <main class="max-w-6xl mx-auto p-6">
        @yield('content')
    </main>

</body>

</html>
