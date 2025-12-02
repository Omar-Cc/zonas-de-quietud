import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Heart,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('¡Gracias por suscribirte! ' + email)
    setEmail('')
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const navegacion = [
    { label: 'Explorar Mapa', href: '/mapa' },
    { label: 'Cómo Funciona', href: '/recursos?tab=Cómo%20Funciona' },
    { label: 'Planes y Precios', href: '/planes' },
    { label: 'Distritos de Lima', href: '#' },
    { label: 'Estadísticas Públicas', href: '/recursos?tab=Estadísticas' },
    { label: 'Blog', href: '/comunidad?tab=Blog' },
    { label: 'Comunidad', href: '/comunidad' },
  ]

  const recursos = [
    { label: 'Centro de Ayuda', href: '/recursos?tab=Centro%20de%20Ayuda' },
    { label: 'Preguntas Frecuentes (FAQ)', href: '/recursos?tab=FAQ' },
    {
      label: 'Guía de Calificación',
      href: '/recursos?tab=Guía%20de%20Calificación',
    },
    {
      label: 'Términos y Condiciones',
      href: '/recursos?tab=Términos%20y%20Condiciones',
    },
    {
      label: 'Política de Privacidad',
      href: '/recursos?tab=Política%20de%20Privacidad',
    },
    {
      label: 'Política de Cookies',
      href: '/recursos?tab=Política%20de%20Cookies',
    },
    {
      label: 'Código de Conducta',
      href: '/recursos?tab=Código%20de%20Conducta',
    },
    {
      label: 'API para Desarrolladores',
      href: '/recursos?tab=API%20para%20Desarrolladores',
    },
  ]

  const contacto = [
    { label: 'Contáctanos', href: '/contacto?reason=general' },
    { label: 'Reportar Problema Técnico', href: '/contacto?reason=technical' },
    { label: 'Para Empresas', href: '/contacto?reason=business' },
    { label: 'Trabaja con Nosotros', href: '/contacto?reason=jobs' },
    { label: 'Prensa y Medios', href: '/contacto?reason=press' },
  ]

  return (
    <footer className="border-border relative border-t bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          {/* Desktop Layout - 4 Columns */}
          <div className="hidden gap-12 lg:grid lg:grid-cols-4">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="text-primary h-6 w-6" />
                  <span className="text-foreground">Zonas de Quietud</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Una plataforma colaborativa para evaluar la calidad de vida
                  urbana en Lima
                </p>
                <p className="text-muted-foreground">
                  Ayudamos a los ciudadanos a tomar decisiones informadas sobre
                  dónde vivir, trabajar y transitar, mediante calificaciones
                  comunitarias y datos ambientales en tiempo real.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-muted hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-foreground mb-4">Navegar</h3>
              <ul className="space-y-3">
                {navegacion.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="text-foreground mb-4">Recursos</h3>
              <ul className="space-y-3">
                {recursos.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('/') ? (
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-foreground mb-4">Contacto</h3>
              <ul className="space-y-3">
                {contacto.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                <a
                  href="mailto:contacto@zonasquietud.pe"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>contacto@zonasquietud.pe</span>
                </a>
                <a
                  href="https://wa.me/51999999999"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+51 999 999 999</span>
                </a>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h4 className="text-foreground mb-2">Newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Tablet Layout - 2 Columns */}
          <div className="hidden gap-8 md:grid md:grid-cols-2 lg:hidden">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="text-primary h-6 w-6" />
                  <span className="text-foreground">Zonas de Quietud</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Una plataforma colaborativa para evaluar la calidad de vida
                  urbana en Lima
                </p>
                <p className="text-muted-foreground">
                  Ayudamos a los ciudadanos a tomar decisiones informadas sobre
                  dónde vivir, trabajar y transitar, mediante calificaciones
                  comunitarias y datos ambientales en tiempo real.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-muted hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-foreground mb-2">Newsletter</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Column 2: All Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-foreground mb-4">Navegar</h3>
                <ul className="space-y-3">
                  {navegacion.slice(0, 4).map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <h3 className="text-foreground mt-6 mb-4">Recursos</h3>
                <ul className="space-y-3">
                  {recursos.slice(0, 4).map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('/') ? (
                        <Link
                          to={item.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-foreground mb-4">Contacto</h3>
                <ul className="space-y-3">
                  {contacto.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:contacto@zonasquietud.pe"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>contacto@zonasquietud.pe</span>
                  </a>
                  <a
                    href="https://wa.me/51999999999"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+51 999 999 999</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Accordions */}
          <div className="space-y-6 md:hidden">
            {/* About Section - Always Expanded */}
            <div className="space-y-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="text-primary h-6 w-6" />
                <span className="text-foreground">Zonas de Quietud</span>
              </div>
              <p className="text-muted-foreground">
                Una plataforma colaborativa para evaluar la calidad de vida
                urbana en Lima
              </p>
              <p className="text-muted-foreground">
                Ayudamos a los ciudadanos a tomar decisiones informadas sobre
                dónde vivir, trabajar y transitar, mediante calificaciones
                comunitarias y datos ambientales en tiempo real.
              </p>

              {/* Social Media - Larger on Mobile */}
              <div className="flex justify-center gap-3 py-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-muted hover:bg-primary hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="navigation">
                <AccordionTrigger className="text-foreground">
                  Navegar
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {navegacion.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground block transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resources">
                <AccordionTrigger className="text-foreground">
                  Recursos
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {recursos.map((item) => (
                      <li key={item.label}>
                        {item.href.startsWith('/') ? (
                          <Link
                            to={item.href}
                            className="text-muted-foreground hover:text-foreground block transition-colors"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground block transition-colors"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger className="text-foreground">
                  Contacto
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {contacto.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground block transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-3">
                    <a
                      href="mailto:contacto@zonasquietud.pe"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>contacto@zonasquietud.pe</span>
                    </a>
                    <a
                      href="https://wa.me/51999999999"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+51 999 999 999</span>
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Newsletter - Mobile */}
            <div>
              <h4 className="text-foreground mb-2">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* Left - Copyright */}
            <div className="text-muted-foreground text-center lg:text-left">
              © 2025 Zonas de Quietud - Lima, Perú. Todos los derechos
              reservados.
            </div>

            {/* Center - Made with Love */}
            <div className="text-muted-foreground flex items-center gap-2">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>para mejorar nuestra ciudad</span>
            </div>

            {/* Right - Language Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="text-foreground hover:text-primary rounded px-2 py-1 transition-colors">
                  ES
                </button>
                <span className="text-muted-foreground">|</span>
                <button className="text-muted-foreground hover:text-foreground rounded px-2 py-1 transition-colors">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
