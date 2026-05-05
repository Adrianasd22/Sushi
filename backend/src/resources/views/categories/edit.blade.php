<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Editar categoría') }}
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            {{-- ── CABECERA ── --}}
            <div class="flex items-center gap-3">
                <a href="{{ route('categories.index') }}"
                   class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                          hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                    </svg>
                </a>
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                        Editar: {{ $category->name }}
                    </h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Modifica los datos de la categoría
                    </p>
                </div>
            </div>

            {{-- ── FORMULARIO ── --}}
            <form action="{{ route('categories.update', $category) }}" method="POST" class="space-y-5">
                @csrf
                @method('PUT')

                <div class="bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            rounded-xl shadow-sm divide-y divide-slate-100 dark:divide-slate-700">

                    {{-- Nombre --}}
                    <div class="px-5 py-4">
                        <label for="name"
                               class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Nombre <span class="text-rose-500">*</span>
                        </label>
                        <input type="text" id="name" name="name"
                               value="{{ old('name', $category->name) }}"
                               placeholder="Ej: Makis, Nigiris, Bebidas..."
                               class="w-full px-3 py-2 rounded-lg text-sm
                                      bg-white dark:bg-slate-900
                                      border border-slate-200 dark:border-slate-600
                                      text-slate-900 dark:text-slate-100
                                      placeholder-slate-400 dark:placeholder-slate-500
                                      focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent
                                      @error('name') border-rose-500 @enderror
                                      transition">
                        @error('name')
                            <p class="mt-1.5 text-xs text-rose-500">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Info: productos asociados --}}
                    @isset($category->products_count)
                        @if ($category->products_count > 0)
                            <div class="px-5 py-3 flex items-center gap-2
                                        bg-amber-50 dark:bg-amber-900/20">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="w-4 h-4 text-amber-500 shrink-0" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                                </svg>
                                <p class="text-xs text-amber-700 dark:text-amber-300">
                                    Esta categoría tiene <strong>{{ $category->products_count }}
                                    {{ Str::plural('producto', $category->products_count) }}</strong> asociados.
                                    Si la eliminas, eliminaras todos los productos asociados.
                                </p>
                            </div>
                        @endif
                    @endisset

                </div>

                {{-- ── BOTONES ── --}}
                <div class="flex justify-end gap-3">
                    <a href="{{ route('categories.index') }}"
                       class="px-4 py-2 rounded-lg text-sm font-medium
                              border border-slate-200 dark:border-slate-600
                              text-slate-600 dark:text-slate-300
                              hover:bg-slate-100 dark:hover:bg-slate-700
                              transition-colors duration-100">
                        Cancelar
                    </a>

                    <button type="submit"
                            class="px-5 py-2 rounded-lg text-sm font-medium
                                   bg-rose-600 hover:bg-rose-700 active:bg-rose-800
                                   text-white shadow-sm transition-colors duration-100">
                        Guardar cambios
                    </button>
                </div>

            </form>
        </div>
    </div>

</x-app-layout>
