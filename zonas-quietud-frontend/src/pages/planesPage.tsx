import { CheckCircle, CircleDashed, HelpCircle, ChevronDown } from 'lucide-react'

function PlanesPage() {
	return (
		<main className="hero">
			<div className="hero-inner">
				<h1 className="title">Elige el plan perfecto para ti</h1>
				<p className="subtitle">Comienza gratis y actualiza cuando estés listo. Sin contratos, sin sorpresas.</p>

				<div className="flex items-center gap-3 justify-center mb-4">
					<span className="text-muted font-semibold">Mensual</span>
					<div className="w-14 h-7 bg-[rgba(0,0,0,0.06)] rounded-full inline-flex items-center p-1">
						<div className="w-5 h-5 rounded-full bg-white ml-1" />
					</div>
					<span className="text-muted font-semibold">Anual</span>
					<span className="bg-principal text-white px-2 py-1 rounded-full text-[12px] ml-2">Ahorra 17%</span>
				</div>

				{/* Pricing grid */}
				<section className="feature-grid max-w-[1100px] w-full" aria-label="Planes">

					{/* Básico */}
					<article className="feature-card text-center">
						<h4 className="my-1.5 text-[rgba(0,35,35,0.8)] font-bold">Básico</h4>
						<p className="text-muted mt-0">Perfecto para comenzar a explorar</p>

						<div className="text-[48px] font-bold my-4">Gratis</div>
						<button className="float-btn ghost mx-auto">Comenzar Gratis</button>

						<h5 className="text-left font-bold mt-5">CARACTERÍSTICAS INCLUIDAS:</h5>
						<ul className="list-none p-0 m-0 text-left mt-3">
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Acceso al mapa interactivo</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Consulta de calificaciones</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />5 calificaciones por mes</li>
							<li className="flex items-center gap-2 text-muted line-through"><CircleDashed size={16} />Comentarios en calificaciones</li>
						</ul>
					</article>

					{/* Premium (popular) */}
					<article className="feature-card text-center border-2 border-[rgba(8,160,156,0.12)] shadow-lg relative">
						<div className="absolute -top-3 left-1/2 -translate-x-1/2">
							<div className="bg-[#ff7a18] text-white px-3 py-1.5 rounded-full font-bold text-[12px]">★ Más Popular</div>
						</div>

						<h4 className="mt-6 mb-1.5 text-[rgba(0,35,35,0.9)] font-bold">Premium</h4>
						<p className="text-muted mt-0">Para usuarios activos y comprometidos</p>

						<div className="text-[40px] font-bold my-4"><span className="text-[24px] font-medium text-muted">S/</span>29<span className="text-[16px] font-medium text-muted">/mes</span></div>
						<button className="float-btn mx-auto bg-principal text-white">Actualizar a Premium</button>

						<h5 className="text-left font-bold mt-5">CARACTERÍSTICAS INCLUIDAS:</h5>
						<ul className="list-none p-0 m-0 text-left mt-3">
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Todo lo del plan Básico</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Calificaciones ilimitadas</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Reportes de incidentes ilimitados</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Soporte prioritario</li>
						</ul>
					</article>

					{/* Empresas */}
					<article className="feature-card text-center">
						<h4 className="my-1.5 text-[rgba(0,35,35,0.8)] font-bold">Empresas</h4>
						<p className="text-muted mt-0">Soluciones a medida para organizaciones</p>

						<div className="text-[28px] font-bold my-4">Contactar</div>
						<button className="float-btn ghost mx-auto">Contactar Ventas</button>

						<h5 className="text-left font-bold mt-5">CARACTERÍSTICAS INCLUIDAS:</h5>
						<ul className="list-none p-0 m-0 text-left mt-3">
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Todo lo del plan Premium</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Usuarios ilimitados</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />API completa de desarrollador</li>
							<li className="flex items-center gap-2 text-muted mb-2.5"><CheckCircle size={18} color="var(--principal)" />Dashboard empresarial avanzado</li>
						</ul>
					</article>

				</section>

				{/* Comparación detallada */}
				<section className="feature-card w-full max-w-[1100px] mt-9 p-5">
					<h2 className="text-center my-2 text-[24px] text-[rgba(0,35,35,0.9)] font-semibold">Comparación Detallada</h2>
					<div className="overflow-x-auto">
						<table className="w-full border-separate table-auto">
							<thead>
								<tr>
									<th className="px-5 py-4 min-w-[220px] text-muted font-bold text-left">Característica</th>
									<th className="px-5 py-4 text-center font-bold">Básico</th>
									<th className="px-5 py-4 text-center font-bold bg-[rgba(8,160,156,0.04)]">
										Premium
										<div className="mt-1.5"><span className="bg-[#0b74ff] text-white px-2 py-1 rounded-full text-[12px] font-bold">Popular</span></div>
									</th>
									<th className="px-5 py-4 text-center font-bold">Empresas</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-t border-[rgba(0,0,0,0.06)]">
									<td className="px-5 py-4 text-muted">Calificaciones por mes</td>
									<td className="px-5 py-4 text-center">5</td>
									<td className="px-5 py-4 text-center">Ilimitadas</td>
									<td className="px-5 py-4 text-center">Ilimitadas</td>
								</tr>
								<tr className="border-t border-[rgba(0,0,0,0.06)]">
									<td className="px-5 py-4 text-muted">Reportes de incidentes</td>
									<td className="px-5 py-4 text-center"><span className="text-muted inline-block"><CircleDashed size={16} /></span></td>
									<td className="px-5 py-4 text-center"><CheckCircle size={18} color="var(--principal)" /></td>
									<td className="px-5 py-4 text-center"><CheckCircle size={18} color="var(--principal)" /></td>
								</tr>
								<tr className="border-t border-[rgba(0,0,0,0.06)]">
									<td className="px-5 py-4 text-muted">Dashboard personalizado</td>
									<td className="px-5 py-4 text-center"><span className="text-muted inline-block"><CircleDashed size={16} /></span></td>
									<td className="px-5 py-4 text-center"><CheckCircle size={18} color="var(--principal)" /></td>
									<td className="px-5 py-4 text-center">Avanzado</td>
								</tr>
								<tr className="border-t border-[rgba(0,0,0,0.06)]">
									<td className="px-5 py-4 text-muted">API de desarrollador</td>
									<td className="px-5 py-4 text-center"><span className="text-muted inline-block"><CircleDashed size={16} /></span></td>
									<td className="px-5 py-4 text-center"><span className="text-muted inline-block"><CircleDashed size={16} /></span></td>
									<td className="px-5 py-4 text-center"><CheckCircle size={18} color="var(--principal)" /></td>
								</tr>
								<tr className="border-t border-b border-[rgba(0,0,0,0.06)]">
									<td className="px-5 py-4 text-muted">Soporte</td>
									<td className="px-5 py-4 text-center">Email</td>
									<td className="px-5 py-4 text-center">Prioritario</td>
									<td className="px-5 py-4 text-center">Dedicado 24/7</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				{/* Beneficios rápidos debajo de la tabla */}
				<section className="w-full max-w-[1100px] mt-7">
					<div className="cta-stats flex gap-4 justify-center flex-wrap">
						<div className="cta-stat min-w-[200px] text-center">
							<div className="stat-num text-principal text-[22px] font-bold">14 días</div>
							<div className="stat-label">Prueba gratuita</div>
						</div>
						<div className="cta-stat min-w-[200px] text-center">
							<div className="stat-num text-principal text-[22px] font-bold">Sin compromiso</div>
							<div className="stat-label">Cancela cuando quieras</div>
						</div>
						<div className="cta-stat min-w-[200px] text-center">
							<div className="stat-num text-principal text-[22px] font-bold">Seguro</div>
							<div className="stat-label">Pago encriptado</div>
						</div>
						<div className="cta-stat min-w-[200px] text-center">
							<div className="stat-num text-principal text-[22px] font-bold">24/7</div>
							<div className="stat-label">Soporte disponible</div>
						</div>
					</div>
				</section>

				{/* Preguntas Frecuentes */}
				<section className="w-full mt-12">
					<div className="max-w-[850px] mx-auto px-4">
						<h2 className="text-center text-[28px] font-semibold mb-2">Preguntas Frecuentes</h2>
						<p className="text-center text-muted mb-6">¿Tienes dudas? Aquí están las respuestas más comunes</p>

						<div className="bg-transparent rounded-lg overflow-hidden">
							{/* Item 1 */}
							<button className="w-full flex items-center justify-between gap-4 py-4 px-4 border-t border-[rgba(0,0,0,0.06)] bg-white">
								<div className="flex items-center gap-4">
									<div className="w-9 h-9 rounded-full border-2 border-(--principal) text-(--principal) flex items-center justify-center">
										<HelpCircle size={16} />
									</div>
									<span className="font-semibold text-[15px] text-[rgba(0,35,35,0.9)]">¿Puedo cambiar de plan en cualquier momento?</span>
								</div>
								<ChevronDown size={18} className="text-muted" />
							</button>

							{/* Item 2 */}
							<button className="w-full flex items-center justify-between gap-4 py-4 px-4 border-t border-[rgba(0,0,0,0.06)] bg-white">
								<div className="flex items-center gap-4">
									<div className="w-9 h-9 rounded-full border-2 border-(--principal) text-(--principal) flex items-center justify-center">
										<HelpCircle size={16} />
									</div>
									<span className="font-semibold text-[15px] text-[rgba(0,35,35,0.9)]">¿Ofrecen descuentos para organizaciones sin fines de lucro?</span>
								</div>
								<ChevronDown size={18} className="text-muted" />
							</button>

							{/* Item 3 */}
							<button className="w-full flex items-center justify-between gap-4 py-4 px-4 border-t border-[rgba(0,0,0,0.06)] bg-white">
								<div className="flex items-center gap-4">
									<div className="w-9 h-9 rounded-full border-2 border-(--principal) text-(--principal) flex items-center justify-center">
										<HelpCircle size={16} />
									</div>
									<span className="font-semibold text-[15px] text-[rgba(0,35,35,0.9)]">¿Qué métodos de pago aceptan?</span>
								</div>
								<ChevronDown size={18} className="text-muted" />
							</button>

							{/* Item 4 */}
							<button className="w-full flex items-center justify-between gap-4 py-4 px-4 border-t border-[rgba(0,0,0,0.06)] bg-white">
								<div className="flex items-center gap-4">
									<div className="w-9 h-9 rounded-full border-2 border-(--principal) text-(--principal) flex items-center justify-center">
										<HelpCircle size={16} />
									</div>
									<span className="font-semibold text-[15px] text-[rgba(0,35,35,0.9)]">¿Hay período de prueba gratuito para Premium?</span>
								</div>
								<ChevronDown size={18} className="text-muted" />
							</button>

							{/* Item 5 */}
							<button className="w-full flex items-center justify-between gap-4 py-4 px-4 border-t border-b border-[rgba(0,0,0,0.06)] bg-white">
								<div className="flex items-center gap-4">
									<div className="w-9 h-9 rounded-full border-2 border-(--principal) text-(--principal) flex items-center justify-center">
										<HelpCircle size={16} />
									</div>
									<span className="font-semibold text-[15px] text-[rgba(0,35,35,0.9)]">¿Puedo cancelar mi suscripción?</span>
								</div>
								<ChevronDown size={18} className="text-muted" />
							</button>
						</div>
					</div>
				</section>

        
				{/* CTA final - Listo para comenzar */}
				<section className="w-full mt-10">
					<div className="max-w-[1100px] mx-auto px-4">
						<div className="rounded-xl overflow-hidden shadow-lg">
							<div className="w-full rounded-xl p-8 md:p-12 text-center text-white bg-[linear-gradient(135deg,var(--principal),var(--verdeBoton))]">
								<h3 className="text-2xl md:text-3xl font-semibold">¿Listo para comenzar?</h3>
								<p className="mt-3 text-[15px] md:text-lg opacity-90">Únete a miles de usuarios que ya están mejorando su calidad de vida urbana</p>
								<div className="mt-6 flex items-center justify-center gap-4">
									<button className="px-5 py-3 bg-white text-(--principal) rounded-md font-semibold shadow">Comenzar Gratis</button>
									<button className="px-5 py-3 border border-white text-white rounded-md font-medium bg-transparent">Contactar Ventas</button>
								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		</main>
	)
}

export const planesPage = PlanesPage

export default PlanesPage
