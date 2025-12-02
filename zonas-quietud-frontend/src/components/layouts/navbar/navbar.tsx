import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Search,
  MapPin,
  Star,
  Map,
  Info,
  ChevronDown,
  LayoutDashboard,
  Heart,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { TopBar } from './topBar'
import { MainNavbar } from './mainNavbar'
import { SearchDialog } from './searchDialog'
import { QuickAccessBar } from './quickAccessBar'
import { ContributionDialog } from '@/features/map/components/ContributionDialog'

interface NavbarProps {
  isAuthenticated?: boolean
  userName?: string
  userAvatar?: string
  notificationCount?: number
  showTopBar?: boolean
  showQuickAccess?: boolean
  onNavigate?: (page: string) => void
}

import { useAuthStore } from '@/store/authStore'

export function Navbar({
  showTopBar = true,
  showQuickAccess = true,
  onNavigate,
}: Readonly<NavbarProps>) {
  const { backendUser, firebaseUser, status, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false)
  const [contributionDefaultTab, setContributionDefaultTab] = useState<
    'evaluate' | 'report'
  >('evaluate')

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    navigate({ to: '/' })
  }

  // Mock data para distritos
  const distritos = [
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Surco',
    'La Molina',
    'San Borja',
    'Jesús María',
    'Lince',
  ]

  return (
    <>
      {/* Three-tier navbar - Sticky positioning for better UX */}
      <div className="bg-background z-50">
        {/* Top Bar - Only on desktop */}
        {showTopBar && (
          <div className="hidden lg:block">
            <TopBar />
          </div>
        )}

        {/* Main Navbar */}
        <MainNavbar
          isAuthenticated={status === 'authenticated'}
          userName={backendUser?.firstName || 'Usuario'}
          userEmail={backendUser?.email || 'usuario@email.com'}
          userAvatar={firebaseUser?.photoURL || undefined}
          notificationCount={0}
          onMenuClick={() => setMobileMenuOpen(true)}
          onSearchClick={() => setSearchDialogOpen(true)}
          onLogout={handleLogout}
        />

        {/* Quick Access Bar - Only on desktop */}
        {showQuickAccess && (
          <div className="hidden lg:block">
            <QuickAccessBar />
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <SearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <div className="flex flex-col gap-6 py-6">
            {/* Logo */}
            <div className="mb-4">
              <h2 className="text-primary">Zonas de Quietud</h2>
            </div>
            {/* Mobile Search */}
            <div className="relative">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar..."
                  className="pl-9"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            {/* Mobile Links */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  setSearchDialogOpen(true)
                  setMobileMenuOpen(false)
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              <Link to="/mapa" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  style={{ color: '#08A09C' }}
                >
                  <Map className="mr-2 h-4 w-4" />
                  Explorar Mapa
                </Button>
              </Link>{' '}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Distritos
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {distritos.map((distrito) => (
                    <DropdownMenuItem key={distrito}>
                      {distrito}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  onNavigate?.('como-funciona')
                  setMobileMenuOpen(false)
                }}
              >
                <Info className="mr-2 h-4 w-4" />
                Cómo Funciona
              </Button>
              <Link to="/planes" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Planes
                </Button>
              </Link>
            </div>{' '}
            {/* Mobile Action Buttons - Ya no se usan aquí, se usa el FAB */}
            {status === 'authenticated' && (
              <div className="flex flex-col gap-2 border-t pt-4">
                <p className="text-muted-foreground text-center text-xs">
                  Usa el botón flotante "+" para contribuir
                </p>
              </div>
            )}
            {/* Mobile User Menu */}
            {status === 'authenticated' ? (
              <div className="flex flex-col gap-2 border-t pt-4">
                <Link
                  to="/app/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Mi Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Mis Calificaciones
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Mis Zonas de Interés
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Mis Reportes
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ayuda
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t pt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Action Buttons (Mobile Only) */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3 lg:hidden">
        {/* Search Button - Always visible */}
        <Button
          size="lg"
          className="h-14 w-14 rounded-full p-0 shadow-lg"
          style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
          onClick={() => setSearchDialogOpen(true)}
        >
          <Search className="h-6 w-6" />
        </Button>

        {/* Contribute Button - Only when authenticated */}
        {status === 'authenticated' && (
          <Button
            size="lg"
            className="h-14 w-14 rounded-full p-0 shadow-lg hover:opacity-90"
            style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
            onClick={() => {
              setContributionDefaultTab('evaluate')
              setContributionDialogOpen(true)
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Contribution Dialog */}
      <ContributionDialog
        isOpen={contributionDialogOpen}
        onClose={() => setContributionDialogOpen(false)}
        defaultTab={contributionDefaultTab}
      />
    </>
  )
}
