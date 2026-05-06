<x-app-layout>

    {{--
    ╔══════════════════════════════════════════════════════╗
    ║  SLOT HEADER                                         ║
    ║  Breeze lo usa para mostrar el título de la página   ║
    ║  en la barra superior que genera el layout.          ║
    ╚══════════════════════════════════════════════════════╝
    --}}
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Productos') }}
        </h2>
    </x-slot>


    {{-- ── CONTENIDO PRINCIPAL ── --}}
    <div class="py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


            {{-- ── CABECERA: título + botón nuevo ── --}}
            <div class="flex items-center justify-between">

                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                        Catálogo de productos
                    </h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {{ $products->count() }} productos en total
                    </p>
                </div>

                <a href="{{ route('products.create') }}"
                   class="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-rose-600 hover:bg-rose-700 active:bg-rose-800
                          text-white text-sm font-medium
                          transition-colors duration-150 shadow-sm">

                    {{-- Icono + --}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Nuevo producto
                </a>

            </div>


            {{-- ── BUSCADOR ── --}}
            {{--
                NOTA: Este buscador es solo visual por ahora.
                Para hacerlo funcional puedes conectarlo a un
                livewire component o a un <form> GET a tu controlador.
            --}}
            <div class="relative">
                {{-- Icono lupa --}}
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    class="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm
                           bg-white dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700
                           text-slate-900 dark:text-slate-100
                           placeholder-slate-400 dark:placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent
                           transition">
            </div>


            {{-- ── MENSAJES FLASH (éxito / error) ── --}}
            {{--
                Si en tu controlador haces:  return redirect()->route('products.index')->with('success', 'Producto creado');
                Esta alerta aparecerá automáticamente.
            --}}
            @if (session('success'))
                <div class="flex items-center gap-3 px-4 py-3 rounded-lg
                            bg-emerald-50 dark:bg-emerald-900/30
                            border border-emerald-200 dark:border-emerald-700
                            text-emerald-800 dark:text-emerald-300 text-sm">

                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {{ session('success') }}
                </div>
            @endif


            {{-- ── LISTADO DE PRODUCTOS ── --}}
            <div class="bg-white dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        rounded-xl overflow-hidden shadow-sm">

                @forelse ($products as $product)

                    <div class="flex items-center gap-5 px-5 py-4
                                border-b border-slate-100 dark:border-slate-700/60
                                last:border-b-0
                                hover:bg-slate-50 dark:hover:bg-slate-700/40
                                transition-colors duration-100">

                        {{-- IMAGEN --}}
                        <div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden
                                    bg-slate-100 dark:bg-slate-700">
                            <img src="{{ asset('storage/' . $product->image) }}"
                                 alt="{{ $product->name }}"
                                 class="w-full h-full object-cover">
                        </div>

                        {{-- INFO --}}
                        <div class="flex-1 min-w-0">

                            {{-- Nombre + badge categoría --}}
                            <div class="flex items-center gap-2 flex-wrap">
                                <h2 class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                    {{ $product->name }}
                                </h2>

                                @if ($product->category)
                                    <span class="px-2 py-0.5 rounded-full text-xs font-medium
                                                 bg-indigo-100 dark:bg-indigo-900/50
                                                 text-indigo-700 dark:text-indigo-300">
                                        {{ $product->category->name }}
                                    </span>
                                @else
                                    <span class="px-2 py-0.5 rounded-full text-xs font-medium
                                                 bg-slate-100 dark:bg-slate-700
                                                 text-slate-500 dark:text-slate-400">
                                        Sin categoría
                                    </span>
                                @endif
                            </div>

                            {{-- Descripción --}}
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {{ $product->description }}
                            </p>

                            {{-- Precio --}}
                            <p class="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-1.5">
                                {{ number_format($product->price, 2, ',', '.') }} €
                            </p>

                        </div>

                        {{-- ACCIONES --}}
                        <div class="flex items-center gap-2 shrink-0">

                            {{-- Botón Editar --}}
                            <a href="{{ route('products.edit', $product) }}"
                               class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                      font-medium
                                      border border-slate-200 dark:border-slate-600
                                      text-slate-600 dark:text-slate-300
                                      hover:bg-slate-100 dark:hover:bg-slate-700
                                      transition-colors duration-100">

                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 0 1 2.828 2.828L11.828 15.828a4 4 0 0 1-1.414.94l-3 1 1-3a4 4 0 0 1 .586-.536z"/>
                                </svg>
                                Editar
                            </a>

                            {{-- Botón Eliminar --}}
                            <form action="{{ route('products.destroy', $product) }}" method="POST"
                                  onsubmit="return confirm('¿Seguro que quieres eliminar «{{ $product->name }}»?')">
                                @csrf
                                @method('DELETE')

                                <button type="submit"
                                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                                               font-medium
                                               bg-rose-50 dark:bg-rose-900/30
                                               border border-rose-200 dark:border-rose-700
                                               text-rose-600 dark:text-rose-400
                                               hover:bg-rose-100 dark:hover:bg-rose-900/50
                                               transition-colors duration-100">

                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16"/>
                                    </svg>
                                    Eliminar
                                </button>
                            </form>

                        </div>

                    </div>

                @empty

                    {{-- Estado vacío --}}
                    <div class="flex flex-col items-center justify-center py-16 text-center px-6">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                        </svg>
                        <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            No hay productos todavía
                        </p>
                        <p class="text-slate-400 dark:text-slate-500 text-xs mt-1 mb-4">
                            Crea tu primer producto con el botón de arriba
                        </p>
                        <a href="{{ route('products.create') }}"
                           class="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                  bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium
                                  transition-colors duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Nuevo producto
                        </a>
                    </div>

                @endforelse

            </div>


            {{-- ── PAGINACIÓN ── --}}
            {{--
                Esto solo funciona si en tu controlador usas ->paginate() en vez de ->get().
                Ejemplo: $products = Product::with('category')->paginate(15);
                Si usas ->get(), elimina esta sección.
            --}}
            @if ($products instanceof \Illuminate\Pagination\LengthAwarePaginator && $products->hasPages())
                <div class="flex justify-center">
                    {{ $products->links() }}
                </div>
            @endif


        </div>
    </div>

</x-app-layout>
