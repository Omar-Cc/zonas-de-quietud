import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FAQItem } from './FAQItem'
import type { FAQ } from '../types'
import { faqs } from '../data/mockFaqs'

export function SupportDashboard() {
  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        <header className="rounded-2xl bg-linear-to-br from-slate-50 to-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">Ayuda</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Encuentra respuestas rápidas, contacta soporte o consulta guías.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Buscar ayuda..."
                className="bg-background rounded-md border px-4 py-2 text-sm shadow-sm"
              />
              <Button variant="default">Buscar</Button>
            </div>
          </div>
        </header>

        <aside className="space-y-4 lg:col-span-1">
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
                  <div className="text-muted-foreground text-sm">
                    soporte@zonas.org
                  </div>
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
              <a
                className="hover:bg-accent/5 flex items-center gap-3 rounded p-2"
                href="#"
              >
                Guía rápida para reportes
              </a>
              <a
                className="hover:bg-accent/5 flex items-center gap-3 rounded p-2"
                href="#"
              >
                Política de notificaciones
              </a>
              <a
                className="hover:bg-accent/5 flex items-center gap-3 rounded p-2"
                href="#"
              >
                Preguntas frecuentes
              </a>
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Preguntas frecuentes</h2>
              <p className="text-muted-foreground text-sm">
                Respuestas rápidas a las dudas más comunes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">Top</Badge>
              <Button variant="ghost">Ver todas</Button>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((f: FAQ) => (
              <FAQItem key={f.id} faq={f} />
            ))}
          </div>

          <div className="mt-6">
            <Card className="bg-linear-to-br from-amber-50 to-white p-4">
              <CardHeader>
                <CardTitle>¿No encuentras lo que buscas?</CardTitle>
                <CardDescription>
                  Envíanos tu pregunta y te responderemos pronto.
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-2">
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Asunto"
                    className="bg-background rounded-md border px-4 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Describe tu duda..."
                    className="bg-background min-h-[120px] rounded-md border px-4 py-3 text-sm"
                  />
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
