<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">


            {{-- ── BIENVENIDA ── --}}
            <div class="relative overflow-hidden rounded-2xl bg-rose-600 px-8 py-10 shadow-sm">

                {{-- Decoración de fondo --}}
                <div class="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/5"></div>
                <div class="absolute -right-4 bottom-0 w-40 h-40 rounded-full bg-white/5"></div>

                <div class="relative flex items-center justify-between">
                    <div>
                        <p class="text-rose-200 text-sm font-medium mb-1">Panel de administración</p>
                        <h1 class="text-white text-3xl font-bold">
                            Bienvenido, {{ Auth::user()->name }} 👋
                        </h1>
                        <p class="text-rose-100 mt-2 text-sm max-w-md">
                            Desde aquí puedes gestionar los productos, categorías y pedidos de Sushi Miyu.
                        </p>
                    </div>

                    {{-- Logo decorativo --}}
                    <div class="hidden md:block">
                        <svg viewBox="0 0 5906 5906" xmlns="http://www.w3.org/2000/svg"
                             class="h-24 w-24 fill-white opacity-20">
                            <g>
                                <g transform="matrix(0.980372,-0,0,0.980372,-17.949893,-284.4053)">
                                    <path d="M5379.159,5650.949L684.454,5650.949L684.454,956.244L5379.159,956.244L5379.159,5650.949ZM5075.897,1259.506L987.715,1259.506L987.715,5347.687L5075.897,5347.687L5075.897,1259.506Z"/>
                                </g>
                                <g transform="matrix(2.801425,0,0,2.801425,-2244.770516,-2245.040651)">
                                    <path d="M2464.317,1246.258L2464.317,2464.467L1246.108,2464.467L1246.108,1246.258L2464.317,1246.258ZM2080.981,1441.773C2050.262,1496.516 2013.409,1547.987 1969.181,1595.681L2031.985,1681.25C2031.985,1681.25 2065.625,1656.918 2107.639,1599.565C2141.961,1552.712 2174.775,1491.397 2174.775,1491.397L2080.981,1441.773ZM1488.471,1741.244L1487.022,1741.213L1487.022,1847.332L1765.391,1847.332C1725.649,1939.142 1670.016,2021.444 1628.558,2071.384C1595.122,2111.661 1565.825,2138.045 1539.8,2161.716L1608.398,2242.683C1683.109,2179.623 1746.842,2099.314 1802.279,2005.967L1802.279,2369.747L1908.349,2369.747L1908.349,1919.699C1967.753,2016.599 2013.559,2116.737 2048.87,2219.374L2149.289,2184.966C2149.289,2184.966 2102.549,2057.821 2072.333,1994.835C2040.094,1927.631 1988.049,1847.309 1988.049,1847.309L2223.559,1847.309L2223.559,1741.481L1908.35,1741.481L1908.35,1341.027L1802.527,1341.027L1802.527,1741.244L1488.471,1741.244ZM1608.027,1425.737L1540.197,1507.378C1593.04,1550.943 1631.69,1605.322 1659.862,1667.684L1759.598,1631.421C1759.598,1631.421 1731.975,1562.926 1683.355,1502.235C1652.821,1464.119 1608.027,1425.737 1608.027,1425.737Z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>


            {{-- ── TARJETAS DE ESTADÍSTICAS ── --}}
            {{--
                Para que los números sean reales, en tu DashboardController (o en la ruta del dashboard)
                pasa estas variables:
                    $totalProducts  = Product::count();
                    $totalCategories = Category::count();
                return view('dashboard', compact('totalProducts', 'totalCategories'));
            --}}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {{-- Productos --}}
                <div class="bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            rounded-xl p-5 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30
                                flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                        </svg>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Productos</p>
                        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                            {{ $totalProducts ?? '—' }}
                        </p>
                        <a href="{{ route('products.index') }}"
                           class="text-xs text-rose-600 dark:text-rose-400 hover:underline mt-0.5 inline-block">
                            Ver todos →
                        </a>
                    </div>
                </div>

                {{-- Categorías --}}
                <div class="bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            rounded-xl p-5 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30
                                flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A2 2 0 0 1 3 12V7a4 4 0 0 1 4-4z"/>
                        </svg>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Categorías</p>
                        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                            {{ $totalCategories ?? '—' }}
                        </p>
                        <a href="{{ route('categories.index') }}"
                           class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5 inline-block">
                            Ver todas →
                        </a>
                    </div>
                </div>

                {{-- Usuario actual --}}
                <div class="bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            rounded-xl p-5 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30
                                flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"/>
                        </svg>
                    </div>
                    <div class="min-w-0">
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Sesión activa</p>
                        <p class="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                            {{ Auth::user()->name }}
                        </p>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                     bg-emerald-100 dark:bg-emerald-900/50
                                     text-emerald-700 dark:text-emerald-300 mt-0.5">
                            {{ Auth::user()->role ?? 'admin' }}
                        </span>
                    </div>
                </div>

            </div>


            {{-- ── ACCESOS RÁPIDOS ── --}}
            <div>
                <h2 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Accesos rápidos
                </h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {{-- Nuevo producto --}}
                    <a href="{{ route('products.create') }}"
                       class="group flex items-center gap-4 p-5 rounded-xl
                              bg-white dark:bg-slate-800
                              border border-slate-200 dark:border-slate-700
                              hover:border-rose-300 dark:hover:border-rose-700
                              hover:shadow-sm transition-all duration-150">
                        <div class="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/30
                                    flex items-center justify-center shrink-0
                                    group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-900 dark:text-white">
                                Añadir producto
                            </p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Crear un nuevo ítem en el catálogo
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto
                                    group-hover:text-rose-400 transition-colors" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>

                    {{-- Nueva categoría --}}
                    <a href="{{ route('categories.create') }}"
                       class="group flex items-center gap-4 p-5 rounded-xl
                              bg-white dark:bg-slate-800
                              border border-slate-200 dark:border-slate-700
                              hover:border-indigo-300 dark:hover:border-indigo-700
                              hover:shadow-sm transition-all duration-150">
                        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30
                                    flex items-center justify-center shrink-0
                                    group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-slate-900 dark:text-white">
                                Añadir categoría
                            </p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Organizar el catálogo por grupos
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto
                                    group-hover:text-indigo-400 transition-colors" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>

                </div>
            </div>


        </div>
    </div>

</x-app-layout>
