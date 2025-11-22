import { useState } from "react";
import {
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Heart,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Gracias por suscribirte! " + email);
    setEmail("");
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const navegacion = [
    { label: "Explorar Mapa", href: "#" },
    { label: "Cómo Funciona", href: "#" },
    { label: "Planes y Precios", href: "#" },
    { label: "Distritos de Lima", href: "#" },
    { label: "Estadísticas Públicas", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Comunidad", href: "#" },
  ];

  const recursos = [
    { label: "Centro de Ayuda", href: "#" },
    { label: "Preguntas Frecuentes (FAQ)", href: "#" },
    { label: "Guía de Calificación", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Política de Cookies", href: "#" },
    { label: "Código de Conducta", href: "#" },
    { label: "API para Desarrolladores", href: "#" },
  ];

  const contacto = [
    { label: "Contáctanos", href: "#" },
    { label: "Reportar Problema Técnico", href: "#" },
    { label: "Para Empresas", href: "#" },
    { label: "Trabaja con Nosotros", href: "#" },
    { label: "Prensa y Medios", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          {/* Desktop Layout - 4 Columns */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-12">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Zonas de Quietud</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Una plataforma colaborativa para evaluar la calidad de vida urbana en Lima
                </p>
                <p className="text-muted-foreground">
                  Ayudamos a los ciudadanos a tomar decisiones informadas sobre dónde vivir,
                  trabajar y transitar, mediante calificaciones comunitarias y datos ambientales
                  en tiempo real.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  >
                    <social.icon className="w-5 h-5" />
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
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contacto@zonasquietud.pe</span>
                </a>
                <a
                  href="https://wa.me/51999999999"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
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
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Tablet Layout - 2 Columns */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-8">
            {/* Column 1: About */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Zonas de Quietud</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Una plataforma colaborativa para evaluar la calidad de vida urbana en Lima
                </p>
                <p className="text-muted-foreground">
                  Ayudamos a los ciudadanos a tomar decisiones informadas sobre dónde vivir,
                  trabajar y transitar, mediante calificaciones comunitarias y datos ambientales
                  en tiempo real.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  >
                    <social.icon className="w-5 h-5" />
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
                    <Send className="w-4 h-4" />
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

                <h3 className="text-foreground mb-4 mt-6">Recursos</h3>
                <ul className="space-y-3">
                  {recursos.slice(0, 4).map((item) => (
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
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>contacto@zonasquietud.pe</span>
                  </a>
                  <a
                    href="https://wa.me/51999999999"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+51 999 999 999</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Accordions */}
          <div className="md:hidden space-y-6">
            {/* About Section - Always Expanded */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-foreground">Zonas de Quietud</span>
              </div>
              <p className="text-muted-foreground">
                Una plataforma colaborativa para evaluar la calidad de vida urbana en Lima
              </p>
              <p className="text-muted-foreground">
                Ayudamos a los ciudadanos a tomar decisiones informadas sobre dónde vivir,
                trabajar y transitar, mediante calificaciones comunitarias y datos ambientales en
                tiempo real.
              </p>

              {/* Social Media - Larger on Mobile */}
              <div className="flex gap-3 justify-center py-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                  >
                    <social.icon className="w-6 h-6" />
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
                          className="text-muted-foreground hover:text-foreground transition-colors block"
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
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground transition-colors block"
                        >
                          {item.label}
                        </a>
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
                          className="text-muted-foreground hover:text-foreground transition-colors block"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-3">
                    <a
                      href="mailto:contacto@zonasquietud.pe"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>contacto@zonasquietud.pe</span>
                    </a>
                    <a
                      href="https://wa.me/51999999999"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="w-4 h-4" />
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
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left - Copyright */}
            <div className="text-muted-foreground text-center lg:text-left">
              © 2024 Zonas de Quietud - Lima, Perú. Todos los derechos reservados.
            </div>

            {/* Center - Made with Love */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>para mejorar nuestra ciudad</span>
            </div>

            {/* Right - Language Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="text-foreground hover:text-primary transition-colors px-2 py-1 rounded">
                  ES
                </button>
                <span className="text-muted-foreground">|</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
