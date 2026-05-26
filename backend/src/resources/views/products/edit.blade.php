<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Editar producto') }}
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            {{-- ── CABECERA ── --}}
            <div class="flex items-center gap-3">
                <a href="{{ route('products.index') }}"
                   class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200
                          hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                    </svg>
                </a>
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                        Editar: {{ $product->name }}
                    </h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Modifica los datos del producto
                    </p>
                </div>
            </div>

            {{-- ── FORMULARIO ── --}}
            {{--
                action  → products.update  (PUT /products/{product})
                Laravel no soporta PUT en HTML, por eso usamos @method('PUT')
            --}}
            <form action="{{ route('products.update', $product) }}" method="POST" enctype="multipart/form-data"
                  class="space-y-5">
                @csrf
                @method('PUT')

                {{-- ── CARD PRINCIPAL ── --}}
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
                               value="{{ old('name', $product->name) }}"
                               placeholder="Ej: Salmón Nigiri"
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

                    {{-- Descripción --}}
                    <div class="px-5 py-4">
                        <label for="description"
                               class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Descripción
                        </label>
                        <textarea id="description" name="description" rows="3"
                                  placeholder="Describe el producto brevemente..."
                                  class="w-full px-3 py-2 rounded-lg text-sm resize-none
                                         bg-white dark:bg-slate-900
                                         border border-slate-200 dark:border-slate-600
                                         text-slate-900 dark:text-slate-100
                                         placeholder-slate-400 dark:placeholder-slate-500
                                         focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent
                                         transition">{{ old('description', $product->description) }}</textarea>
                        @error('description')
                            <p class="mt-1.5 text-xs text-rose-500">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Precio + Categoría --}}
                    <div class="px-5 py-4 grid grid-cols-2 gap-4">

                        <div>
                            <label for="price"
                                   class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Precio (€) <span class="text-rose-500">*</span>
                            </label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2
                                             text-slate-400 dark:text-slate-500 text-sm pointer-events-none">€</span>
                                <input type="number" id="price" name="price"
                                       value="{{ old('price', $product->price) }}"
                                       placeholder="0.00" step="0.01" min="0"
                                       class="w-full pl-7 pr-3 py-2 rounded-lg text-sm
                                              bg-white dark:bg-slate-900
                                              border border-slate-200 dark:border-slate-600
                                              text-slate-900 dark:text-slate-100
                                              placeholder-slate-400 dark:placeholder-slate-500
                                              focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent
                                              @error('price') border-rose-500 @enderror
                                              transition">
                            </div>
                            @error('price')
                                <p class="mt-1.5 text-xs text-rose-500">{{ $message }}</p>
                            @enderror
                        </div>

                        <div>
                            <label for="category_id"
                                   class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Categoría
                            </label>
                            <select id="category_id" name="category_id"
                                    class="w-full px-3 py-2 rounded-lg text-sm
                                           bg-white dark:bg-slate-900
                                           border border-slate-200 dark:border-slate-600
                                           text-slate-900 dark:text-slate-100
                                           focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent
                                           transition">
                                <option value="">Sin categoría</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}"
                                            {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                                        {{ $category->name }}
                                    </option>
                                @endforeach
                            </select>
                            @error('category_id')
                                <p class="mt-1.5 text-xs text-rose-500">{{ $message }}</p>
                            @enderror
                        </div>

                    </div>

                    {{-- Imagen (placeholder) --}}
                    <div class="px-5 py-4">
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Imagen
                        </label>

                        <div class="flex items-center gap-4">

                            {{-- Preview de imagen actual --}}
                            <div class="w-24 h-24 shrink-0 rounded-lg overflow-hidden
                                        bg-slate-100 dark:bg-slate-700
                                        border border-slate-200 dark:border-slate-600
                                        flex items-center justify-center">
                                @if ($product->image)
                                    <img src="{{ asset('storage/' . $product->image) }}"
                                         alt="{{ $product->name }}"
                                         class="w-full h-full object-cover">
                                @else
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         class="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
                                    </svg>
                                @endif
                            </div>

                            {{-- Zona de subida (desactivada) --}}
                            <label class="flex-1 flex flex-col items-center justify-center h-24
                                          border-2 border-dashed border-slate-200 dark:border-slate-600
                                          rounded-xl cursor-not-allowed pointer-events-none opacity-60
                                          bg-slate-50 dark:bg-slate-900/50 transition">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="w-6 h-6 text-slate-300 dark:text-slate-600 mb-1" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                <p class="text-xs text-slate-400 dark:text-slate-500">Subida de imagen próximamente</p>
                                <input type="file" name="image" accept="image/*" disabled class="hidden">
                            </label>

                        </div>
                    </div>

                </div>

                {{-- ── BOTONES ── --}}
                <div class="flex justify-end gap-3">
                    <a href="{{ route('products.index') }}"
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
