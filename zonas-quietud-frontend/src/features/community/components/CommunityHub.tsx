import { useState, useEffect } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { CommunitySidebar } from './CommunitySidebar'
import { CommunityContent } from './CommunityContent'
import { COMMUNITY_ITEMS } from '../data/communityItems'

export function CommunityHub() {
  const search = useSearch({ from: '/app/comunidad' })
  const [selected, setSelected] = useState(COMMUNITY_ITEMS[0].id)

  // Sync with URL search params
  useEffect(() => {
    if (search.tab) {
      const match = COMMUNITY_ITEMS.find(
        (i) =>
          i.label.toLowerCase() === search.tab?.toLowerCase() ||
          i.id === search.tab?.toLowerCase()
      )
      if (match) setSelected(match.id)
    }
  }, [search.tab])

  const current =
    COMMUNITY_ITEMS.find((i) => i.id === selected) ?? COMMUNITY_ITEMS[0]

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 px-4 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4">
        <CommunitySidebar selected={selected} onSelect={setSelected} />
        <CommunityContent current={current} onSelect={setSelected} />

        {/* Right aside - Highlights */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h4 className="font-medium">Próximos Eventos</h4>
              <ul className="mt-3 space-y-3 text-sm text-gray-700">
                <li>
                  <div className="font-medium">
                    Encuentro Vecinal - Miraflores
                  </div>
                  <div className="text-xs text-gray-500">12 Dic · 10:00</div>
                </li>
                <li>
                  <div className="font-medium">
                    Taller de Calificación Ciudadana
                  </div>
                  <div className="text-xs text-gray-500">18 Dic · 16:00</div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h4 className="font-medium">Únete</h4>
              <p className="mt-2 text-sm text-gray-600">
                Sé parte de la comunidad: comparte, opina y propone iniciativas.
              </p>
              <Link
                to="/app/comunidad"
                search={{ tab: 'Eventos' }}
                className="mt-3 inline-block rounded-md bg-emerald-600 px-3 py-2 text-sm text-white"
              >
                Ver eventos
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
