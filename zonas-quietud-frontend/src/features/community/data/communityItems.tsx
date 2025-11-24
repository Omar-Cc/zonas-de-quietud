import {
  Newspaper,
  Users,
  Star,
  Award,
  Calendar,
  TrendingUp,
} from 'lucide-react'

export type CommunityItem = {
  id: string
  label: string
  desc: string
  icon: React.ReactNode
}

export const COMMUNITY_ITEMS: CommunityItem[] = [
  {
    id: 'blog',
    label: 'Blog',
    desc: 'Artículos, novedades y publicaciones de interés comunitario.',
    icon: <Newspaper className="h-5 w-5 text-sky-500" />,
  },
  {
    id: 'foro',
    label: 'Foro de Discusión',
    desc: 'Participa en debates y comparte experiencias con otros usuarios.',
    icon: <Users className="h-5 w-5 text-emerald-500" />,
  },
  {
    id: 'testimonios',
    label: 'Testimonios',
    desc: 'Historias de vecinos y embajadores que mejoraron sus barrios.',
    icon: <Star className="h-5 w-5 text-amber-400" />,
  },
  {
    id: 'embajadores',
    label: 'Embajadores',
    desc: 'Conoce a las personas que promueven zonas de quietud en sus distritos.',
    icon: <Award className="h-5 w-5 text-violet-500" />,
  },
  {
    id: 'eventos',
    label: 'Eventos',
    desc: 'Encuentros, talleres y jornadas comunitarias cercanas a ti.',
    icon: <Calendar className="h-5 w-5 text-rose-500" />,
  },
  {
    id: 'ranking',
    label: 'Ranking de Calles',
    desc: 'Listado y mapas con las calles mejor calificadas por la comunidad.',
    icon: <TrendingUp className="h-5 w-5 text-cyan-600" />,
  },
]
