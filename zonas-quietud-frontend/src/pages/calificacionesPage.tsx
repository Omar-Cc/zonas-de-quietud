import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/starRating"
import { cn } from "@/lib/utils"

type Review = {
  id: string
  author: string
  text: string
  rating: number
  date: string
  avatar?: string
}

const mockReviews: Review[] = [
  {
    id: "r1",
    author: "María García",
    text: "Respuesta rápida y solución satisfactoria. Muy agradecida con el equipo.",
    rating: 5,
    date: "12 Nov, 2025",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop",
  },
  {
    id: "r2",
    author: "Carlos Ruiz",
    text: "Atención correcta, aunque tardaron un poco en responder.",
    rating: 4,
    date: "02 Nov, 2025",
  },
  {
    id: "r3",
    author: "Ana López",
    text: "No se resolvió el problema, pero el seguimiento fue bueno.",
    rating: 3,
    date: "28 Oct, 2025",
  },
]

function RatingSummary({ reviews }: { reviews: Review[] }) {
  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, reviews.length)
  ).toFixed(1)

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-extrabold">{avg}</div>
          <div className="flex items-center gap-2 mt-2">
            <StarRating value={Math.round(Number(avg))} onChange={() => {}} size="lg" />
            <span className="text-sm text-muted-foreground">({reviews.length} reseñas)</span>
          </div>
        </div>

        <div className="flex-1">
          {distribution.map((d) => {
            const pct = reviews.length ? (d.count / reviews.length) * 100 : 0
            return (
              <div key={d.star} className="flex items-center gap-3 mb-2">
                <span className="w-6 text-sm">{d.star}★</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full bg-linear-to-r from-amber-400 to-amber-600", "rounded-full")} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-sm">{d.count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

function ReviewItem({ r }: { r: Review }) {
  return (
    <Card className="flex gap-4 p-4 items-start">
      <Avatar>
        {r.avatar ? <AvatarImage src={r.avatar} /> : <AvatarFallback>{r.author.charAt(0)}</AvatarFallback>}
      </Avatar>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold">{r.author}</div>
            <div className="text-sm text-muted-foreground">{r.date}</div>
          </div>
          <div className="flex items-center gap-2">
            <StarRating value={r.rating} onChange={() => {}} size="sm" />
            <Badge variant="outline">{r.rating}</Badge>
          </div>
        </div>

        <p className="mt-3 text-sm text-foreground/90">{r.text}</p>
      </div>
    </Card>
  )
}

export default function CalificacionesPage() {
  const [reviews] = React.useState<Review[]>(mockReviews)

  return (
    <main className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white p-6 shadow-lg">
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
                <div className="text-2xl font-extrabold">{(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}</div>
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
              <CardDescription>Filtra por puntuación o relevancia</CardDescription>
            </CardHeader>

            <CardContent className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm">5 estrellas</Button>
              <Button variant="outline" size="sm">4 estrellas</Button>
              <Button variant="outline" size="sm">Con comentarios</Button>
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Calificaciones</h1>
              <p className="text-sm text-muted-foreground">Opiniones y valoraciones recibidas por el usuario</p>
            </div>

            <div className="flex items-center gap-3">
              <input placeholder="Buscar reseñas..." className="px-4 py-2 rounded-md border bg-background text-sm shadow-sm" />
              <Button variant="ghost">Exportar</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <RatingSummary reviews={reviews} />
          </div>

          <div className="space-y-3">
            {reviews.map((r) => (
              <ReviewItem key={r.id} r={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
