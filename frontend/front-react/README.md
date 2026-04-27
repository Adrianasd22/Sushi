## TAILWINDCSS:

Primero se instala dentro del proyecto:

```

npm install tailwindcss @tailwindcss/vite

```

 

Crea un vite.config.ts

```

import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  plugins: [

    tailwindcss(),

  ],

})

```

 

Importa en el Css en App:

```

@import "tailwindcss";

```

 

Arranca el proyecto:

```

npm run dev

```

 

## ESTRUCTURA:

src/

 ├─ components/

 │   ├─ layout/

 │   │   ├─ MainLayout.jsx

 │   │   └─ Sidebar.jsx

 │   ├─ sidebar/

 │   │   ├─ SidebarUser.jsx

 │   │   ├─ SidebarMenu.jsx

 │   │   └─ SidebarItem.jsx

 ├─ pages/

 │   └─ Dashboard.jsx

 ├─ App.jsx

 

## ICONOS:

1. Hero Icons: ``https://heroicons.com/``

```

npm install @heroicons/react

---

import { HomeIcon } from "@heroicons/react/24/outline"

<HomeIcon className="w-5 h-5 text-accent" />

```

2. Lucide React: `` https://heroicons.com/`` <--

Este es el que esta ahora mismo

```

npm install lucide-react

---

import { Utensils } from "lucide-react"

<Utensils size={18} className="text-accent" />

```

 

## ROUTING:

La idea es utilizar el routes para navegar entre paginas, de esta forma tambien nos permitira utilizar parametros en las rutas.

 

```

npm install react-router-dom

```

src/

 ├─ app/

 │   ├─ router.tsx

 │   ├─ guards/

 │   │   └─ RequireRole.tsx

 │

 ├─ layouts/

 │   └─ MainLayout.tsx

 │

 ├─ pages/

 │   ├─ usuarios/

 │   │   └─ UsuariosPage.tsx

 │   ├─ productos/

 │   │   ├─ ProductosPage.tsx

 │   │   └─ ProductoDetallePage.tsx

 │   ├─ pedidos/

 │   ├─ reservas/

 │   └─ ventas/

 │

 ├─ components/

 │   └─ sidebar/

 │

 ├─ App.tsx

 ├─ main.tsx