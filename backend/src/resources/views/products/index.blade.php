<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sushi Miyu - Productos</title>

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

    <!-- HEADER -->
    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">

        <!-- LOGO + NOMBRE -->
        <div class="flex items-center gap-3">

            <!-- SVG LOGO (puedes reemplazarlo por el tuyo) -->
            <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
            </svg>

            <span class="text-xl font-bold">Sushi Miyu</span>
        </div>

        <!-- NAV -->
        <nav class="flex gap-6 text-sm text-gray-300">
            <a href="#" class="hover:text-white">Inicio</a>
            <a href="{{ route('products.index') }}" class="text-primary">Productos</a>
            <a href="{{ route('categories.index') }}" class="hover:text-white">Categorías</a>
            <a href="#" class="hover:text-white">Pedidos</a>
            <a href="#" class="hover:text-white">Usuarios</a>
        </nav>

    </header>

    <main class="max-w-6xl mx-auto p-6">

        <!-- TITULO + BOTON -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-3xl font-bold">Productos</h1>

            <a href="{{ route('products.create') }}"
               class="bg-primary hover:bg-red-700 px-4 py-2 rounded-lg text-white flex items-center gap-2">

                <!-- ICONO + -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>

                Nuevo
            </a>
        </div>

        <!-- BUSCADOR -->
        <div class="mb-6">
            <input type="text"
                   placeholder="Buscar producto..."
                   class="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none">
        </div>

        <!-- LISTADO -->
        <div class="divide-y divide-gray-700">

            @foreach($products as $product)
                <div class="flex items-center py-4">

                    <!-- IMAGEN -->
                    <div class="w-24 h-24 shrink-0">
                        <img src="{{ asset('storage/' . $product->image) }}"
                             alt="{{ $product->name }}"
                             class="w-full h-full object-cover rounded-lg">
                    </div>

                    <!-- INFO -->
                    <div class="flex-1 ml-6">
                        <h2 class="text-lg font-semibold">{{ $product->name }}</h2>

                        <p class="text-gray-400 text-sm">
                            {{ $product->description }}
                        </p>

                        <div class="text-sm mt-1 text-gray-300">
                            💰 {{ $product->price }} €
                        </div>

                        <div class="text-xs text-gray-500">
                            {{ $product->category->name ?? 'Sin categoría' }}
                        </div>
                    </div>

                    <!-- ACCIONES -->
                    <div class="flex gap-3">

                        <!-- EDITAR -->
                        <a href="{{ route('products.edit', $product) }}"
                           class="p-2 border hover:bg-zinc-700 rounded">

                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="w-5 h-5 text-white" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M11 5h2M12 7v10m-6 0h12"/>
                            </svg>
                        </a>

                        <!-- ELIMINAR -->
                        <form action="{{ route('products.destroy', $product) }}" method="POST">
                            @csrf
                            @method('DELETE')

                            <button class="p-2 bg-red-600 hover:bg-red-700 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="w-5 h-5 text-white" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M6 7h12M9 7v10m6-10v10M10 11h4"/>
                                </svg>
                            </button>
                        </form>

                    </div>

                </div>
            @endforeach

        </div>

    </main>

</body>
</html>
