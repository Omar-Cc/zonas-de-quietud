import { Link } from '@tanstack/react-router'
import { COMMUNITY_ITEMS, type CommunityItem } from '../data/communityItems'
import {
  Calendar,
  MapPin,
  User,
  ThumbsUp,
  MessageSquare,
  Eye,
} from 'lucide-react'

interface CommunityContentProps {
  current: CommunityItem
  onSelect: (id: string) => void
}

// Datos reales para cada sección
const CONTENT_DATA = {
  blog: {
    title: 'Últimas Publicaciones',
    posts: [
      {
        id: 1,
        title: 'Cómo las zonas de quietud mejoran la salud mental',
        excerpt:
          'Estudios recientes demuestran que vivir en áreas tranquilas reduce el estrés y mejora la calidad del sueño.',
        author: 'Dr. Carlos Mendoza',
        date: '28 Nov 2024',
        views: 1234,
        likes: 89,
      },
      {
        id: 2,
        title: 'Iniciativas vecinales que transformaron barrios ruidosos',
        excerpt:
          'Conoce las estrategias que implementaron vecinos de San Isidro para reducir el ruido vehicular en un 40%.',
        author: 'María González',
        date: '25 Nov 2024',
        views: 892,
        likes: 67,
      },
      {
        id: 3,
        title: 'Guía para reportar incidentes de forma efectiva',
        excerpt:
          'Aprende a documentar y reportar problemas de ruido, seguridad y contaminación para generar mayor impacto.',
        author: 'Equipo Zonas de Quietud',
        date: '22 Nov 2024',
        views: 2156,
        likes: 143,
      },
    ],
  },
  foro: {
    title: 'Discusiones Activas',
    threads: [
      {
        id: 1,
        title: '¿Cómo convencer a vecinos de reducir el ruido nocturno?',
        author: 'Ana Pérez',
        replies: 23,
        views: 456,
        lastActivity: 'Hace 2 horas',
        category: 'Ruido',
      },
      {
        id: 2,
        title: 'Propuesta: Más áreas verdes en Miraflores',
        author: 'Jorge Ramírez',
        replies: 45,
        views: 892,
        lastActivity: 'Hace 5 horas',
        category: 'Iniciativas',
      },
      {
        id: 3,
        title: 'Experiencia con la municipalidad para mejorar iluminación',
        author: 'Lucía Torres',
        replies: 18,
        views: 334,
        lastActivity: 'Hace 1 día',
        category: 'Seguridad',
      },
    ],
  },
  testimonios: {
    title: 'Historias de Éxito',
    stories: [
      {
        id: 1,
        name: 'Roberto Sánchez',
        district: 'San Borja',
        quote:
          'Gracias a la plataforma, logramos que la municipalidad instale reductores de velocidad en nuestra calle. El ruido disminuyó notablemente.',
        impact: 'Reducción del 35% en nivel de ruido',
        date: 'Octubre 2024',
      },
      {
        id: 2,
        name: 'Carmen Flores',
        district: 'Barranco',
        quote:
          'Organizamos un grupo de vecinos a través del foro y ahora tenemos un parque más limpio y seguro para nuestros hijos.',
        impact: '50 vecinos activos, 3 mejoras implementadas',
        date: 'Septiembre 2024',
      },
      {
        id: 3,
        name: 'Miguel Ángel Castro',
        district: 'Surco',
        quote:
          'La app me ayudó a encontrar las rutas más tranquilas para mis caminatas matutinas. Mi calidad de vida mejoró significativamente.',
        impact: 'Uso diario de la plataforma',
        date: 'Noviembre 2024',
      },
    ],
  },
  embajadores: {
    title: 'Embajadores de Zonas de Quietud',
    ambassadors: [
      {
        id: 1,
        name: 'Patricia Morales',
        district: 'Miraflores',
        role: 'Coordinadora Distrital',
        contributions: 156,
        description:
          'Lidera iniciativas de reducción de ruido y organiza talleres comunitarios mensuales.',
      },
      {
        id: 2,
        name: 'Eduardo Vargas',
        district: 'San Isidro',
        role: 'Especialista en Calidad del Aire',
        contributions: 98,
        description:
          'Monitorea la calidad del aire y promueve campañas de arborización urbana.',
      },
      {
        id: 3,
        name: 'Sofía Delgado',
        district: 'Jesús María',
        role: 'Activista de Seguridad',
        contributions: 124,
        description:
          'Coordina con autoridades para mejorar la iluminación y vigilancia en zonas críticas.',
      },
    ],
  },
  eventos: {
    title: 'Próximos Eventos',
    events: [
      {
        id: 1,
        name: 'Encuentro Vecinal - Miraflores',
        date: '12 Dic 2024',
        time: '10:00 AM',
        location: 'Parque Kennedy',
        attendees: 45,
        description:
          'Reunión mensual para discutir mejoras en el distrito y compartir experiencias.',
      },
      {
        id: 2,
        name: 'Taller de Calificación Ciudadana',
        date: '18 Dic 2024',
        time: '4:00 PM',
        location: 'Centro Cultural de San Isidro',
        attendees: 32,
        description:
          'Aprende a usar la plataforma y contribuir con evaluaciones precisas de tu zona.',
      },
      {
        id: 3,
        name: 'Jornada de Arborización Comunitaria',
        date: '22 Dic 2024',
        time: '9:00 AM',
        location: 'Parque El Olivar',
        attendees: 78,
        description:
          'Plantación de árboles para mejorar la calidad del aire y reducir el ruido urbano.',
      },
    ],
  },
  ranking: {
    title: 'Calles Mejor Calificadas',
    streets: [
      {
        id: 1,
        name: 'Av. El Bosque',
        district: 'San Isidro',
        score: 9.2,
        category: 'Excelente',
        evaluations: 234,
      },
      {
        id: 2,
        name: 'Calle Los Pinos',
        district: 'Miraflores',
        score: 8.8,
        category: 'Excelente',
        evaluations: 189,
      },
      {
        id: 3,
        name: 'Jr. Libertad',
        district: 'Barranco',
        score: 8.5,
        category: 'Muy Bueno',
        evaluations: 156,
      },
      {
        id: 4,
        name: 'Av. Primavera',
        district: 'Surco',
        score: 8.3,
        category: 'Muy Bueno',
        evaluations: 201,
      },
      {
        id: 5,
        name: 'Calle Las Flores',
        district: 'San Borja',
        score: 8.1,
        category: 'Muy Bueno',
        evaluations: 143,
      },
    ],
  },
}

