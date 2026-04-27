<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>{{ isset($product) ? 'Editar producto' : 'Nuevo producto' }}</title>

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

<body class="bg-gray-900 text-gray-100 p-6">

    <div class="max-w-5xl mx-auto">

        <!-- HEADER -->
        <div class="flex justify-between items-center mb-6">

            <!-- VOLVER -->
            <a href="{{ route('products.index') }}"
                class="flex items-center gap-2 text-gray-300 hover:text-white">
                ← Volver
            </a>

            <!-- GUARDAR -->
            <button form="productForm"
                class="bg-primary hover:bg-red-700 px-5 py-2 rounded-lg">
                Guardar
            </button>
        </div>

        <!-- FORM -->
        <form id="productForm"
            method="POST"
            action="{{ isset($product) ? route('products.update', $product) : route('products.store') }}"
            enctype="multipart/form-data">

            @csrf
            @if(isset($product))
            @method('PUT')
            @endif

            <div class="grid grid-cols-3 gap-6">

                <!-- IZQUIERDA (IMAGEN) -->
                <div class="col-span-1">

                    <img
                        src="{{ isset($product) ? asset('storage/'.$product->image) : 'https://via.placeholder.com/300' }}"
                        class="w-full h-64 object-cover rounded-lg mb-4">

                    <input type="file" name="image" class="hidden" id="imageInput">

                    <label for="imageInput"
                        class="block text-center bg-gray-800 border border-gray-700 py-2 rounded cursor-pointer hover:bg-gray-700">
                        Cambiar imagen
                    </label>

                </div>

                <!-- DERECHA (FORMULARIO) -->
                <div class="col-span-2 space-y-4">

                    <!-- NOMBRE -->
                    <div>
                        <label class="text-sm text-gray-400">Nombre</label>
                        <input type="text" name="name"
                            value="{{ old('name', $product->name ?? '') }}"
                            class="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded">
                    </div>

                    <!-- DESCRIPCION -->
                    <div>
                        <label class="text-sm text-gray-400">Descripción</label>
                        <textarea name="description"
                            class="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded">{{ old('description', $product->description ?? '') }}</textarea>
                    </div>

                    <!-- PRECIO -->
                    <div>
                        <label class="text-sm text-gray-400">Precio (€)</label>
                        <input type="number" step="0.01" name="price"
                            value="{{ old('price', $product->price ?? '') }}"
                            class="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded">
                    </div>

                    <!-- CATEGORIA -->
                    <!-- <div>
                        <label class="text-sm text-gray-400">Categoría</label>

                        <select name="category_id"
                            class="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded">

                            @foreach($categories as $category)
                            <option value="{{ $category->id }}"
                                {{ (old('category_id', $product->category_id ?? '') == $category->id) ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                            @endforeach

                        </select>
                    </div> -->

                    <!-- INTOLERANCIAS -->
                    <!-- <div>
                        <label class="text-sm text-gray-400">Intolerancias</label>

                        <div class="flex flex-wrap gap-2 mt-2">

                            @php
                            $selected = old('intolerances', $product->intolerances ?? []);
                            @endphp

                            @foreach($intolerances as $intolerance)
                            <label class="cursor-pointer">

                                <input type="checkbox"
                                    name="intolerances[]"
                                    value="{{ $intolerance->id }}"
                                    class="hidden peer"
                                    {{ in_array($intolerance->id, $selected) ? 'checked' : '' }}>

                                <span class="px-3 py-1 rounded-full border border-gray-600
                                    peer-checked:bg-primary peer-checked:border-primary
                                    hover:bg-gray-700 text-sm">
                                    {{ $intolerance->name }}
                                </span>

                            </label>
                            @endforeach

                        </div>
                    </div> -->

                </div>

            </div>

        </form>

    </div>

</body>

</html>
