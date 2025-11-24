import * as React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RatingSummary } from './RatingSummary'
import { ReviewItem } from './ReviewItem'
import { mockReviews } from '../data/mockReviews'
import type { Review } from '../types/types'

export function RatingsDashboard() {
  const [reviews] = React.useState<Review[]>(mockReviews)

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        <aside className="space-y-4 lg:col-span-1">
          <div className="overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop" />
              </Avatar>
              <div>
                <div className="font-bold">María García</div>
                <div className="text-sm opacity-90">usuario@email.com</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-xs opacity-90">Promedio</div>
                <div className="text-2xl font-extrabold">
                  {(
                    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
                  ).toFixed(1)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs opacity-90">Reseñas</div>
                <div className="text-2xl font-extrabold">{reviews.length}</div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="default">Escribir reseña</Button>
            </div>
          </div>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>
                Filtra por puntuación o relevancia
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm">
                5 estrellas
              </Button>
              <Button variant="outline" size="sm">
                4 estrellas
              </Button>
              <Button variant="outline" size="sm">
                Con comentarios
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Calificaciones</h1>
              <p className="text-muted-foreground text-sm">
                Opiniones y valoraciones recibidas por el usuario
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Buscar reseñas..."
                className="bg-background rounded-md border px-4 py-2 text-sm shadow-sm"
              />
              <Button variant="ghost">Exportar</Button>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4">
            <RatingSummary reviews={reviews} />
          </div>

          <div className="space-y-3">
            {reviews.map((r) => (
              <ReviewItem key={r.id} review={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
