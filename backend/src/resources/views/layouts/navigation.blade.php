<nav x-data="{ open: false }" class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">

                <!-- LOGO SUSHI MIYU -->
                <div class="shrink-0 flex items-center">
                    <a href="{{ route('dashboard') }}" class="flex items-center gap-2.5">

                        {{-- SVG del logo de la empresa --}}
                        <svg viewBox="0 0 5906 5906" xmlns="http://www.w3.org/2000/svg"
                             class="h-8 w-8 text-rose-600 dark:text-rose-500 fill-current">
                            <g>
                                <g transform="matrix(0.980372,-0,0,0.980372,-17.949893,-284.4053)">
                                    <path d="M5379.159,5650.949L684.454,5650.949L684.454,956.244L5379.159,956.244L5379.159,5650.949ZM5075.897,1259.506L987.715,1259.506L987.715,5347.687L5075.897,5347.687L5075.897,1259.506Z"/>
                                </g>
                                <g transform="matrix(2.801425,0,0,2.801425,-2244.770516,-2245.040651)">
                                    <path d="M2464.317,1246.258L2464.317,2464.467L1246.108,2464.467L1246.108,1246.258L2464.317,1246.258ZM2080.981,1441.773C2050.262,1496.516 2013.409,1547.987 1969.181,1595.681L2031.985,1681.25C2031.985,1681.25 2065.625,1656.918 2107.639,1599.565C2141.961,1552.712 2174.775,1491.397 2174.775,1491.397L2080.981,1441.773ZM1488.471,1741.244L1487.022,1741.213L1487.022,1847.332L1765.391,1847.332C1725.649,1939.142 1670.016,2021.444 1628.558,2071.384C1595.122,2111.661 1565.825,2138.045 1539.8,2161.716L1608.398,2242.683C1683.109,2179.623 1746.842,2099.314 1802.279,2005.967L1802.279,2369.747L1908.349,2369.747L1908.349,1919.699C1967.753,2016.599 2013.559,2116.737 2048.87,2219.374L2149.289,2184.966C2149.289,2184.966 2102.549,2057.821 2072.333,1994.835C2040.094,1927.631 1988.049,1847.309 1988.049,1847.309L2223.559,1847.309L2223.559,1741.481L1908.35,1741.481L1908.35,1341.027L1802.527,1341.027L1802.527,1741.244L1488.471,1741.244ZM1608.027,1425.737L1540.197,1507.378C1593.04,1550.943 1631.69,1605.322 1659.862,1667.684L1759.598,1631.421C1759.598,1631.421 1731.975,1562.926 1683.355,1502.235C1652.821,1464.119 1608.027,1425.737 1608.027,1425.737Z"/>
                                </g>
                            </g>
                        </svg>

                        {{-- Nombre de la empresa --}}
                        <span class="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                            Sushi Miyu
                        </span>
                    </a>
                </div>

                <!-- NAV LINKS -->
                <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                        {{ __('Dashboard') }}
                    </x-nav-link>
                    <x-nav-link :href="route('products.index')" :active="request()->routeIs('products.*')">
                        Productos
                    </x-nav-link>
                    <x-nav-link :href="route('categories.index')" :active="request()->routeIs('categories.*')">
                        Categorías
                    </x-nav-link>
                </div>
            </div>

            <!-- DROPDOWN USUARIO -->
            <div class="hidden sm:flex sm:items-center sm:ms-6">
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger">
                        <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                            <div>{{ Auth::user()->name }}</div>
                            <div class="ms-1">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </x-slot>

                    <x-slot name="content">
                        <x-dropdown-link :href="route('profile.edit')">
                            {{ __('Profile') }}
                        </x-dropdown-link>

                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault(); this.closest('form').submit();">
                                {{ __('Log Out') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <!-- HAMBURGUESA (móvil) -->
            <div class="-me-2 flex items-center sm:hidden">
                <button @click="open = ! open" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none transition duration-150 ease-in-out">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': ! open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': ! open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- MENÚ RESPONSIVE -->
    <div :class="{'block': open, 'hidden': ! open}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                {{ __('Dashboard') }}
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('products.index')" :active="request()->routeIs('products.*')">
                Productos
            </x-responsive-nav-link>
            <x-responsive-nav-link :href="route('categories.index')" :active="request()->routeIs('categories.*')">
                Categorías
            </x-responsive-nav-link>
        </div>

        <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div class="px-4">
                <div class="font-medium text-base text-gray-800 dark:text-gray-200">{{ Auth::user()->name }}</div>
                <div class="font-medium text-sm text-gray-500">{{ Auth::user()->email }}</div>
            </div>

            <div class="mt-3 space-y-1">
                <x-responsive-nav-link :href="route('profile.edit')">
                    {{ __('Profile') }}
                </x-responsive-nav-link>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <x-responsive-nav-link :href="route('logout')"
                            onclick="event.preventDefault(); this.closest('form').submit();">
                        {{ __('Log Out') }}
                    </x-responsive-nav-link>
                </form>
            </div>
        </div>
    </div>
</nav>
