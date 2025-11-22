import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// MapVisualization exists in the project; import kept for future use if needed
import { MapVisualization } from "@/components/mapVisualization"
import { cn } from "@/lib/utils"

type Zone = {
  id: string
  name: string
  description?: string
  category?: string
  followers?: number
  color?: string
}

const mockZones: Zone[] = [
  { id: "z1", name: "Plaza Central", description: "Zona tranquila con muchas áreas verdes.", category: "Parque", followers: 124, color: "from-emerald-400 to-teal-500" },
  { id: "z2", name: "Calle Olmo", description: "Reportes recurrentes de ruido nocturno.", category: "Incidencia", followers: 48, color: "from-rose-400 to-rose-600" },
  { id: "z3", name: "Barrio San José", description: "Zona residencial con buena convivencia.", category: "Comunidad", followers: 92, color: "from-sky-400 to-indigo-500" },
]

function ZoneItem({ z }: { z: Zone }) {
  return (
    <Card className="flex items-center gap-4 p-4 transition-transform hover:scale-[1.02]">
      <div className={cn("rounded-lg p-3 shadow-md bg-linear-to-br text-white", z.color || "from-sky-400 to-indigo-500")}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
        </svg>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{z.name}</div>
            <div className="text-sm text-muted-foreground">{z.description}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">{z.followers} seguidores</div>
            <Badge variant="outline">{z.category}</Badge>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Button variant="ghost" size="sm">Seguir</Button>
          <Button variant="outline" size="sm">Ver zona</Button>
        </div>
      </div>
    </Card>
  )
}

export default function ZonasInteresPage() {
  const [zones] = React.useState<Zone[]>(mockZones)

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl bg-linear-to-br from-emerald-500 to-sky-500 text-white p-5 shadow-lg">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop" />
              </Avatar>
              <div>
                <div className="font-bold">Mi Perfil</div>
                <div className="text-sm opacity-90">Intereses y zonas seguidas</div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="default" className="w-full">Crear zona de interés</Button>
            </div>
          </div>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Mis Zonas</CardTitle>
              <CardDescription>Gestiona las zonas que sigues</CardDescription>
            </CardHeader>

            <CardContent className="mt-2 space-y-2">
              {zones.map((z) => (
                <ZoneItem key={z.id} z={z} />
              ))}
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Zonas de interés</h1>
              <p className="text-sm text-muted-foreground">Explora y sigue zonas en tu comunidad</p>
            </div>

            <div className="flex items-center gap-3">
              <input placeholder="Buscar zonas..." className="px-4 py-2 rounded-md border bg-background text-sm shadow-sm" />
              <Button variant="ghost">Filtros</Button>
            </div>
          </div>

          <div className="h-[520px] rounded-2xl overflow-hidden shadow-md">
            {/* Usa el componente de mapa si existe; si no, es un placeholder */}
            <div className="h-full w-full bg-linear-to-tr from-slate-50 to-slate-100 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-semibold">Mapa</div>
                <div className="text-sm">Vista previa del mapa - reemplaza con `MapVisualization`</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {zones.map((z) => (
              <Card key={z.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{z.name}</div>
                    <div className="text-sm text-muted-foreground">{z.description}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="text-sm">{z.followers} seguidores</div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">Explorar</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
