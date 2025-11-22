import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type FAQ = { id: string; q: string; a: string }

const faqs: FAQ[] = [
  { id: "f1", q: "¿Cómo reporto una zona ruidosa?", a: "Pulsa en 'Nuevo reporte' desde la sección de reportes, completa la información y añade ubicación o foto." },
  { id: "f2", q: "¿Puedo seguir zonas específicas?", a: "Sí: en 'Zonas de interés' puedes seguir una zona para recibir notificaciones relacionadas." },
  { id: "f3", q: "¿Cómo edito mi perfil?", a: "Ve a tu perfil (arriba a la derecha) y edita nombre, email y preferencias de notificación." },
]

function FAQItem({ f }: { f: FAQ }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between px-4 py-3 bg-background text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">?</div>
          <div className="font-medium">{f.q}</div>
        </div>
        <div className="text-sm text-muted-foreground">{open ? "-" : "+"}</div>
      </button>

      {open && <div className="px-4 py-3 bg-white text-sm text-muted-foreground">{f.a}</div>}
    </div>
  )
}

export default function AyudaPage() {
  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <header className="lg:col-span-3 rounded-2xl bg-linear-to-br from-slate-50 to-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">Ayuda</h1>
              <p className="text-sm text-muted-foreground mt-1">Encuentra respuestas rápidas, contacta soporte o consulta guías.</p>
            </div>

            <div className="flex items-center gap-3">
              <input placeholder="Buscar ayuda..." className="px-4 py-2 rounded-md border bg-background text-sm shadow-sm" />
              <Button variant="default">Buscar</Button>
            </div>
          </div>
        </header>

        <aside className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Contacto rápido</CardTitle>
              <CardDescription>Habla con el equipo de soporte</CardDescription>
            </CardHeader>

            <CardContent className="mt-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AY</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Soporte Zonas</div>
                  <div className="text-sm text-muted-foreground">soporte@zonas.org</div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="default">Iniciar chat</Button>
                <Button variant="outline">Enviar email</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Recursos</CardTitle>
              <CardDescription>Guías y documentación útil</CardDescription>
            </CardHeader>

            <CardContent className="mt-2 flex flex-col gap-2">
              <a className="flex items-center gap-3 p-2 rounded hover:bg-accent/5" href="#">Guía rápida para reportes</a>
              <a className="flex items-center gap-3 p-2 rounded hover:bg-accent/5" href="#">Política de notificaciones</a>
              <a className="flex items-center gap-3 p-2 rounded hover:bg-accent/5" href="#">Preguntas frecuentes</a>
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Preguntas frecuentes</h2>
              <p className="text-sm text-muted-foreground">Respuestas rápidas a las dudas más comunes</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">Top</Badge>
              <Button variant="ghost">Ver todas</Button>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <FAQItem key={f.id} f={f} />
            ))}
          </div>

          <div className="mt-6">
            <Card className="p-4 bg-linear-to-br from-amber-50 to-white">
              <CardHeader>
                <CardTitle>¿No encuentras lo que buscas?</CardTitle>
                <CardDescription>Envíanos tu pregunta y te responderemos pronto.</CardDescription>
              </CardHeader>

              <CardContent className="mt-2">
                <div className="flex flex-col gap-3">
                  <input placeholder="Asunto" className="px-4 py-2 rounded-md border bg-background text-sm" />
                  <textarea placeholder="Describe tu duda..." className="px-4 py-3 rounded-md border bg-background text-sm min-h-[120px]" />
                  <div className="flex items-center justify-end">
                    <Button variant="default">Enviar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
