import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { FAQItem } from './FAQItem'
import { publicFAQs } from '../data/mockFaqs'
import type { FAQ } from '../types'

export function PublicHelpCenter() {
  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold">Centro de Ayuda</h1>
          <p className="text-muted-foreground mt-2">
            Encuentra respuestas a tus preguntas o contáctanos
          </p>
        </header>

        <div className="mb-8 space-y-3">
          <h2 className="text-xl font-bold">Preguntas Frecuentes</h2>
          {publicFAQs.map((faq: FAQ) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>

        <Card className="bg-linear-to-br from-blue-50 to-white p-6">
          <CardHeader>
            <CardTitle>¿Necesitas más ayuda?</CardTitle>
            <CardDescription>
              Regístrate para acceder a soporte completo y todas las funciones
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="flex-1">
                <Button variant="default" className="w-full">
                  Regístrate gratis
                </Button>
              </Link>
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 p-6">
          <CardHeader>
            <CardTitle>Formulario de Contacto</CardTitle>
            <CardDescription>
              Envíanos tu pregunta y te responderemos pronto
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="flex flex-col gap-3">
              <input
                placeholder="Tu email"
                type="email"
                className="bg-background rounded-md border px-4 py-2 text-sm"
              />
              <input
                placeholder="Asunto"
                className="bg-background rounded-md border px-4 py-2 text-sm"
              />
              <textarea
                placeholder="Describe tu consulta..."
                className="bg-background min-h-[120px] rounded-md border px-4 py-3 text-sm"
              />
              <div className="flex items-center justify-end">
                <Button variant="default">Enviar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
