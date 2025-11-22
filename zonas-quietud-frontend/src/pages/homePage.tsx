import { Search, MapPin, TrendingUp, Map, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapVisualization } from "../components/mapVisualization";
import { HeatmapVisualization } from "../components/heatmapVisualization";
import { RatingVisualization } from "../components/ratingVisualization";
import { ChartVisualization } from "../components/chartVisualization";
import { Navbar } from "../components/layouts/navbar/navbar";
import { useState } from "react";


export default function HomePage() {
  // Estado para simular autenticación - cambiar a true para ver el navbar autenticado
  const [isAuthenticated] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        userName="María García"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
        notificationCount={3}
        showTopBar={true}
        showQuickAccess={true}
      />

      {/* Spacer para el navbar fixed (TopBar + MainNavbar + QuickAccessBar) */}
      <div className="h-[148px] lg:h-[148px]" />

      {/* Background image with overlay - fixed */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1648108759484-f1e17cc249cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaW1hJTIwUGVydSUyMHVyYmFuJTIwY2l0eXxlbnwxfHx8fDE3NjA2MzgxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover blur-sm opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90" style={{ background: 'linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(110, 235, 131, 0.1) 100%)' }} />
      </div>

      {/* Map visualization overlay - fixed */}
      <div className="fixed inset-0 z-0">
        <MapVisualization />
      </div>

      {/* Main content - scrollable */}
      <div className="relative z-10">
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <div className="max-w-5xl w-full mx-auto space-y-12">
            {/* Hero content */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl tracking-tight" style={{ color: '#212529' }}>
                Encuentra tu Lugar Ideal en{" "}
                <span style={{ color: '#08A09C' }}>Lima</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#6c757d' }}>
                Una plataforma colaborativa para evaluar la calidad de vida en espacios urbanos
              </p>
            </div>

            {/* Search bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-3" style={{ borderWidth: '2px', borderColor: '#6EEB83' }}>
                <div className="flex gap-3">
                  <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: '#F8F9FA' }}>
                    <MapPin className="w-6 h-6 flex-shrink-0" style={{ color: '#08A09C' }} />
                    <Input
                      type="text"
                      placeholder="Busca una dirección en Lima..."
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="px-8 rounded-xl hover:opacity-90"
                    style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Button - Modified to navigate to map */}
            <div className="flex justify-center">
              <Link to="/app/mapa">
                <Button
                  size="lg"
                  className="px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:opacity-90"
                  style={{ backgroundColor: '#08A09C', color: '#FFFFFF' }}
                >
                  Explorar el Mapa
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section className="relative py-24 px-4">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#212529' }}>
                Características Clave
              </h2>
              <p className="text-xl" style={{ color: '#6c757d' }}>
                Herramientas poderosas para tomar decisiones informadas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: Interactive Maps */}
              <Link to="/app/mapa">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  style={{ borderWidth: '1px', borderColor: '#6EEB83' }}>
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}>
                    <Map className="w-7 h-7" style={{ color: '#08A09C' }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#212529' }}>
                    Mapas Interactivos
                  </h3>
                  <p className="mb-6" style={{ color: '#6c757d' }}>
                    Visualiza datos de calidad de vida con mapas de calor intuitivos
                  </p>
                  </div>
                  <HeatmapVisualization />
                </div>
              </Link>

              {/* Feature 2: Citizen Rating */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                style={{ borderWidth: '1px', borderColor: '#6EEB83' }}>
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)' }}>
                    <Star className="w-7 h-7" style={{ color: '#4CAF50' }} />
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
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                style={{ borderWidth: '1px', borderColor: '#6EEB83' }}>
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
                    <TrendingUp className="w-7 h-7" style={{ color: '#007BFF' }} />
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
        <section className="relative py-24 px-4">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'linear-gradient(to bottom, rgba(110, 235, 131, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)' }} />
          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#212529' }}>
                ¿Cómo Funciona?
              </h2>
              <p className="text-xl" style={{ color: '#6c757d' }}>
                Tres pasos simples para comenzar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full" style={{ borderWidth: '2px', borderColor: '#08A09C' }}>
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#08A09C' }}>
                      <span className="text-white">1</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}>
                      <Search className="w-8 h-8" style={{ color: '#08A09C' }} />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Busca una Calle
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Ingresa la dirección que quieres evaluar en Lima y descubre información detallada
                    </p>
                  </div>
                </div>
                {/* Arrow connector */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8" style={{ color: '#6EEB83' }} />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full" style={{ borderWidth: '2px', borderColor: '#08A09C' }}>
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#08A09C' }}>
                      <span className="text-white">2</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(110, 235, 131, 0.2)' }}>
                      <Map className="w-8 h-8" style={{ color: '#08A09C' }} />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Explora los Datos
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Revisa calificaciones, mapas de calor y opiniones de la comunidad
                    </p>
                  </div>
                </div>
                {/* Arrow connector */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8" style={{ color: '#6EEB83' }} />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full" style={{ borderWidth: '2px', borderColor: '#4CAF50' }}>
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#4CAF50' }}>
                      <span className="text-white">3</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)' }}>
                      <Star className="w-8 h-8" style={{ color: '#4CAF50' }} />
                    </div>
                    <h3 className="mb-3" style={{ color: '#212529' }}>
                      Aporta tu Calificación
                    </h3>
                    <p style={{ color: '#6c757d' }}>
                      Comparte tu experiencia y ayuda a otros a tomar mejores decisiones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA SECTION */}
        <section className="relative py-32 px-4">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(8, 160, 156, 0.9) 0%, rgba(76, 175, 80, 0.9) 100%)' }} />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-6xl text-white mb-6">
                Listo para Descubrir tu Próximo Hogar
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12">
                Únete a miles de limeños que ya están tomando decisiones informadas sobre dónde vivir
              </p>
            </div>

            <div className="space-y-6">
              <Link to="/app/mapa">
                <Button
                  size="lg"
                  className="px-16 py-8 rounded-2xl shadow-2xl transition-all hover:opacity-90"
                  style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}
                >
                  <span className="mr-3">Explorar el Mapa Ahora</span>
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              
              <p className="text-white/90">
                No se requiere registro para comenzar
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-white mb-1">10,000+</div>
                <p className="text-white/90">Calles Evaluadas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-white mb-1">25,000+</div>
                <p className="text-white/90">Usuarios Activos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-white mb-1">50,000+</div>
                <p className="text-white/90">Evaluaciones</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
