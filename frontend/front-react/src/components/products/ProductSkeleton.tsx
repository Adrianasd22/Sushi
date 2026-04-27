function ProductSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 animate-pulse">

      {/* Imagen skeleton */}
      <div className="w-16 h-16 rounded-md bg-zinc-800" />

      {/* Texto skeleton */}
      <div className="flex-1 space-y-2">

        <div className="flex justify-between">
          <div className="h-4 w-32 bg-zinc-800 rounded" />
          <div className="h-4 w-12 bg-zinc-800 rounded" />
        </div>

        <div className="h-3 w-3/4 bg-zinc-800 rounded" />

        {/* alérgenos simulados */}
        {/* <div className="flex gap-2 mt-2">
          <div className="w-3 h-3 bg-zinc-800 rounded-full" />
          <div className="w-3 h-3 bg-zinc-800 rounded-full" />
          <div className="w-3 h-3 bg-zinc-800 rounded-full" />
        </div> */}
      </div>

      {/* botones skeleton */}
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-zinc-800 rounded-md" />
        <div className="w-8 h-8 bg-zinc-800 rounded-md" />
        <div className="w-8 h-8 bg-zinc-800 rounded-md" />
      </div>
    </div>
  )
}

export default ProductSkeleton