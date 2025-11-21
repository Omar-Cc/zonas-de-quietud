import { useState } from 'react'

const districts = ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'La Molina', 'San Borja']

function LeftSidebar({
  filters,
  setFilters,
  onApply,
  onReset,
}: {
  filters: any
  setFilters: (f: any) => void
  onApply: () => void
  onReset: () => void
}) {
  return (
    <aside className="w-80">
      <div className="p-5">
        <h3 className="flex items-center gap-2 m-0">
          <span className="text-[var(--principal)] text-[18px]">🔎</span>
          <span className="font-bold">Filtros</span>
        </h3>

        <section className="mt-4 bg-white rounded-lg p-3.5 shadow-lg">
          <strong className="block mb-2.5">Distritos</strong>
          <div className="flex flex-col gap-2.5">
            {districts.map((d) => (
              <label key={d} className="flex justify-between items-center">
                <span className="font-semibold">{d}</span>
                <input
                  type="checkbox"
                  checked={filters.districts.includes(d)}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      districts: filters.districts.includes(d) ? filters.districts.filter((x: string) => x !== d) : [...filters.districts, d],
                    })
                  }
                />
              </label>
            ))}
          </div>
        </section>

        <section className="mt-4 bg-white rounded-lg p-3.5 shadow-md">
          <strong className="block mb-2.5">Seguridad</strong>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={filters.seguridad}
              onChange={(e) => setFilters({ ...filters, seguridad: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="w-9 text-right text-[var(--muted)] font-bold">{filters.seguridad}%</span>
          </div>
        </section>

        <section className="mt-3 bg-white rounded-lg p-3.5 shadow-md">
          <strong className="block mb-2.5">Nivel de Ruido</strong>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={filters.ruido}
              onChange={(e) => setFilters({ ...filters, ruido: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="w-9 text-right text-[var(--muted)] font-bold">{filters.ruido}%</span>
          </div>
        </section>

        <section className="mt-3 bg-white rounded-lg p-3.5 shadow-md">
          <strong className="block mb-2.5">Calidad del Aire</strong>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={filters.aire}
              onChange={(e) => setFilters({ ...filters, aire: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="w-9 text-right text-[var(--muted)] font-bold">{filters.aire}%</span>
          </div>
        </section>

        <section className="mt-4 flex gap-2.5">
          <button className="btn contrib flex-1" onClick={onApply}>
            Aplicar Filtros
          </button>
          <button className="flex-1 rounded-[10px] px-3 py-2 border border-[rgba(0,0,0,0.08)] bg-white" onClick={onReset}>
            Restablecer
          </button>
        </section>
      </div>
    </aside>
  )
}

function TopCards() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-4 flex gap-3 z-10">
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg flex gap-6">
        <div className="text-center">
          <div className="text-xs text-[var(--muted)]">Calles</div>
          <div className="font-extrabold">142</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--muted)]">Evaluaciones</div>
          <div className="font-extrabold">3,421</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--muted)]">Promedio</div>
          <div className="font-extrabold">7.2</div>
        </div>
      </div>
    </div>
  )
}

function Legend() {
  const items = [
    { label: 'Excelente', color: '#0bb27f', range: '8.0 - 10.0' },
    { label: 'Bueno', color: '#7dd56b', range: '6.0 - 7.9' },
    { label: 'Regular', color: '#f1c40f', range: '4.0 - 5.9' },
    { label: 'Malo', color: '#ff8a00', range: '2.0 - 3.9' },
    { label: 'Crítico', color: '#ff4d4d', range: '0.0 - 1.9' },
  ]

  return (
    <aside className="absolute right-5 top-1/2 -translate-y-1/2 z-10">
      <div className="w-40 bg-white rounded-xl p-3.5 shadow-xl">
        <strong className="block mb-2.5">Calidad de Vida</strong>
        <div className="flex flex-col gap-2.5">
          {items.map((it) => (
            <div key={it.label} className="flex gap-2.5 items-center">
              <div className="w-3 h-3 rounded-full" style={{ background: it.color }} />
              <div className="flex-1">
                <div className="font-bold">{it.label}</div>
                <div className="text-xs text-[var(--muted)]">{it.range}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function MapCanvas() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-4/5 h-[520px] bg-[#f3f4f6] rounded-md relative flex items-center justify-center">
        <svg width="90%" height="80%" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet">
          {/* vertical streets */}
          <line x1="140" y1="40" x2="140" y2="480" stroke="#7dd56b" strokeWidth={14} strokeLinecap="round" />
          <line x1="320" y1="20" x2="320" y2="500" stroke="#f1c40f" strokeWidth={14} strokeLinecap="round" />
          <line x1="560" y1="0" x2="560" y2="520" stroke="#f1c40f" strokeWidth={14} strokeLinecap="round" />
          <line x1="760" y1="10" x2="760" y2="510" stroke="#ff8a00" strokeWidth={14} strokeLinecap="round" />

          {/* horizontal streets */}
          <line x1="40" y1="120" x2="860" y2="120" stroke="#00b894" strokeWidth={14} strokeLinecap="round" />
          <line x1="40" y1="200" x2="860" y2="200" stroke="#ff4d4d" strokeWidth={14} strokeLinecap="round" />
          <line x1="40" y1="280" x2="860" y2="280" stroke="#7dd56b" strokeWidth={14} strokeLinecap="round" />
          <line x1="40" y1="360" x2="860" y2="360" stroke="#7dd56b" strokeWidth={14} strokeLinecap="round" />

          {/* diagonal streets */}
          <line x1="360" y1="480" x2="520" y2="40" stroke="#ff8a00" strokeWidth={14} strokeLinecap="round" />
          <line x1="410" y1="40" x2="550" y2="480" stroke="#00b894" strokeWidth={18} strokeLinecap="round" />
          <line x1="220" y1="420" x2="620" y2="120" stroke="#ff8a00" strokeWidth={12} strokeLinecap="round" />

          {/* labels (simple) */}
          <text x="150" y="110" fontSize={14} fill="#082" fontWeight={700}>Av. Pardo</text>
          <text x="540" y="100" fontSize={14} fill="#082" fontWeight={700}>Av. Arequipa</text>
          <text x="360" y="190" fontSize={14} fill="#082" fontWeight={700}>Av. Benavides</text>

          {/* blue points */}
          <circle cx="520" cy="140" r="8" fill="#3b82f6" />
          <circle cx="700" cy="220" r="8" fill="#3b82f6" />
          <circle cx="470" cy="300" r="8" fill="#3b82f6" />
        </svg>
      </div>
    </div>
  )
}

export default function MapaPage() {
  const [filters, setFilters] = useState({ districts: ['Miraflores'], seguridad: 70, ruido: 50, aire: 60 })

  function apply() {
    // placeholder: aquí podríamos aplicar filtros reales
    console.log('Aplicar filtros', filters)
  }

  function reset() {
    setFilters({ districts: [], seguridad: 70, ruido: 50, aire: 60 })
  }

  return (
    <div className="hero bg-transparent">
      <div className="relative">
        <div className="filter-bar">
          <div className="filter-left">
            <div className="filter-label">Opciones de Vista</div>
            <div className="filter-items">
              <label className="filter-item">Mostrar Heat Map <input type="checkbox" defaultChecked className="ml-2" /></label>
              <label className="filter-item">Mostrar Etiquetas <input type="checkbox" defaultChecked className="ml-2" /></label>
            </div>
          </div>
          <div className="filter-right">
            <a className="all-cats">Aplicar filtros</a>
          </div>
        </div>
      </div>

      <div className="flex gap-[18px] py-[22px] px-[18px]">
        <LeftSidebar filters={filters} setFilters={setFilters} onApply={apply} onReset={reset} />

        <main className="flex-1 relative">
          <TopCards />
          <MapCanvas />
          <Legend />
        </main>
      </div>
    </div>
  )
}
