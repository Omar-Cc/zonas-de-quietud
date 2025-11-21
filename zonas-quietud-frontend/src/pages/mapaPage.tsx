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
    <aside style={{ width: 320 }}>
      <div style={{ padding: 20 }}>
        <h3 style={{ display: 'flex', gap: 8, alignItems: 'center', margin: 0 }}>
          <span style={{ color: 'var(--principal)', fontSize: 18 }}>🔎</span>
          <span style={{ fontWeight: 700 }}>Filtros</span>
        </h3>

        <section style={{ marginTop: 18, background: 'white', borderRadius: 8, padding: 14, boxShadow: '0 6px 20px rgba(27,32,31,0.08)' }}>
          <strong style={{ display: 'block', marginBottom: 10 }}>Distritos</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {districts.map((d) => (
              <label key={d} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{d}</span>
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

        <section style={{ marginTop: 18, background: 'white', borderRadius: 8, padding: 14, boxShadow: '0 6px 20px rgba(27,32,31,0.04)' }}>
          <strong style={{ display: 'block', marginBottom: 10 }}>Seguridad</strong>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.seguridad}
              onChange={(e) => setFilters({ ...filters, seguridad: Number(e.target.value) })}
              style={{ flex: 1 }}
            />
            <span style={{ width: 36, textAlign: 'right', color: 'var(--muted)', fontWeight: 700 }}>{filters.seguridad}%</span>
          </div>
        </section>

        <section style={{ marginTop: 12, background: 'white', borderRadius: 8, padding: 14, boxShadow: '0 6px 20px rgba(27,32,31,0.04)' }}>
          <strong style={{ display: 'block', marginBottom: 10 }}>Nivel de Ruido</strong>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.ruido}
              onChange={(e) => setFilters({ ...filters, ruido: Number(e.target.value) })}
              style={{ flex: 1 }}
            />
            <span style={{ width: 36, textAlign: 'right', color: 'var(--muted)', fontWeight: 700 }}>{filters.ruido}%</span>
          </div>
        </section>

        <section style={{ marginTop: 12, background: 'white', borderRadius: 8, padding: 14, boxShadow: '0 6px 20px rgba(27,32,31,0.04)' }}>
          <strong style={{ display: 'block', marginBottom: 10 }}>Calidad del Aire</strong>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.aire}
              onChange={(e) => setFilters({ ...filters, aire: Number(e.target.value) })}
              style={{ flex: 1 }}
            />
            <span style={{ width: 36, textAlign: 'right', color: 'var(--muted)', fontWeight: 700 }}>{filters.aire}%</span>
          </div>
        </section>

        <section style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button className="btn contrib" onClick={onApply} style={{ flex: 1 }}>
            Aplicar Filtros
          </button>
          <button style={{ flex: 1, borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(0,0,0,0.08)', background: 'white' }} onClick={onReset}>
            Restablecer
          </button>
        </section>
      </div>
    </aside>
  )
}

function TopCards() {
  return (
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 18, display: 'flex', gap: 12, zIndex: 5 }}>
      <div style={{ background: 'white', padding: '12px 18px', borderRadius: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', display: 'flex', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Calles</div>
          <div style={{ fontWeight: 800 }}>142</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Evaluaciones</div>
          <div style={{ fontWeight: 800 }}>3,421</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Promedio</div>
          <div style={{ fontWeight: 800 }}>7.2</div>
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
    <aside style={{ position: 'absolute', right: 20, top: '40%', transform: 'translateY(-40%)', zIndex: 6 }}>
      <div style={{ width: 160, background: 'white', borderRadius: 12, padding: 14, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <strong style={{ display: 'block', marginBottom: 10 }}>Calidad de Vida</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it) => (
            <div key={it.label} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: it.color }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{it.range}</div>
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
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80%', height: 520, background: '#f3f4f6', borderRadius: 6, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    <div className="hero" style={{ background: 'transparent' }}>
      <div className="sticky-wrap" style={{ position: 'relative' }}>
        <div className="nav" style={{ background: 'white' }}>
          <div className="nav-left">
            <div className="brand">
              <div className="logo-dot" style={{ background: 'var(--principal)' }} />
              <div className="brand-text">Zonas de Quietud</div>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn contrib">Contribuir</button>
          </div>
        </div>
        <div className="filter-bar">
          <div className="filter-left">
            <div className="filter-label">Opciones de Vista</div>
            <div className="filter-items">
              <label className="filter-item">Mostrar Heat Map <input type="checkbox" defaultChecked style={{ marginLeft: 8 }} /></label>
              <label className="filter-item">Mostrar Etiquetas <input type="checkbox" defaultChecked style={{ marginLeft: 8 }} /></label>
            </div>
          </div>
          <div className="filter-right">
            <a className="all-cats">Aplicar filtros</a>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, padding: '22px 18px' }}>
        <LeftSidebar filters={filters} setFilters={setFilters} onApply={apply} onReset={reset} />

        <main style={{ flex: 1, position: 'relative' }}>
          <TopCards />
          <MapCanvas />
          <Legend />
        </main>
      </div>
    </div>
  )
}
