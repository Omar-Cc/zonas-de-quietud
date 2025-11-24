import {
  Search,
  MapPin,
  TrendingUp,
  Map,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { MapVisualization } from '../features/map/components/mapVisualization'
import { HeatmapVisualization } from '../components/heatmapVisualization'
import { RatingVisualization } from '../components/ratingVisualization'
import { ChartVisualization } from '../components/chartVisualization'

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: '#F8F9FA' }}
    >
      {/* Background image with overlay - fixed */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1648108759484-f1e17cc249cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaW1hJTIwUGVydSUyMHVyYmFuJTIwY2l0eXxlbnwxfHx8fDE3NjA2MzgxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="h-full w-full object-cover opacity-50 blur-sm"
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-white/95 via-white/90"
          style={{
            background:
              'linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(110, 235, 131, 0.1) 100%)',
          }}
        />
      </div>

      {/* Map visualization overlay - fixed */}
      <div className="fixed inset-0 z-0">
        <MapVisualization />
      </div>

      {/* Main content - scrollable */}
      <div className="relative z-10">
        {/* 1. HERO SECTION */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
          <div className="mx-auto w-full max-w-5xl space-y-12">
            {/* Hero content */}
            <div className="space-y-6 text-center">
              <h1
                className="text-5xl tracking-tight md:text-7xl"
                style={{ color: '#212529' }}
              >
                Encuentra tu Lugar Ideal en{' '}
                <span style={{ color: '#08A09C' }}>Lima</span>
              </h1>
              <p
                className="mx-auto max-w-3xl text-xl md:text-2xl"
                style={{ color: '#6c757d' }}
              >
                Una plataforma colaborativa para evaluar la calidad de vida en
                espacios urbanos
              </p>
            </div>

            {/* Search bar */}
            <div className="mx-auto max-w-3xl">
              <div
                className="rounded-2xl bg-white p-3 shadow-2xl"
                style={{ borderWidth: '2px', borderColor: '#6EEB83' }}
              >
                <div className="flex gap-3">
                  <div
                    className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3"
                    style={{ backgroundColor: '#F8F9FA' }}
                  >
                    <MapPin
                      className="h-6 w-6 flex-shrink-0"
                      style={{ color: '#08A09C' }}
                    />
                    <Input
                      type="text"
                      placeholder="Busca una dirección en Lima..."
                      className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="rounded-xl px-8 hover:opacity-90"
                    style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Button - Modified to navigate to map */}
            <div className="flex justify-center">
              <Link to="/mapa">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-xl px-12 py-6 shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
                  style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
                >
                  Explorar el Mapa
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section className="relative px-4 py-24">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-4xl md:text-5xl"
                style={{ color: '#212529' }}
              >
                Características Clave
              </h2>
              <p className="text-xl" style={{ color: '#6c757d' }}>
                Herramientas poderosas para tomar decisiones informadas
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1: Interactive Maps */}
              <Link to="/mapa">
                <div
                  className="cursor-pointer rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
                  style={{ borderWidth: '1px', borderColor: '#6EEB83' }}
                >
                  <div className="mb-6">
                    <div
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}
                    >
                      <Map className="h-7 w-7" style={{ color: '#08A09C' }} />
                    </div>
                    <h3 className="mb-2" style={{ color: '#212529' }}>
                      Mapas Interactivos
                    </h3>
                    <p className="mb-6" style={{ color: '#6c757d' }}>
                      Visualiza datos de calidad de vida con mapas de calor
                      intuitivos
                    </p>
                  </div>
                  <HeatmapVisualization />
                </div>
              </Link>

              {/* Feature 2: Citizen Rating */}
              <div
                className="rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
                style={{ borderWidth: '1px', borderColor: '#6EEB83' }}
              >
                <div className="mb-6">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)' }}
                  >
                    <Star className="h-7 w-7" style={{ color: '#4CAF50' }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#212529' }}>
                    Calificación Ciudadana
                  </h3>
                  <p className="mb-6" style={{ color: '#6c757d' }}>
                    Evaluaciones reales de residentes sobre su vecindario
                  </p>
                </div>
                <RatingVisualization />
              </div>

              {/* Feature 3: Data-Driven Decisions */}
              <div
                className="rounded-2xl bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
                style={{ borderWidth: '1px', borderColor: '#6EEB83' }}
              >
                <div className="mb-6">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}
                  >
                    <TrendingUp
                      className="h-7 w-7"
                      style={{ color: '#007BFF' }}
                    />
                  </div>
                  <h3 className="mb-2" style={{ color: '#212529' }}>
                    Decisiones Informadas
                  </h3>
                  <p className="mb-6" style={{ color: '#6c757d' }}>
                    Análisis detallados para elegir tu próximo hogar
                  </p>
                </div>
                <ChartVisualization />
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS SECTION */}
        <section className="relative px-4 py-24">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(to bottom, rgba(110, 235, 131, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)',
            }}
          />
          <div className="relative mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2
                className="mb-4 text-4xl md:text-5xl"
                style={{ color: '#212529' }}
              >
                ¿Cómo Funciona?
              </h2>
              <p className="text-xl" style={{ color: '#6c757d' }}>
                Tres pasos simples para comenzar
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative">
                <div
                  className="h-full rounded-2xl bg-white p-8 shadow-lg"
                  style={{ borderWidth: '2px', borderColor: '#08A09C' }}
                >
                  <div className="absolute -top-6 left-8">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                      style={{ backgroundColor: '#08A09C' }}
                    >
                      <span className="text-white">1</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}
                    >
                      <Search
                        className="h-8 w-8"
                        style={{ color: '#08A09C' }}
                      />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Busca una Calle
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Ingresa la dirección que quieres evaluar en Lima y
                      descubre información detallada
                    </p>
                  </div>
                </div>
                {/* Arrow connector */}
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform md:block">
                  <ArrowRight
                    className="h-8 w-8"
                    style={{ color: '#6EEB83' }}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div
                  className="h-full rounded-2xl bg-white p-8 shadow-lg"
                  style={{ borderWidth: '2px', borderColor: '#08A09C' }}
                >
                  <div className="absolute -top-6 left-8">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                      style={{ backgroundColor: '#08A09C' }}
                    >
                      <span className="text-white">2</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}
                    >
                      <Map className="h-8 w-8" style={{ color: '#08A09C' }} />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Explora los Datos
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Revisa calificaciones, mapas de calor y opiniones de la
                      comunidad
                    </p>
                  </div>
                </div>
                {/* Arrow connector */}
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform md:block">
                  <ArrowRight
                    className="h-8 w-8"
                    style={{ color: '#6EEB83' }}
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div
                  className="h-full rounded-2xl bg-white p-8 shadow-lg"
                  style={{ borderWidth: '2px', borderColor: '#4CAF50' }}
                >
                  <div className="absolute -top-6 left-8">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                      style={{ backgroundColor: '#4CAF50' }}
                    >
                      <span className="text-white">3</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)' }}
                    >
                      <Star className="h-8 w-8" style={{ color: '#4CAF50' }} />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Aporta tu Calificación
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Comparte tu experiencia y ayuda a otros a tomar mejores
                      decisiones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA SECTION */}
        <section className="relative px-4 py-32">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(135deg, rgba(8, 160, 156, 0.9) 0%, rgba(76, 175, 80, 0.9) 100%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <CheckCircle className="mx-auto mb-6 h-20 w-20 text-white" />
              <h2 className="mb-6 text-4xl text-white md:text-6xl">
                Listo para Descubrir tu Próximo Hogar
              </h2>
              <p className="mb-12 text-xl text-white/90 md:text-2xl">
                Únete a miles de limeños que ya están tomando decisiones
                informadas sobre dónde vivir
              </p>
            </div>

            <div className="space-y-6">
              <Link to="/mapa">
                <Button
                  size="lg"
                  className="rounded-2xl px-16 py-8 shadow-2xl transition-all hover:opacity-90"
                  style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
                >
                  <span className="mr-3">Explorar el Mapa Ahora</span>
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>

              <p className="text-white/90">
                No se requiere registro para comenzar
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-1 text-white">10,000+</div>
                <p className="text-white/90">Calles Evaluadas</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-1 text-white">25,000+</div>
                <p className="text-white/90">Usuarios Activos</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-1 text-white">50,000+</div>
                <p className="text-white/90">Evaluaciones</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
