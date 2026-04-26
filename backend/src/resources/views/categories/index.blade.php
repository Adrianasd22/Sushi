<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Categorías</title>

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

<body class="bg-gray-900 text-gray-100">

    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">

        <!-- LOGO + NOMBRE -->
        <div class="flex items-center gap-3">

            <!-- SVG LOGO (puedes reemplazarlo por el tuyo) -->
            <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
            </svg>

            <span class="text-xl font-bold">Sushi Miyu</span>
        </div>

        <!-- NAV -->
        <nav class="flex gap-6 text-sm text-gray-300">
            <a href="#" class="hover:text-white">Inicio</a>
            <a href="{{ route('products.index') }}" class="text-primary">Productos</a>
            <a href="#" class="hover:text-white">Categorías</a>
            <a href="#" class="hover:text-white">Pedidos</a>
            <a href="#" class="hover:text-white">Usuarios</a>
        </nav>

    </header>
    <main class="max-w-6xl mx-auto p-6">
        <div class="max-w-4xl mx-auto">

            <!-- HEADER -->
            <div class="flex justify-between items-center mb-6">

                <h1 class="text-3xl font-bold text-white">
                    Categorías
                </h1>

                <a href="#"
                    class="bg-primary hover:bg-red-700 px-4 py-2 rounded-lg">
                    + Nueva categoría
                </a>

            </div>

            <!-- LISTA -->
            <div class="bg-gray-800 border border-gray-700 rounded-lg divide-y divide-gray-700">

                @forelse ($categories as $category)

                <div class="flex justify-between items-center p-4 hover:bg-gray-700 transition">

                    <!-- INFO -->
                    <div>
                        <p class="text-sm text-gray-400">
                            ID: {{ $category->id }}
                        </p>

                        <p class="text-lg font-semibold">
                            {{ $category->name }}
                        </p>
                    </div>

                    <!-- ACCIONES -->
                    <div class="flex gap-3 text-gray-400">

                        <a href="#" class="hover:text-white">✏️</a>
                        <a href="#" class="hover:text-red-500">🗑️</a>

                    </div>

                </div>

                @empty

                <div class="p-4 text-center text-gray-400">
                    No hay categorías disponibles
                </div>

                @endforelse

            </div>

        </div>
    </main>
</body>

</html>