export function CommunityContent({
  current,
  onSelect,
}: Readonly<CommunityContentProps>) {
  const renderContent = () => {
    switch (current.id) {
      case 'blog':
        return (
          <div className="space-y-4">
            {CONTENT_DATA.blog.posts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )

      case 'foro':
        return (
          <div className="space-y-4">
            {CONTENT_DATA.foro.threads.map((thread) => (
              <article
                key={thread.id}
                className="cursor-pointer rounded-lg border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {thread.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {thread.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {thread.replies} respuestas
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {thread.views} vistas
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {thread.category}
                    </span>
                    <p className="mt-2 text-xs text-gray-500">
                      {thread.lastActivity}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )

      case 'testimonios':
        return (
          <div className="space-y-4">
            {CONTENT_DATA.testimonios.stories.map((story) => (
              <article
                key={story.id}
                className="rounded-lg border border-amber-100 bg-linear-to-br from-amber-50 to-white p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-200 text-xl font-bold text-amber-700">
                    {story.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {story.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <MapPin className="inline h-3 w-3" /> {story.district}
                    </p>
                    <blockquote className="mt-3 text-gray-700 italic">
                      "{story.quote}"
                    </blockquote>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-emerald-600">
                        {story.impact}
                      </span>
                      <span className="text-xs text-gray-500">
                        {story.date}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )

      case 'embajadores':
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTENT_DATA.embajadores.ambassadors.map((ambassador) => (
              <article
                key={ambassador.id}
                className="rounded-lg border border-violet-100 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-200 text-2xl font-bold text-violet-700">
                    {ambassador.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {ambassador.name}
                    </h3>
                    <p className="text-sm text-violet-600">{ambassador.role}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      <MapPin className="inline h-3 w-3" />{' '}
                      {ambassador.district}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  {ambassador.description}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  <strong>{ambassador.contributions}</strong> contribuciones
                </div>
              </article>
            ))}
          </div>
        )

      case 'eventos':
        return (
          <div className="space-y-4">
            {CONTENT_DATA.eventos.events.map((event) => (
              <article
                key={event.id}
                className="rounded-lg border border-rose-100 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                    <span className="text-2xl font-bold">
                      {event.date.split(' ')[0]}
                    </span>
                    <span className="text-xs">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.name}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-rose-500" />
                        {event.date} · {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        {event.location}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      {event.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {event.attendees} asistentes confirmados
                      </span>
                      <button className="cursor-pointer rounded-md bg-rose-600 px-3 py-1 text-xs text-white hover:bg-rose-700">
                        Asistir
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )

      case 'ranking':
        return (
          <div className="space-y-3">
            {CONTENT_DATA.ranking.streets.map((street, index) => (
              <article
                key={street.id}
                className="rounded-lg border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                      index === 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : index === 1
                          ? 'bg-gray-100 text-gray-700'
                          : index === 2
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-cyan-100 text-cyan-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {street.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <MapPin className="inline h-3 w-3" /> {street.district}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {street.score}
                    </div>
                    <p className="text-xs text-gray-500">
                      {street.evaluations} evaluaciones
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )

      default:
        return null
    }
  }

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

        <div className="mt-6">{renderContent()}</div>

        <section className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold">Explorar</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Accede a los distintos espacios dentro de la comunidad.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COMMUNITY_ITEMS.map((it: CommunityItem) => (
              <Link
                key={it.id}
                to="/comunidad"
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
