import { useState, useEffect } from 'react'
import { Outlet } from "@tanstack/react-router";
import HomePage from '@/pages/homePages'
import {
  MapPin,
  Search,
  Info,
  Phone,
  X,
  ChevronDown,
  Bell,
  ShieldCheck,
  Leaf,
  VolumeX,
  Star,
  Users,
  Map,
  Calendar,
  LogOut,
  Settings,
  Layout as LayoutIcon,
  Sparkle,
} from 'lucide-react'

export default function Layout() {
  const [showTopBar, setShowTopBar] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const onCloseTopBar = () => setShowTopBar(false)
  const toggleMobile = () => setMobileOpen((s) => !s)

  useEffect(() => {
    // lock body scroll when mobile drawer open
    if (typeof document !== 'undefined') {
      if (mobileOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className={mobileOpen ? 'drawer-open' : ''}>
      <div className="sticky-wrap">
        {showTopBar && (
          <div className="top-bar">
            <div className="topbar-text">
              🌱 Ayuda a mejorar Lima: Califica tu calle y gana insignias
              exclusivas
            </div>

            <div className="topbar-actions">
              <a className="topbar-link" href="#" aria-label="Ayuda">
                <Info size={14} /> <span>Ayuda</span>
              </a>
              <a className="topbar-link" href="#" aria-label="Contacto">
                <Phone size={14} /> <span>Contacto</span>
              </a>
              <button
                className="topbar-close"
                aria-label="Cerrar mensaje"
                onClick={onCloseTopBar}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <header className="nav" role="navigation">
          <div className="nav-left">
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
            >
            </button>

            <div className="brand">
              <MapPin style={{ color: 'var(--principal)' }} />
              <span className="brand-text">Zonas de Quietud</span>
            </div>

            <nav className="nav-links" aria-label="Menú principal">
              <a href="/" className="nav-link">Inicio</a>

              <a href="/mapa" className="nav-link nav-link-map" aria-label="Explorar mapa">
                <Map size={16} aria-hidden={true} />
                <span style={{ color: 'var(--principal)' }}>Explorar Mapa</span>
              </a>

              <a href="#" className="nav-link has-chevron" aria-haspopup="true" aria-expanded={false}>
                <span>Recursos</span>
                <ChevronDown size={12} aria-hidden={true} />
              </a>
              <a href="#" className="nav-link has-chevron" aria-haspopup="true" aria-expanded={false}>
                <span>Comunidad</span>
                <ChevronDown size={12} aria-hidden={true} />
              </a>
              <a href="#" className="nav-link">Planes</a>
            </nav>
          </div>

          <div className="nav-right">
            <a href="#" className="nav-link nav-search" role="search" aria-label="Buscar">
              <Search size={16} style={{ color: 'var(--principal)' }} />
              <span className="search-text">Buscar</span>
            </a>

            <button className="btn contrib">
              + Contribuir <ChevronDown size={14} />
            </button>

            <button className="icon-bell" title="Notificaciones" aria-label="Notificaciones" aria-live="polite">
              <Bell style={{ color: 'var(--principal)' }} size={18} className="bell-icon" aria-hidden={true} />
              <span className="badge" aria-hidden={true}>3</span>
            </button>

            <div className="avatar">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                alt="Avatar de usuario"
                loading="lazy"
                width={36}
                height={36}
              />
            </div>
          </div>
        </header>

        {/* Mobile drawer (slide from left) */}
        <div className={`mobile-backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
        <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
          <div className="drawer-header">
            <div className="brand-drawer">
              <MapPin style={{ color: 'var(--principal)' }} />
              <span className="brand-text">Zonas de Quietud</span>
            </div>
            <button className="drawer-close" aria-label="Cerrar" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="drawer-search">
            <Search size={18} />
            <input placeholder="Buscar..." aria-label="Buscar" />
          </div>

          <nav className="drawer-nav">
            <a href="#" onClick={() => setMobileOpen(false)}><Search size={16} /> <span>Buscar</span></a>
            <a href="/mapa" onClick={() => setMobileOpen(false)}><MapPin size={16} /> <span>Explorar Mapa</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Map size={16} /> <span>Distritos</span> <ChevronDown size={14} className="chev" /></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Info size={16} /> <span>Cómo Funciona</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Calendar size={16} /> <span>Planes</span></a>
          </nav>

          <div className="drawer-note">Usa el botón flotante "+" para contribuir</div>

          <nav className="drawer-account">
            <a href="#" onClick={() => setMobileOpen(false)}><LayoutIcon size={16} /> <span>Mi Dashboard</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Star size={16} /> <span>Mis Calificaciones</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Users size={16} /> <span>Mis Zonas de Interés</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Settings size={16} /> <span>Configuración</span></a>
            <a href="#" onClick={() => setMobileOpen(false)}><Info size={16} /> <span>Ayuda</span></a>
            <a href="#" className="logout" onClick={() => setMobileOpen(false)}><LogOut size={16} /> <span>Cerrar Sesión</span></a>
          </nav>
        </aside>

        <div className="filter-bar" role="region" aria-label="Explorar por">
          <div className="filter-left">
            <div className="filter-label">Explorar por:</div>

            <div className="filter-items">
              <a href="#" className="filter-item">
                <ShieldCheck size={16} style={{ color: 'var(--verde2)' }} />
                <span>Alta Seguridad</span>
                <span className="filter-count light">1,245</span>
              </a>

              <a href="#" className="filter-item">
                <Sparkle size={16} style={{ color: 'var(--verde3)' }} />
                <span>Aire Limpio</span>
                <span className="filter-count greenish">892</span>
              </a>

              <a href="#" className="filter-item">
                <VolumeX size={16} style={{ color: 'var(--principal)' }} />
                <span>Bajo Ruido</span>
                <span className="filter-count normal">1,567</span>
              </a>

              <a href="#" className="filter-item">
                <Star size={16} style={{ color: 'var(--Azul)' }} />
                <span>Mejor Valoradas</span>
                <span className="filter-count blue">456</span>
              </a>

              <a href="#" className="filter-item">
                <Users size={16} style={{ color: 'var(--principal)' }} />
                <span>Más Evaluadas</span>
                <span className="filter-count light">2,103</span>
              </a>
            </div>
          </div>

          <div className="filter-right">
            <a href="#" className="all-cats">
              Ver todas las categorías
            </a>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="brand">
              <MapPin style={{ color: 'var(--principal)' }} />
              <span className="brand-text">Zonas de Quietud</span>
            </div>
            <p>Una plataforma colaborativa para evaluar la calidad de vida en espacios urbanos.</p>
          </div>

          <div className="footer-col">
            <nav className="footer-nav" aria-label="Enlaces de pie de página">
              <a href="/">Inicio</a>
              <a href="/mapa">Explorar Mapa</a>
              <a href="#">Recursos</a>
              <a href="#">Comunidad</a>
              <a href="#">Planes</a>
            </nav>
          </div>

          <div className="footer-col">
            <a href="#" className="footer-contact"><Phone size={14} /> Contacto</a>
            <a href="#" className="footer-help"><Info size={14} /> Ayuda</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Zonas de Quietud. Todos los derechos reservados.</span>
        </div>
      </footer>

    </div>
  )
}
