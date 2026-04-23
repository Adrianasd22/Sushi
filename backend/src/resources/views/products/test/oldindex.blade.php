<!DOCTYPE html>
<html>
<head>
    <title>Productos</title>
</head>
<body>

    <h1>Lista de Productos</h1>

    @foreach($products as $product)
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
            <h2>{{ $product->name }}</h2>
            <p>{{ $product->description }}</p>
            <p><strong>Precio:</strong> €{{ $product->price }}</p>
            <p><strong>Categoría:</strong> {{ $product->category->name ?? 'Sin categoría'}}</p>
            <img src="{{ asset('storage/' . $product->image) }}" width="200" alt="{{$product->name}}">
            <!-- <img src="{{ asset($product->image) }}" width="200" alt="{{$product->name}}"> -->
        </div>
    @endforeach

</body>
</html>
