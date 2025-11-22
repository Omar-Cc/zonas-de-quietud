import { useState } from "react";

export default function ConfiguracionPage() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [publicProfile, setPublicProfile] = useState(true);

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
			<div className="max-w-7xl mx-auto">
				<header className="flex items-center gap-4 mb-8">
					<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-lg">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.597 1.02c.82-.63 2.04.136 1.822 1.114a1.724 1.724 0 001.02 2.597c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-1.02 2.597c.218.978-.999 1.744-1.82 1.114a1.724 1.724 0 00-2.598 1.02c-.3.92-1.603.92-1.902 0a1.724 1.724 0 00-2.597-1.02c-.82.63-2.04-.136-1.822-1.114a1.724 1.724 0 00-1.02-2.597c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 001.02-2.597c-.218-.978.999-1.744 1.82-1.114a1.724 1.724 0 002.598-1.02z" />
						</svg>
					</div>
					<div>
						<h1 className="text-2xl font-semibold text-slate-800">Configuración</h1>
						<p className="text-sm text-slate-500">Ajusta tu experiencia y preferencias de la aplicación</p>
					</div>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Sidebar */}
					<aside className="lg:col-span-1 bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow">
						<nav className="space-y-3">
							<button className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50">
								<span className="inline-flex items-center justify-center w-9 h-9 bg-indigo-50 text-indigo-600 rounded-lg">⚙️</span>
								<span className="text-sm font-medium text-slate-700">General</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50">
								<span className="inline-flex items-center justify-center w-9 h-9 bg-amber-50 text-amber-600 rounded-lg">🔔</span>
								<span className="text-sm font-medium text-slate-700">Notificaciones</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50">
								<span className="inline-flex items-center justify-center w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg">🔒</span>
								<span className="text-sm font-medium text-slate-700">Privacidad</span>
							</button>
							<button className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50">
								<span className="inline-flex items-center justify-center w-9 h-9 bg-violet-50 text-violet-600 rounded-lg">🎨</span>
								<span className="text-sm font-medium text-slate-700">Apariencia</span>
							</button>
						</nav>

						<div className="mt-6 border-t pt-4">
							<h3 className="text-xs text-slate-500 uppercase tracking-wide">Cuenta</h3>
							<div className="mt-3 space-y-3">
								<div className="flex items-center justify-between">
									<div>
										<div className="text-sm font-medium text-slate-700">Perfil público</div>
										<div className="text-xs text-slate-400">Permite que otros vean tu perfil</div>
									</div>
									<label className="inline-flex relative items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
										<div className="w-11 h-6 bg-slate-200 peer-checked:bg-indigo-600 rounded-full peer-focus:ring-2 peer-focus:ring-indigo-300 transition-all" />
										<span className="ml-3 text-sm text-slate-600">{publicProfile ? 'Sí' : 'No'}</span>
									</label>
								</div>
							</div>
						</div>
					</aside>

					{/* Main content */}
					<main className="lg:col-span-3 space-y-6">
						<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white rounded-2xl p-6 shadow flex flex-col">
								<div className="flex items-center justify-between">
									<div>
										<h2 className="text-lg font-semibold text-slate-800">Notificaciones</h2>
										<p className="text-sm text-slate-500">Controla cómo y cuándo recibes alertas</p>
									</div>
								</div>

								<div className="mt-6 space-y-4">
									<label className="flex items-center justify-between">
										<div>
											<div className="text-sm font-medium text-slate-700">Correo electrónico</div>
											<div className="text-xs text-slate-400">Recibe resúmenes y alertas por email</div>
										</div>
										<input type="checkbox" className="w-5 h-5" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
									</label>

									<label className="flex items-center justify-between">
										<div>
											<div className="text-sm font-medium text-slate-700">Push</div>
											<div className="text-xs text-slate-400">Notificaciones en tu dispositivo</div>
										</div>
										<input type="checkbox" className="w-5 h-5" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
									</label>
								</div>

								<div className="mt-6 flex justify-end">
									<button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm shadow">Guardar cambios</button>
								</div>
							</div>

							<div className="bg-white rounded-2xl p-6 shadow flex flex-col">
								<div>
									<h2 className="text-lg font-semibold text-slate-800">Privacidad</h2>
									<p className="text-sm text-slate-500">Ajustes de visibilidad y datos</p>
								</div>

								<div className="mt-6 space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<div className="text-sm font-medium text-slate-700">Perfil público</div>
											<div className="text-xs text-slate-400">¿Tu actividad puede ser vista por otros?</div>
										</div>
										<label className="inline-flex relative items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
											<div className="w-11 h-6 bg-slate-200 peer-checked:bg-indigo-600 rounded-full transition-all" />
										</label>
									</div>

									<div>
										<div className="text-sm font-medium text-slate-700">Eliminar datos</div>
										<p className="text-xs text-slate-400">Solicita la eliminación de tus datos.</p>
										<div className="mt-3">
											<button className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600">Solicitar eliminación</button>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white rounded-2xl p-6 shadow">
								<h2 className="text-lg font-semibold text-slate-800">Apariencia</h2>
								<p className="text-sm text-slate-500">Personaliza el tema y la visualización</p>

								<div className="mt-6 space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<div className="text-sm font-medium text-slate-700">Modo oscuro</div>
											<div className="text-xs text-slate-400">Activa el tema oscuro en la interfaz</div>
										</div>
										<label className="inline-flex relative items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
											<div className="w-11 h-6 bg-slate-200 peer-checked:bg-indigo-600 rounded-full transition-all" />
										</label>
									</div>

									<div>
										<div className="text-sm font-medium text-slate-700">Tamaño de fuente</div>
										<div className="mt-2 flex items-center gap-3">
											<button className="px-3 py-1 rounded-md bg-slate-100 text-sm">A</button>
											<button className="px-3 py-1 rounded-md bg-slate-100 text-base">A</button>
											<button className="px-3 py-1 rounded-md bg-slate-100 text-lg">A</button>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
								<div>
									<h3 className="text-lg font-semibold text-rose-700">Consejos rápidos</h3>
									<p className="text-sm text-rose-600 mt-2">Optimiza tu experiencia habilitando notificaciones relevantes y manteniendo tu perfil seguro.</p>
								</div>
								<div className="mt-6 flex items-center gap-3">
									<button className="px-4 py-2 rounded-md bg-rose-600 text-white">Revisar seguridad</button>
									<button className="px-4 py-2 rounded-md bg-white text-rose-600 border">Ver ayuda</button>
								</div>
							</div>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}

