import { Navbar } from "@/components/layouts/navbar/navbar";
import React, { useState } from "react";

type Option = {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
};

const OPTIONS: Option[] = [
	{
		id: "como-funciona",
		title: "Cómo Funciona",
		description:
			"Explicación clara y concisa de cómo usar la aplicación, pasos para reportar y cómo funciona el mapa de zonas de quietud.",
		icon: (
			<svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		id: "centro-ayuda",
		title: "Centro de Ayuda",
		description:
			"Recursos, guías y contacto para soporte. Encuentra respuestas y envía solicitudes de ayuda.",
		icon: (
			<svg className="w-5 h-5 text-cyan-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9.09 9a3 3 0 115.82 1c0 2-3 2.25-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		id: "faq",
		title: "FAQ",
		description: "Preguntas frecuentes sobre reportes, privacidad y uso del sitio.",
		icon: (
			<svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M9.09 9a3 3 0 115.82 1c0 2-3 2.25-3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		id: "guia-calificacion",
		title: "Guía de Calificación",
		description: "Cómo calificamos las zonas de quietud y criterios para cada rango.",
		icon: (
			<svg className="w-5 h-5 text-violet-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 20l-4-2V6l4-2 4 2v12l-4 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		id: "video-tutoriales",
		title: "Video Tutoriales",
		description: "Colección de videos cortos para aprender a usar las funciones principales.",
		icon: (
			<svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M22 12l-18 8V4l18 8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		id: "estadisticas",
		title: "Estadísticas",
		description: "Datos sobre reportes, evolución de zonas y métricas de participación.",
		icon: (
			<svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M7 13v5M12 8v10M17 4v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
];

export default function RecursosPage() {
	const [selected, setSelected] = useState<string>(OPTIONS[0].id);

	const current = OPTIONS.find((o) => o.id === selected) ?? OPTIONS[0];
/* 
	<Navbar isAuthenticated={true} userName="María García" notificationCount={3} />
 */
	return (
		<div className="min-h-screen bg-gray-50 py-8 px-6">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
				<aside className="md:col-span-1">
					<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
						<div className="px-6 py-4 bg-linear-to-r from-teal-50 to-white">
							<h3 className="text-lg font-semibold text-gray-800">Aprende y Explora</h3>
							<p className="mt-1 text-sm text-gray-500">Recursos para conocer mejor la plataforma</p>
						</div>

						<nav aria-label="Recursos" className="p-3">
							<ul className="space-y-2">
								{OPTIONS.map((opt) => {
									const active = opt.id === selected;
									return (
										<li key={opt.id}>
											<button
												onClick={() => setSelected(opt.id)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") setSelected(opt.id);
												}}
												aria-current={active ? "page" : undefined}
												className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300 ${
													active
														? "bg-teal-50 border border-teal-100 shadow-inner"
														: "hover:bg-gray-50"
												}`}
											>
												<span className="inline-flex items-center justify-center w-8 h-8 bg-white rounded-md">
													{opt.icon}
												</span>
												<div className="flex-1">
													<div className="flex items-center justify-between">
														<span className={`text-sm font-medium ${active ? "text-teal-700" : "text-gray-800"}`}>
															{opt.title}
														</span>
													</div>
													<p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
												</div>
											</button>
										</li>
									);
								})}
							</ul>
						</nav>
					</div>
				</aside>

				<main className="md:col-span-3">
					<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-2xl font-semibold text-gray-900">{current.title}</h2>
								<p className="mt-2 text-sm text-gray-600">{current.description}</p>
							</div>
							<div className="text-sm text-gray-400">Contenido informativo</div>
						</div>

						<section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
							<article className="p-4 bg-linear-to-br from-white to-gray-50 rounded-lg border border-gray-100">
								<h3 className="text-lg font-medium text-gray-800">Resumen</h3>
								<p className="mt-2 text-sm text-gray-600">Aquí puedes añadir un resumen más completo sobre "{current.title}". Esta sección es informativa y puede contener pasos, imágenes o enlaces a videos.</p>

								<ul className="mt-4 space-y-2">
									<li className="text-sm text-gray-700">• Punto clave 1 relacionado con la sección.</li>
									<li className="text-sm text-gray-700">• Punto clave 2 y recomendaciones prácticas.</li>
									<li className="text-sm text-gray-700">• Enlaces útiles y recursos adicionales.</li>
								</ul>
							</article>

							<aside className="p-4 rounded-lg border border-gray-100 bg-white">
								<h4 className="text-sm font-semibold text-gray-800">Consejos rápidos</h4>
								<p className="mt-2 text-sm text-gray-600">Pequeños tips y recomendaciones para interactuar con la plataforma y sacar el máximo provecho.</p>

								<div className="mt-4 flex flex-col gap-2">
									<div className="flex items-center gap-3 text-sm text-gray-700">
										<span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">i</span>
										Usa la búsqueda para encontrar guías rápidamente.
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-700">
										<span className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">➜</span>
										Comparte recursos con tu comunidad.
									</div>
								</div>
							</aside>
						</section>

						<footer className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
							Esta página es informativa; los enlaces pueden abrir más recursos o reproducir contenido multimedia.
						</footer>
					</div>
				</main>
			</div>
		</div>
	);
}
