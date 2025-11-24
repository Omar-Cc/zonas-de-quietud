import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  MapPin,
  Star,
  AlertTriangle,
  Bell,
  Menu,
  ChevronDown,
  LayoutDashboard,
  Heart,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Map,
  Info,
  Search,
  Video,
  MessageCircle,
  Award,
  Users,
  Calendar,
  Newspaper,
  TrendingUp,
  BarChart3,
  GraduationCap,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ContributionDialog } from '@/features/map/components/ContributionDialog'

interface MainNavbarProps {
  isAuthenticated?: boolean
  userName?: string
  userAvatar?: string
  notificationCount?: number
  onMenuClick?: () => void
  onSearchClick?: () => void
  onLogout?: () => void
}

export function MainNavbar({
  isAuthenticated = false,
  userName = 'Usuario',
  userAvatar,
  notificationCount = 0,
  onMenuClick,
  onSearchClick,
  onLogout,
}: MainNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false)
  const [contributionDefaultTab, setContributionDefaultTab] = useState<
    'evaluate' | 'report'
  >('evaluate')

  // Recursos dropdown items
  const recursosItems = [
    { icon: Info, label: 'Cómo Funciona', page: 'recursosPage' },
    { icon: HelpCircle, label: 'Centro de Ayuda', page: 'ayuda' },
    { icon: MessageCircle, label: 'FAQ', page: 'faq' },
    { icon: GraduationCap, label: 'Guía de Calificación', page: 'guia' },
    { icon: Video, label: 'Video Tutoriales', page: 'tutoriales' },
    { icon: BarChart3, label: 'Estadísticas', page: 'statistics' },
  ]

  // Comunidad dropdown items
  const comunidadItems = [
    { icon: Newspaper, label: 'Blog', page: 'blog' },
    { icon: Users, label: 'Foro de Discusión', page: 'foro' },
    { icon: Star, label: 'Testimonios', page: 'testimonios' },
    { icon: Award, label: 'Embajadores', page: 'embajadores' },
    { icon: Calendar, label: 'Eventos', page: 'eventos' },
    { icon: TrendingUp, label: 'Ranking de Calles', page: 'ranking' },
  ]

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20)
    })
  }

  return (
    <nav
      className={`border-border border-b bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <MapPin className="h-6 w-6" style={{ color: '#08A09C' }} />
            <span className="hidden md:block" style={{ color: '#08A09C' }}>
              Zonas de Quietud
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link to="/">
              <Button variant="ghost">Inicio</Button>
            </Link>

            <Link to="/mapa">
              <Button variant="ghost" style={{ color: '#08A09C' }}>
                <Map className="mr-2 h-4 w-4" />
                Explorar Mapa
              </Button>
            </Link>

            {/* Recursos Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Recursos
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Aprende y Explora</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recursosItems.map((item) => {
                  const Icon = item.icon
                  const to = `/app/recursos?tab=${encodeURIComponent(item.label)}`
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={to} className="flex items-center gap-2">
                        <Icon
                          className="mr-2 h-4 w-4"
                          style={{ color: '#08A09C' }}
                        />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Comunidad Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Comunidad
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Conecta con Otros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {comunidadItems.map((item) => {
                  const Icon = item.icon
                  const to = `/app/comunidad?tab=${encodeURIComponent(item.label)}`
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={to} className="flex items-center gap-2">
                        <Icon
                          className="mr-2 h-4 w-4"
                          style={{ color: '#007BFF' }}
                        />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/app/planes">
              <Button variant="ghost">Planes</Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Search Button (Desktop) */}
          <Button
            variant="ghost"
            className="hidden items-center gap-2 lg:flex"
            onClick={onSearchClick}
          >
            <Search className="h-4 w-4" style={{ color: '#08A09C' }} />
            <span
              className="hidden text-sm xl:inline"
              style={{ color: '#6c757d' }}
            >
              Buscar
            </span>
          </Button>

          {isAuthenticated ? (
            <>
              {/* Action Button (Desktop) - Contribuir Unificado */}
              <div className="hidden items-center gap-2 lg:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
                      className="hover:opacity-90"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Contribuir
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      ¿Cómo quieres contribuir?
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setContributionDefaultTab('evaluate')
                        setContributionDialogOpen(true)
                      }}
                      className="cursor-pointer"
                    >
                      <Star
                        className="mr-2 h-4 w-4"
                        style={{ color: '#08A09C' }}
                      />
                      <div>
                        <div className="font-medium">Evaluar Zona</div>
                        <div className="text-muted-foreground text-xs">
                          Califica los criterios de la calle
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setContributionDefaultTab('report')
                        setContributionDialogOpen(true)
                      }}
                      className="cursor-pointer"
                    >
                      <AlertTriangle
                        className="mr-2 h-4 w-4"
                        style={{ color: '#FF9800' }}
                      />
                      <div>
                        <div className="font-medium">Reportar Problema</div>
                        <div className="text-muted-foreground text-xs">
                          Alerta sobre un incidente urgente
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Link to="/app/notificaciones-2">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center p-0"
                      >
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>{userName}</p>
                      <p className="text-muted-foreground">usuario@email.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app/dashboard"
                      className="flex items-center gap-4"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Mi Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app/calificaciones"
                      className="flex items-center gap-4"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Mis Calificaciones
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app/zonas-interes"
                      className="flex items-center gap-4"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Mis Zonas de Interés
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app/reportes"
                      className="flex items-center gap-4"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Mis Reportes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app/configuracion"
                      className="flex items-center gap-4"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/app/ayuda" className="flex items-center gap-4">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Ayuda
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {/* Not Authenticated */}
              <Link to="/login">
                <Button variant="outline" className="hidden md:flex">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={contributionDialogOpen}
        onClose={() => setContributionDialogOpen(false)}
        defaultTab={contributionDefaultTab}
      />
    </nav>
  )
}
