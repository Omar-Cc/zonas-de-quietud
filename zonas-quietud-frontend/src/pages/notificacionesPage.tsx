import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Notification = {
	id: string
	title: string
	message: string
	time: string
	unread?: boolean
	avatar?: string
}

const mockNotifications: Notification[] = [
	{
		id: "1",
		title: "Nueva incidencia reportada",
		message: "María ha reportado ruido excesivo en Calle Olmo.",
		time: "Hace 2h",
		unread: true,
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80&auto=format&fit=crop",
	},
	{
		id: "2",
		title: "Actualización de estado",
		message: "Tu reporte fue marcado como 'En revisión'.",
		time: "Ayer",
		unread: false,
	},
	{
		id: "3",
		title: "Evento comunitario",
		message: "Reunión vecinal el próximo martes en la plaza.",
		time: "Hace 3d",
		unread: false,
	},
]

function NotificationItem({ n }: { n: Notification }) {
	return (
		<Card className={cn("flex items-center gap-4 p-4 transition-transform hover:scale-[1.01]", n.unread ? "ring-2 ring-primary/20 border-primary/10" : "")}>
			<div className="flex items-start gap-3 w-full">
				<Avatar>
					{n.avatar ? <AvatarImage src={n.avatar} /> : <AvatarFallback>{n.title.charAt(0)}</AvatarFallback>}
				</Avatar>

				<div className="flex flex-col w-full">
					<div className="flex items-center justify-between gap-2">
						<div>
							<h3 className="font-semibold">{n.title}</h3>
							<p className="text-sm text-muted-foreground">{n.message}</p>
						</div>

						<div className="flex items-center gap-2">
							<span className="text-xs text-muted-foreground">{n.time}</span>
							{n.unread && <Badge className="bg-rose-500/90">Nuevo</Badge>}
						</div>
					</div>

					<div className="mt-3 flex items-center gap-2">
						<Button variant="outline" size="sm">Marcar leído</Button>
						<Button variant="ghost" size="sm">Ver</Button>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default function NotificacionesPage() {
	const [notifications] = React.useState<Notification[]>(mockNotifications)

	const unreadCount = notifications.filter((t) => t.unread).length

	return (
		<main className="p-6 md:p-10">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
				<section className="lg:col-span-1">
					  <div className="rounded-2xl bg-linear-to-br from-indigo-600 via-sky-500 to-emerald-400 p-6 text-white shadow-lg overflow-hidden">
						<div className="flex items-center justify-between gap-4">
							<div>
								<h1 className="text-2xl font-extrabold tracking-tight">Notificaciones</h1>
								<p className="mt-1 text-sm opacity-90">Mantente al día con lo que importa en tu comunidad</p>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex flex-col items-end">
									<span className="text-xs opacity-90">No leídas</span>
									<span className="text-3xl font-bold leading-none">{unreadCount}</span>
								</div>
								<div className="bg-white/20 p-2 rounded-lg">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
									</svg>
								</div>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 gap-3">
							<Button variant="ghost">Administrar notificaciones</Button>
						</div>
					</div>

					<div className="mt-6 space-y-4">
						<Card className="p-4">
							<CardHeader>
								<CardTitle>Filtrar</CardTitle>
								<CardDescription>Mostrar solo notificaciones importantes o no leídas.</CardDescription>
							</CardHeader>

							<CardContent className="mt-1">
								<div className="flex flex-col gap-2">
									<Button variant="outline" size="sm">No leídas</Button>
									<Button variant="outline" size="sm">Incidencias</Button>
									<Button variant="outline" size="sm">Comunidad</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="p-4 bg-linear-to-tr from-white/60 to-white/20">
							<CardHeader>
								<CardTitle>Resumen semanal</CardTitle>
								<CardDescription>Resumen rápido de actividad reciente</CardDescription>
							</CardHeader>

							<CardContent className="mt-2">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm">Reportes</p>
										<p className="text-lg font-semibold">{notifications.length}</p>
									</div>
									<div>
										<p className="text-sm">Pendientes</p>
										<p className="text-lg font-semibold">{unreadCount}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				<section className="lg:col-span-2">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-lg font-bold">Últimas notificaciones</h2>
							<p className="text-sm text-muted-foreground">Revisa, responde o marca como leídas</p>
						</div>

						<div className="flex items-center gap-3">
							<input placeholder="Buscar notificaciones..." className="px-4 py-2 rounded-md border bg-background text-sm shadow-sm" />
							<Button variant="secondary">Limpiar</Button>
						</div>
					</div>

					<div className="space-y-3">
						{notifications.map((n) => (
							<NotificationItem key={n.id} n={n} />
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

