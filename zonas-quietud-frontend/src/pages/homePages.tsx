import { MapPin, Search, LogOut, Layout, Calendar, Map, Star, CheckCircle } from 'lucide-react'
function HomePage() {
  return (
    <div className="hero" role="main">
      
      <main className="hero-inner">
        <h1 className="title">Encuentra tu Lugar Ideal en <span className="accent">Lima</span></h1>
        <p className="subtitle">Una plataforma colaborativa para evaluar la calidad de vida en espacios urbanos</p>

        <div className="search-card" role="search" aria-label="Buscar dirección">
          <div className="search-left" aria-hidden><MapPin size={18} /></div>
          <input className="search-input" placeholder="Busca una dirección en Lima..." aria-label="Buscar dirección en Lima" />
          <button className="search-button" aria-label="Buscar"><Search size={16} /></button>
        </div>

        <button className="cta">Explorar el Mapa</button>
      </main>

      {/* Características clave */}
      <section className="features" aria-labelledby="features-title">
        <div className="features-inner">
          <h2 id="features-title" className="features-title">Características Clave</h2>
          <p className="features-sub">Herramientas poderosas para tomar decisiones informadas</p>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                <Map style={{ color: 'var(--principal)' }} />
              </div>
              <h3>Mapas Interactivos</h3>
              <p className="feature-desc">Visualiza datos de calidad de vida con mapas de calor intuitivos</p>
              <div className="feature-media" aria-hidden>
                <div className="media-blob" />
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                <Star style={{ color: 'var(--principal)' }} />
              </div>
              <h3>Calificación Ciudadana</h3>
              <p className="feature-desc">Evaluaciones reales de residentes sobre su vecindario</p>
              <div className="feature-media rating-media" aria-hidden>
                <div className="rating-visual" />
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                <Map style={{ color: 'var(--principal)' }} />
              </div>
              <h3>Decisiones Informadas</h3>
              <p className="feature-desc">Análisis detallados para elegir tu próximo hogar</p>
              <div className="feature-media chart-media" aria-hidden>
                <div className="chart-visual" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Sección: ¿Cómo Funciona? */}
      <section className="how" aria-labelledby="how-title">
        <div className="features-inner">
          <h2 id="how-title" className="features-title">¿Cómo Funciona?</h2>
          <p className="features-sub">Tres pasos simples para comenzar</p>

          <div className="feature-grid">
            <article className="feature-card" style={{ border: '1px solid var(--principal)', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--principal)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>1</div>
                <div className="feature-icon" aria-hidden style={{ background: 'rgba(8,160,156,0.06)' }}>
                  <Map />
                </div>
              </div>
              <h3>Busca una Calle</h3>
              <p className="feature-desc">Ingresa la dirección que quieres evaluar en Lima y descubre información detallada</p>
            </article>

            <article className="feature-card" style={{ border: '1px solid rgba(8,160,156,0.06)', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--principal)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
                <div className="feature-icon" aria-hidden style={{ background: 'rgba(8,160,156,0.06)' }}>
                  <MapPin />
                </div>
              </div>
              <h3>Explora los Datos</h3>
              <p className="feature-desc">Revisa calificaciones, mapas de calor y opiniones de la comunidad</p>
            </article>

            <article className="feature-card" style={{ border: '1px solid var(--verdeBoton)', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--verdeBoton)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</div>
                <div className="feature-icon" aria-hidden style={{ background: 'rgba(76,175,80,0.06)' }}>
                  <Star />
                </div>
              </div>
              <h3>Aporta tu Calificación</h3>
              <p className="feature-desc">Comparte tu experiencia y ayuda a otros a tomar mejores decisiones</p>
            </article>
          </div>
        </div>
      </section>

      {/* Sección CTA: Listo para Descubrir tu Próximo Hogar */}
      <section className="cta-hero" aria-labelledby="cta-title">
        <div className="cta-inner">
          <div className="cta-icon" aria-hidden>
            <CheckCircle size={48} style={{ color: 'white' }} />
          </div>
          <h2 id="cta-title">Listo para Descubrir tu Próximo Hogar</h2>
          <p className="cta-sub">Únete a miles de limeños que ya están tomando decisiones informadas sobre dónde vivir</p>

          <button className="cta-button">Explorar el Mapa Ahora →</button>
          <p className="cta-note">No se requiere registro para comenzar</p>

          <div className="cta-stats">
            <div className="cta-stat">
              <div className="stat-num">10,000+</div>
              <div className="stat-label">Calles Evaluadas</div>
            </div>

            <div className="cta-stat">
              <div className="stat-num">25,000+</div>
              <div className="stat-label">Usuarios Activos</div>
            </div>

            <div className="cta-stat">
              <div className="stat-num">50,000+</div>
              <div className="stat-label">Evaluaciones</div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
export default HomePage