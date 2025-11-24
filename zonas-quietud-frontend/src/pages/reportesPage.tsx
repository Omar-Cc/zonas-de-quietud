import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// cn utility not required here; kept imports minimal

type Report = {
  id: string
  title: string
  reporter: string
  email?: string
  date: string
  location: string
  excerpt: string
  status: "abierto" | "en_progreso" | "resuelto"
  avatar?: string
}

const mockReports: Report[] = [
  {
    id: "rp1",
    title: "Ruido nocturno persistente",
    reporter: "María García",
    email: "usuario@email.com",
    date: "18 Nov, 2025",
    location: "Calle Olmo, 23",
    excerpt: "Ruido de música y vehículos durante la madrugada, afecta descanso.",
    status: "abierto",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop",
  },
  {
    id: "rp2",
    title: "Basura acumulada en esquina",
    reporter: "Carlos Ruiz",
    date: "12 Nov, 2025",
    location: "Plaza Central",
    excerpt: "Acumulación de residuos desde hace 5 días; necesidad de recolección.",
    status: "en_progreso",
  },
  {
    id: "rp3",
    title: "Iluminación defectuosa",
    reporter: "Ana López",
    date: "01 Nov, 2025",
    location: "Av. Libertad",
    excerpt: "Farolas apagadas en el tramo entre 3 y 7, peligro para peatones.",
    status: "resuelto",
  },
]

function statusBadge(status: Report['status']) {
  if (status === 'abierto') return <Badge className="bg-rose-500/95">Abierto</Badge>
  if (status === 'en_progreso') return <Badge className="bg-amber-500/90">En progreso</Badge>
  return <Badge className="bg-emerald-500/90">Resuelto</Badge>
}

function ReportItem({ r }: { r: Report }) {
  return (
    <Card className="flex gap-4 p-4 items-start hover:shadow-lg transition-shadow">
      <div className="shrink-0">
        <Avatar>
          {r.avatar ? <AvatarImage src={r.avatar} /> : <AvatarFallback>{r.reporter.charAt(0)}</AvatarFallback>}
        </Avatar>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">{r.title}</h3>
            <div className="text-sm text-muted-foreground">{r.location} · <span className="font-medium">{r.reporter}</span></div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-muted-foreground">{r.date}</div>
            {statusBadge(r.status)}
          </div>
        </div>

        <p className="mt-3 text-sm text-foreground/90">{r.excerpt}</p>

        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm">Ver detalle</Button>
          <Button variant="ghost" size="sm">Contactar</Button>
        </div>
      </div>
    </Card>
  )
}

export default function ReportesPage() {
  const [reports] = React.useState<Report[]>(mockReports)

  const counts = {
    total: reports.length,
    abierto: reports.filter((r) => r.status === 'abierto').length,
    en_progreso: reports.filter((r) => r.status === 'en_progreso').length,
    resuelto: reports.filter((r) => r.status === 'resuelto').length,
  }

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="rounded-2xl bg-linear-to-br from-sky-600 to-indigo-600 text-white p-6 shadow-md mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">Mis Reportes</h1>
              <p className="mt-1 text-sm opacity-90">Sigue el estado de tus reportes y gestiona comunicaciones.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs opacity-90">Total</div>
                <div className="text-xl font-bold">{counts.total}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs">Abiertos</div>
                  <div className="font-semibold">{counts.abierto}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs">En progreso</div>
                  <div className="font-semibold">{counts.en_progreso}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs">Resueltos</div>
                  <div className="font-semibold">{counts.resuelto}</div>
                </div>
              </div>

              <div>
                <Button variant="default">Nuevo reporte</Button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Filtros rápidos</CardTitle>
                <CardDescription>Filtra por estado o ubicación</CardDescription>
              </CardHeader>

              <CardContent className="mt-2 flex flex-col gap-2">
                <Button variant="outline" size="sm">Todos</Button>
                <Button variant="outline" size="sm">Abiertos</Button>
                <Button variant="outline" size="sm">En progreso</Button>
                <Button variant="outline" size="sm">Resueltos</Button>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle>Contacto</CardTitle>
                <CardDescription>Información del equipo responsable</CardDescription>
              </CardHeader>

              <CardContent className="mt-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>EQ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Equipo de Soporte</div>
                    <div className="text-sm text-muted-foreground">soporte@zona.org</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Últimos reportes</h2>
                <p className="text-sm text-muted-foreground">Revisa el estado y comunica novedades.</p>
              </div>

              <div className="flex items-center gap-3">
                <input placeholder="Buscar reportes..." className="px-4 py-2 rounded-md border bg-background text-sm shadow-sm" />
                <Button variant="ghost">Exportar</Button>
              </div>
            </div>

            <div className="space-y-3">
              {reports.map((r) => (
                <ReportItem key={r.id} r={r} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
