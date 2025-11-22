import { useEffect, useState } from "react";
import { Newspaper, Users, Star, Award, Calendar, TrendingUp } from "lucide-react";

const ITEMS = [
  { id: "blog", label: "Blog", desc: "Artículos, novedades y publicaciones de interés comunitario.", icon: <Newspaper className="w-5 h-5 text-sky-500" /> },
  { id: "foro", label: "Foro de Discusión", desc: "Participa en debates y comparte experiencias con otros usuarios.", icon: <Users className="w-5 h-5 text-emerald-500" /> },
  { id: "testimonios", label: "Testimonios", desc: "Historias de vecinos y embajadores que mejoraron sus barrios.", icon: <Star className="w-5 h-5 text-amber-400" /> },
  { id: "embajadores", label: "Embajadores", desc: "Conoce a las personas que promueven zonas de quietud en sus distritos.", icon: <Award className="w-5 h-5 text-violet-500" /> },
  { id: "eventos", label: "Eventos", desc: "Encuentros, talleres y jornadas comunitarias cercanas a ti.", icon: <Calendar className="w-5 h-5 text-rose-500" /> },
  { id: "ranking", label: "Ranking de Calles", desc: "Listado y mapas con las calles mejor calificadas por la comunidad.", icon: <TrendingUp className="w-5 h-5 text-cyan-600" /> },
];

export default function ComunidadPage() {
  const [selected, setSelected] = useState(ITEMS[0].id);

  // Leer query param ?tab= para selección inicial
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        // buscar el item por label (caso más probable desde navbar)
        const match = ITEMS.find((i) => i.label.toLowerCase() === tab.toLowerCase() || i.id === tab.toLowerCase());
        if (match) setSelected(match.id);
      }
    } catch (e) {
      // silent
    }
  }, []);

  const current = ITEMS.find((i) => i.id === selected) ?? ITEMS[0];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left - Sticky mini-nav */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold">Comunidad</h3>
              <p className="text-sm text-gray-500 mt-1">Conéctate, participa y descubre.</p>
            </div>

            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y">
                {ITEMS.map((it) => {
                  const active = it.id === selected;
                  return (
                    <li key={it.id}>
                      <a
                        href={`/app/comunidad?tab=${encodeURIComponent(it.label)}`}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${active ? "bg-teal-50 text-teal-700" : "hover:bg-gray-50 text-gray-800"}`}
                        onClick={() => setSelected(it.id)}
                      >
                        <span className="inline-flex w-9 h-9 items-center justify-center rounded-md bg-white border">{it.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{it.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{it.desc}</div>
                        </div>
                        <div className="text-xs text-gray-400">→</div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="md:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{current.label}</h1>
                <p className="text-sm text-gray-600 mt-2">{current.desc}</p>
              </div>
              <div className="text-sm text-gray-400">Contenido comunitario</div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="p-4 rounded-lg bg-linear-to-br from-white to-gray-50 border border-gray-100">
                <h3 className="font-semibold">Descripción ampliada</h3>
                <p className="mt-2 text-sm text-gray-700">Esta sección ofrece una visión general y recursos destacados relacionados con <strong>{current.label}</strong>. Es informativa y sirve como punto de partida para explorar lo que la comunidad comparte.</p>

                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• Últimas publicaciones y guías relevantes.</li>
                  <li>• Conversaciones activas y debates destacados.</li>
                  <li>• Eventos próximos y oportunidades de voluntariado.</li>
                </ul>
              </article>

              <aside className="p-4 rounded-lg bg-white border border-gray-100">
                <h4 className="font-medium">¿Quieres participar?</h4>
                <p className="mt-2 text-sm text-gray-600">Únete al foro, comparte un testimonio o asiste a un evento. Nuestra comunidad crece con tu aporte.</p>
                <div className="mt-4 flex gap-3">
                  <a href="/app/comunidad?tab=Foro%20de%20Discusi%C3%B3n" className="px-3 py-2 rounded-md bg-teal-600 text-white text-sm">Ir al Foro</a>
                  <a href="/app/comunidad?tab=Eventos" className="px-3 py-2 rounded-md border border-teal-600 text-teal-600 text-sm">Ver Eventos</a>
                </div>
              </aside>
            </div>

            <section className="mt-6">
              <h3 className="text-lg font-semibold">Explorar</h3>
              <p className="text-sm text-gray-500 mt-1">Accede a los distintos espacios dentro de la comunidad.</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ITEMS.map((it) => (
                  <a
                    key={it.id}
                    href={`/app/comunidad?tab=${encodeURIComponent(it.label)}`}
                    className={`block p-4 rounded-xl border ${it.id === selected ? "border-teal-300 bg-teal-50" : "border-gray-100 bg-white"} hover:shadow-md transition`}
                    onClick={() => setSelected(it.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center">{it.icon}</div>
                      <div>
                        <div className="font-semibold">{it.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{it.desc}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Right aside - Highlights */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-medium">Próximos Eventos</h4>
              <ul className="mt-3 space-y-3 text-sm text-gray-700">
                <li>
                  <div className="font-medium">Encuentro Vecinal - Miraflores</div>
                  <div className="text-xs text-gray-500">12 Dic · 10:00</div>
                </li>
                <li>
                  <div className="font-medium">Taller de Calificación Ciudadana</div>
                  <div className="text-xs text-gray-500">18 Dic · 16:00</div>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-medium">Únete</h4>
              <p className="text-sm text-gray-600 mt-2">Sé parte de la comunidad: comparte, opina y propone iniciativas.</p>
              <a href="/app/comunidad?tab=Eventos" className="mt-3 inline-block px-3 py-2 rounded-md bg-emerald-600 text-white text-sm">Ver eventos</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
