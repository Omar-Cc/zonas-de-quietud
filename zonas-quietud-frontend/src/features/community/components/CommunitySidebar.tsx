import { Link } from '@tanstack/react-router'
import { COMMUNITY_ITEMS, type CommunityItem } from '../data/communityItems'

interface CommunitySidebarProps {
  selected: string
  onSelect: (id: string) => void
}

export function CommunitySidebar({
  selected,
  onSelect,
}: Readonly<CommunitySidebarProps>) {
  return (
    <aside className="md:col-span-1">
      <div className="sticky top-6 space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Comunidad</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Conéctate, participa y descubre.
          </p>
        </div>

        <nav className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <ul className="divide-y">
            {COMMUNITY_ITEMS.map((it: CommunityItem) => {
              const active = it.id === selected
              return (
                <li key={it.id}>
                  <Link
                    to="/comunidad"
                    search={{ tab: it.label }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm ${active ? 'bg-teal-50 text-teal-700' : 'text-gray-800 hover:bg-gray-50'}`}
                    onClick={() => onSelect(it.id)}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white">
                      {it.icon}
                    </span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{it.label}</div>
                      <div className="text-muted-foreground mt-0.5 text-xs">
                        {it.desc}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">→</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
