import { Link } from '@tanstack/react-router'
import { COMMUNITY_ITEMS, type CommunityItem } from '../data/communityItems'

interface CommunityContentProps {
  current: CommunityItem
  onSelect: (id: string) => void
}

export function CommunityContent({
  current,
  onSelect,
}: Readonly<CommunityContentProps>) {
  return (
    <main className="md:col-span-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{current.label}</h1>
            <p className="mt-2 text-sm text-gray-600">{current.desc}</p>
          </div>
          <div className="text-sm text-gray-400">Contenido comunitario</div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-lg border border-gray-100 bg-linear-to-br from-white to-gray-50 p-4">
            <h3 className="font-semibold">Descripción ampliada</h3>
            <p className="mt-2 text-sm text-gray-700">
              Esta sección ofrece una visión general y recursos destacados
              relacionados con <strong>{current.label}</strong>. Es informativa
              y sirve como punto de partida para explorar lo que la comunidad
              comparte.
            </p>

            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• Últimas publicaciones y guías relevantes.</li>
              <li>• Conversaciones activas y debates destacados.</li>
              <li>• Eventos próximos y oportunidades de voluntariado.</li>
            </ul>
          </article>

          <aside className="rounded-lg border border-gray-100 bg-white p-4">
            <h4 className="font-medium">¿Quieres participar?</h4>
            <p className="mt-2 text-sm text-gray-600">
              Únete al foro, comparte un testimonio o asiste a un evento.
              Nuestra comunidad crece con tu aporte.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                to="/app/comunidad"
                search={{ tab: 'Foro de Discusión' }}
                className="rounded-md bg-teal-600 px-3 py-2 text-sm text-white"
              >
                Ir al Foro
              </Link>
              <Link
                to="/app/comunidad"
                search={{ tab: 'Eventos' }}
                className="rounded-md border border-teal-600 px-3 py-2 text-sm text-teal-600"
              >
                Ver Eventos
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-6">
          <h3 className="text-lg font-semibold">Explorar</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Accede a los distintos espacios dentro de la comunidad.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COMMUNITY_ITEMS.map((it: CommunityItem) => (
              <Link
                key={it.id}
                to="/app/comunidad"
                search={{ tab: it.label }}
                className={`block rounded-xl border p-4 transition hover:shadow-md ${
                  it.id === current.id
                    ? 'border-teal-300 bg-teal-50'
                    : 'border-gray-100 bg-white'
                }`}
                onClick={() => onSelect(it.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white">
                    {it.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{it.label}</div>
                    <div className="mt-1 text-xs text-gray-500">{it.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
