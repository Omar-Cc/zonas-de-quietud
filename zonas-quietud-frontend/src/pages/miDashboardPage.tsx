import { useState } from 'react'
import {
  Star,
  AlertTriangle,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Trophy,
  Target,
  Heart,
  Shield,
  Crown,
  Flame,
  Users,
  ThumbsUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { AchievementBadge } from '../components/achievementBadge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useUser } from '@/features/auth/hooks/useUser'

const formatJoinDate = (dateArray?: number[]): string => {
  if (!dateArray || dateArray.length < 3) return 'Fecha desconocida'
  const [year, month] = dateArray
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  return `${months[month - 1]} ${year}`
}

const getAvatarUrl = (user: any): string => {
  if (user?.avatarUrl) return user.avatarUrl
  if (user?.photoURL) return user.photoURL
  const seed = user?.email || user?.firstName || 'user'
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`
}

const getUserInitials = (user: any): string => {
  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U'
}

const getMembershipBadge = (membership?: string) => {
  switch (membership) {
    case 'PREMIUM':
      return {
        label: 'Premium',
        className: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      }
    case 'ENTERPRISE':
      return {
        label: 'Enterprise',
        className: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white',
      }
    default:
      return { label: 'Free', className: 'bg-gray-200 text-gray-700' }
  }
}

const staticData = {
  level: 12,
  xp: 3450,
  nextLevelXp: 4000,
  stats: {
    totalRatings: 45,
    totalReports: 12,
    helpfulVotes: 234,
    streakDays: 15,
  },
  recentContributions: [
    {
      id: 1,
      type: 'rating',
      street: 'Av. Arequipa',
      district: 'Miraflores',
      score: 8.5,
      date: 'Hace 2 días',
      likes: 12,
    },
    {
      id: 2,
      type: 'report',
      street: 'Calle Berlin',
      district: 'Miraflores',
      incidentType: 'Falta de Iluminación',
      date: 'Hace 5 días',
      status: 'resolved',
    },
    {
      id: 3,
      type: 'rating',
      street: 'Av. Pardo',
      district: 'San Isidro',
      score: 9.0,
      date: 'Hace 1 semana',
      likes: 8,
    },
    {
      id: 4,
      type: 'report',
      street: 'Av. Benavides',
      district: 'Surco',
      incidentType: 'Daño a Infraestructura',
      date: 'Hace 1 semana',
      status: 'pending',
    },
  ],
  achievements: [
    {
      icon: Star,
      title: 'Primera Calificación',
      description: 'Completaste tu primera evaluación',
      unlocked: true,
      rarity: 'common' as const,
    },
    {
      icon: Flame,
      title: 'Racha de Fuego',
      description: '15 días consecutivos contribuyendo',
      unlocked: true,
      rarity: 'rare' as const,
    },
    {
      icon: Trophy,
      title: 'Top Colaborador',
      description: 'Entre los 10 usuarios más activos del mes',
      unlocked: true,
      rarity: 'epic' as const,
    },
    {
      icon: Crown,
      title: 'Guardián Urbano',
      description: '100 contribuciones verificadas',
      unlocked: false,
      rarity: 'legendary' as const,
      progress: 57,
      total: 100,
    },
    {
      icon: Heart,
      title: 'Muy Útil',
      description: 'Recibe 200 votos de utilidad',
      unlocked: true,
      rarity: 'epic' as const,
    },
    {
      icon: Shield,
      title: 'Reportero de Elite',
      description: '10 reportes de incidentes verificados',
      unlocked: true,
      rarity: 'rare' as const,
    },
    {
      icon: Target,
      title: 'Calificador Experto',
      description: '50 calificaciones detalladas',
      unlocked: false,
      rarity: 'rare' as const,
      progress: 45,
      total: 50,
    },
    {
      icon: Users,
      title: 'Líder Comunitario',
      description: 'Invita a 5 usuarios que completen su primera evaluación',
      unlocked: false,
      rarity: 'epic' as const,
      progress: 2,
      total: 5,
    },
  ],
  activityData: [
    { month: 'Ene', ratings: 3, reports: 1 },
    { month: 'Feb', ratings: 5, reports: 2 },
    { month: 'Mar', ratings: 8, reports: 3 },
    { month: 'Abr', ratings: 12, reports: 2 },
    { month: 'May', ratings: 10, reports: 3 },
    { month: 'Jun', ratings: 7, reports: 1 },
  ],
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: user, isLoading } = useUser()

  const userData = {
    name: user ? `${user.firstName} ${user.lastName}` : 'Usuario',
    email: user?.email || '',
    avatar: getAvatarUrl(user),
    initials: getUserInitials(user),
    joinDate: formatJoinDate(user?.createdAt),
    membership: getMembershipBadge(user?.membership),
    loginCount: user?.loginCount || 0,
    isVerified: user?.isVerified || false,
    ...staticData,
  }

  const levelProgress = (userData.xp / userData.nextLevelXp) * 100
  const unlockedAchievements = userData.achievements.filter(
    (a) => a.unlocked
  ).length

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">
            Cargando datos del usuario...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Profile Card */}
            <Card className="relative lg:w-80">
              <div className="absolute top-3 right-3">
                <Badge
                  className={`${userData.membership.className} rounded-full px-2 py-1 text-xs sm:text-sm`}
                >
                  {userData.membership.label}
                </Badge>
              </div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="border-primary h-24 w-24 border-4">
                      {/*<AvatarImage src={userData.avatar} alt={userData.name} />*/}
                      <AvatarFallback>{userData.initials}</AvatarFallback>
                    </Avatar>
                    <div className="bg-primary absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white dark:border-gray-950">
                      <span className="text-primary-foreground">
                        {userData.level}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-foreground mb-1">{userData.name}</h2>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Miembro desde {userData.joinDate}
                  </p>

                  {/* Level Progress */}
                  <div className="mb-4 w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Nivel {userData.level}
                      </span>
                      <span className="text-muted-foreground">
                        Nivel {userData.level + 1}
                      </span>
                    </div>
                    <Progress value={levelProgress} className="h-3" />
                    <p className="text-muted-foreground text-center text-xs">
                      {userData.xp} / {userData.nextLevelXp} XP
                    </p>
                  </div>

                  <Separator className="my-4" />

                  {/* Quick Stats */}
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-muted-foreground text-sm">
                          Racha
                        </span>
                      </div>
                      <span className="text-foreground">
                        {userData.stats.streakDays} días
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="text-primary h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Logros
                        </span>
                      </div>
                      <span className="text-foreground">
                        {unlockedAchievements}/{userData.achievements.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground text-sm">
                          Votos Útiles
                        </span>
                      </div>
                      <span className="text-foreground">
                        {userData.stats.helpfulVotes}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="from-primary/5 to-primary/10 border-primary/20 bg-linear-to-br">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Star className="text-primary h-6 w-6" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-muted-foreground mb-1">
                    Total Calificaciones
                  </p>
                  <p className="text-foreground mb-2 text-4xl">
                    {userData.stats.totalRatings}
                  </p>
                  <Badge
                    variant="secondary"
                    className="border-green-200 bg-green-100 text-green-700"
                  >
                    +12 este mes
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-orange-100 dark:border-orange-800 dark:from-orange-950/20 dark:to-orange-900/20">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-200 dark:bg-orange-900/40">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-muted-foreground mb-1">
                    Reportes Realizados
                  </p>
                  <p className="text-foreground mb-2 text-4xl">
                    {userData.stats.totalReports}
                  </p>
                  <Badge
                    variant="secondary"
                    className="border-orange-300 bg-orange-200 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                  >
                    +3 este mes
                  </Badge>
                </CardContent>
              </Card>

              {/* Activity Chart */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="text-primary h-5 w-5" />
                    Actividad Mensual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userData.activityData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-border"
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: 'currentColor' }}
                          className="text-muted-foreground"
                        />
                        <YAxis
                          tick={{ fill: 'currentColor' }}
                          className="text-muted-foreground"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Bar
                          dataKey="ratings"
                          fill="#14b8a6"
                          name="Calificaciones"
                        />
                        <Bar dataKey="reports" fill="#f97316" name="Reportes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="contributions">Mis Contribuciones</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {userData.recentContributions
                        .slice(0, 5)
                        .map((contrib) => (
                          <div
                            key={contrib.id}
                            className="bg-muted/50 flex items-start gap-3 rounded-lg p-3"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                contrib.type === 'rating'
                                  ? 'bg-primary/20'
                                  : 'bg-orange-100 dark:bg-orange-900/20'
                              }`}
                            >
                              {contrib.type === 'rating' ? (
                                <Star className="text-primary h-5 w-5" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex items-center gap-2">
                                <p className="text-foreground truncate">
                                  {contrib.street}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {contrib.district}
                                </Badge>
                              </div>
                              {contrib.type === 'rating' ? (
                                <div className="flex items-center gap-2">
                                  <Badge className="border-green-200 bg-green-100 text-green-700">
                                    {contrib.score}
                                  </Badge>
                                  <span className="text-muted-foreground text-xs">
                                    {contrib.likes} útiles
                                  </span>
                                </div>
                              ) : (
                                <Badge
                                  variant={
                                    contrib.status === 'resolved'
                                      ? 'default'
                                      : 'secondary'
                                  }
                                  className="text-xs"
                                >
                                  {contrib.incidentType}
                                </Badge>
                              )}
                              <p className="text-muted-foreground mt-1 text-xs">
                                {contrib.date}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Top Achievements Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Logros Destacados</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('achievements')}
                    >
                      Ver todos
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {userData.achievements
                      .filter((a) => a.unlocked)
                      .slice(0, 4)
                      .map((achievement, index) => (
                        <AchievementBadge key={index} {...achievement} />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contributions Tab */}
          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>Todas Mis Contribuciones</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {userData.recentContributions.map((contrib) => (
                      <div
                        key={contrib.id}
                        className="border-border hover:border-primary/50 rounded-lg border p-4 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                              contrib.type === 'rating'
                                ? 'bg-primary/20'
                                : 'bg-orange-100 dark:bg-orange-900/20'
                            }`}
                          >
                            {contrib.type === 'rating' ? (
                              <Star className="text-primary h-6 w-6" />
                            ) : (
                              <AlertTriangle className="h-6 w-6 text-orange-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <MapPin className="text-muted-foreground h-4 w-4" />
                              <h4 className="text-foreground">
                                {contrib.street}
                              </h4>
                              <Badge variant="outline">
                                {contrib.district}
                              </Badge>
                            </div>
                            {contrib.type === 'rating' ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <Badge className="border-green-200 bg-green-100 text-green-700">
                                    Calificación: {contrib.score}
                                  </Badge>
                                  <div className="text-muted-foreground flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{contrib.likes} votos útiles</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Badge variant="secondary">
                                  {contrib.incidentType}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-sm">
                                    Estado:
                                  </span>
                                  <Badge
                                    variant={
                                      contrib.status === 'resolved'
                                        ? 'default'
                                        : 'secondary'
                                    }
                                  >
                                    {contrib.status === 'resolved'
                                      ? 'Resuelto'
                                      : 'Pendiente'}
                                  </Badge>
                                </div>
                              </div>
                            )}
                            <div className="text-muted-foreground mt-2 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{contrib.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-primary h-6 w-6" />
                    <span>Logros e Insignias</span>
                  </div>
                  <Badge variant="secondary" className="text-base">
                    {unlockedAchievements}/{userData.achievements.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {userData.achievements.map((achievement, index) => (
                    <AchievementBadge key={index} {...achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
