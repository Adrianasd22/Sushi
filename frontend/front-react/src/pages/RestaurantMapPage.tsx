export default function RestaurantMapPage() {
  return (
    <div className="space-y-4 max-w-3xl">

      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Mapa del restaurante
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Distribución de mesas · Sushi Miyu
        </p>
      </div>

      {/* Leyenda */}
      <div className="flex gap-6 flex-wrap">
        {[
          { shape: "rounded",  label: "Mesa cuadrada" },
          { shape: "circle",   label: "Mesa redonda"  },
          { shape: "area",     label: "Barra / cocina" },
        ].map(({ shape, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-zinc-500">
            {shape === "circle"
              ? <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 shrink-0" />
              : shape === "area"
                ? <div className="w-3 h-3 rounded-sm bg-zinc-700 shrink-0" />
                : <div className="w-3 h-3 rounded-sm bg-zinc-800 border border-zinc-600 shrink-0" />
            }
            {label}
          </div>
        ))}
      </div>

      {/* Plano */}
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <svg
          viewBox="0 0 640 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          role="img"
          aria-label="Plano del restaurante Sushi Miyu"
        >
          <title>Plano del restaurante Sushi Miyu</title>

          {/* ── Estilos internos ── */}
          <defs>
            <style>{`
              .wall  { fill: none; stroke: #52525b; stroke-width: 2; stroke-linejoin: round; }
              .area  { fill: #3f3f46; }
              .table { fill: #27272a; stroke: #52525b; stroke-width: 1; }
              .chair { fill: #18181b; stroke: #3f3f46; stroke-width: 0.8; }
              .num   { font-size: 11px; font-weight: 500; fill: #e4e4e7; text-anchor: middle; dominant-baseline: central; font-family: ui-sans-serif, system-ui, sans-serif; }
              .lbl   { font-size: 10px; fill: #71717a; text-anchor: middle; dominant-baseline: central; font-family: ui-sans-serif, system-ui, sans-serif; }
              .arc   { fill: none; stroke: #3f3f46; stroke-width: 1; stroke-dasharray: 3 2; }
            `}</style>
          </defs>

          {/* ── Paredes exteriores ── */}
          <rect x="20" y="20" width="600" height="460" rx="4" className="wall" />

          {/* ── Barra / cocina (norte, ancho completo) ── */}
          <rect x="20" y="20" width="540" height="72" className="area" />
          <rect x="30" y="27" width="520" height="58" rx="2" fill="#52525b" opacity="0.4" />
          <text x="280" y="60" className="lbl" style={{ fontSize: 11, fill: "#a1a1aa" }}>Barra · Cocina</text>

          {/* ── Baño junto a la barra (esquina NE) ── */}
          <rect x="560" y="20" width="60" height="72" className="area" />
          <rect x="562" y="22" width="56" height="68" rx="2" fill="#3f3f46" />
          <text x="590" y="58" className="lbl">WC</text>
          {/* Divisor barra / baño */}
          <line x1="560" y1="20" x2="560" y2="92" stroke="#52525b" strokeWidth="1.5" />

          {/* ── Divisor barra / sala ── */}
          <line x1="20" y1="92" x2="620" y2="92" stroke="#3f3f46" strokeWidth="1" />

          {/* ── Pasillo central vertical ── */}
          <rect x="300" y="92" width="40" height="360" fill="#18181b" opacity="0.4" />

          {/* ══════════ ZONA IZQUIERDA ══════════ */}

          {/* Mesa 1 — cuadrada 2 pax */}
          <rect x="58" y="118" width="52" height="52" rx="3" className="table" />
          <rect x="66"  y="107" width="36" height="10" rx="2" className="chair" />
          <rect x="66"  y="181" width="36" height="10" rx="2" className="chair" />
          <rect x="45"  y="126" width="10" height="36" rx="2" className="chair" />
          <rect x="113" y="126" width="10" height="36" rx="2" className="chair" />
          <text x="84" y="144" className="num">1</text>

          {/* Mesa 2 — cuadrada 2 pax */}
          <rect x="155" y="118" width="52" height="52" rx="3" className="table" />
          <rect x="163" y="107" width="36" height="10" rx="2" className="chair" />
          <rect x="163" y="181" width="36" height="10" rx="2" className="chair" />
          <rect x="142" y="126" width="10" height="36" rx="2" className="chair" />
          <rect x="210" y="126" width="10" height="36" rx="2" className="chair" />
          <text x="181" y="144" className="num">2</text>

          {/* Mesa 3 — cuadrada 4 pax */}
          <rect x="58" y="218" width="68" height="68" rx="3" className="table" />
          <rect x="66"  y="206" width="52" height="10" rx="2" className="chair" />
          <rect x="66"  y="297" width="52" height="10" rx="2" className="chair" />
          <rect x="45"  y="226" width="10" height="52" rx="2" className="chair" />
          <rect x="129" y="226" width="10" height="52" rx="2" className="chair" />
          <text x="92" y="252" className="num">3</text>

          {/* Mesa 4 — cuadrada 4 pax */}
          <rect x="170" y="218" width="68" height="68" rx="3" className="table" />
          <rect x="178" y="206" width="52" height="10" rx="2" className="chair" />
          <rect x="178" y="297" width="52" height="10" rx="2" className="chair" />
          <rect x="157" y="226" width="10" height="52" rx="2" className="chair" />
          <rect x="241" y="226" width="10" height="52" rx="2" className="chair" />
          <text x="204" y="252" className="num">4</text>

          {/* Mesa 5 — redonda 4 pax */}
          <circle cx="100" cy="372" r="36" className="table" />
          <rect x="82"  y="327" width="36" height="10" rx="5" className="chair" />
          <rect x="82"  y="407" width="36" height="10" rx="5" className="chair" />
          <rect x="55"  y="354" width="10" height="36" rx="5" className="chair" />
          <rect x="135" y="354" width="10" height="36" rx="5" className="chair" />
          <text x="100" y="372" className="num">5</text>

          {/* Mesa 6 — redonda 4 pax */}
          <circle cx="215" cy="372" r="36" className="table" />
          <rect x="197" y="327" width="36" height="10" rx="5" className="chair" />
          <rect x="197" y="407" width="36" height="10" rx="5" className="chair" />
          <rect x="170" y="354" width="10" height="36" rx="5" className="chair" />
          <rect x="255" y="354" width="10" height="36" rx="5" className="chair" />
          <text x="215" y="372" className="num">6</text>

          {/* ══════════ ZONA DERECHA ══════════ */}

          {/* Mesa 7 — cuadrada 2 pax */}
          <rect x="368" y="118" width="52" height="52" rx="3" className="table" />
          <rect x="376" y="107" width="36" height="10" rx="2" className="chair" />
          <rect x="376" y="181" width="36" height="10" rx="2" className="chair" />
          <rect x="355" y="126" width="10" height="36" rx="2" className="chair" />
          <rect x="423" y="126" width="10" height="36" rx="2" className="chair" />
          <text x="394" y="144" className="num">7</text>

          {/* Mesa 8 — cuadrada 2 pax */}
          <rect x="465" y="118" width="52" height="52" rx="3" className="table" />
          <rect x="473" y="107" width="36" height="10" rx="2" className="chair" />
          <rect x="473" y="181" width="36" height="10" rx="2" className="chair" />
          <rect x="452" y="126" width="10" height="36" rx="2" className="chair" />
          <rect x="520" y="126" width="10" height="36" rx="2" className="chair" />
          <text x="491" y="144" className="num">8</text>

          {/* Mesa 9 — cuadrada 4 pax */}
          <rect x="363" y="218" width="68" height="68" rx="3" className="table" />
          <rect x="371" y="206" width="52" height="10" rx="2" className="chair" />
          <rect x="371" y="297" width="52" height="10" rx="2" className="chair" />
          <rect x="350" y="226" width="10" height="52" rx="2" className="chair" />
          <rect x="434" y="226" width="10" height="52" rx="2" className="chair" />
          <text x="397" y="252" className="num">9</text>

          {/* Mesa 10 — cuadrada 4 pax */}
          <rect x="468" y="218" width="68" height="68" rx="3" className="table" />
          <rect x="476" y="206" width="52" height="10" rx="2" className="chair" />
          <rect x="476" y="297" width="52" height="10" rx="2" className="chair" />
          <rect x="455" y="226" width="10" height="52" rx="2" className="chair" />
          <rect x="539" y="226" width="10" height="52" rx="2" className="chair" />
          <text x="502" y="252" className="num">10</text>

          {/* Mesa 11 — redonda 4 pax */}
          <circle cx="398" cy="372" r="36" className="table" />
          <rect x="380" y="327" width="36" height="10" rx="5" className="chair" />
          <rect x="380" y="407" width="36" height="10" rx="5" className="chair" />
          <rect x="353" y="354" width="10" height="36" rx="5" className="chair" />
          <rect x="433" y="354" width="10" height="36" rx="5" className="chair" />
          <text x="398" y="372" className="num">11</text>

          {/* Mesa 12 — redonda 4 pax */}
          <circle cx="515" cy="372" r="36" className="table" />
          <rect x="497" y="327" width="36" height="10" rx="5" className="chair" />
          <rect x="497" y="407" width="36" height="10" rx="5" className="chair" />
          <rect x="470" y="354" width="10" height="36" rx="5" className="chair" />
          <rect x="550" y="354" width="10" height="36" rx="5" className="chair" />
          <text x="515" y="372" className="num">12</text>

          {/* ── Entrada (sur, centrada) ── */}
          <rect x="265" y="472" width="110" height="9" fill="#18181b" />
          <path d="M265 478 Q265 460 282 460" className="arc" />
          <path d="M375 478 Q375 460 358 460" className="arc" />
          <text x="320" y="490" className="lbl">Entrada</text>

        </svg>
      </div>

    </div>
  )
}