function UserSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-2 animate-pulse">

      {/* LEFT: avatar + info */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-zinc-800" />

        {/* Texts */}
        <div className="space-y-2">
          <div className="w-32 h-3 bg-zinc-800 rounded" />
          <div className="w-48 h-3 bg-zinc-800 rounded" />
        </div>

      </div>

      {/* RIGHT: role + actions */}
      <div className="flex items-center gap-4">

        {/* role badge */}
        <div className="w-20 h-6 bg-zinc-800 rounded-md" />

        {/* actions */}
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-zinc-800 rounded-md" />
          <div className="w-8 h-8 bg-zinc-800 rounded-md" />
        </div>

      </div>

    </div>
  )
}

export default UserSkeleton