import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { NotificationFilters } from './NotificationFilters'
import { NotificationSummary } from './NotificationSummary'
import { NotificationList } from './NotificationList'
import { mockNotifications } from '../data/mockNotifications'

export function NotificationsView() {
  const [notifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((t) => t.unread).length

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-1">
          <div className="overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-sky-500 to-emerald-400 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">
                  Notificaciones
                </h1>
                <p className="mt-1 text-sm opacity-90">
                  Mantente al día con lo que importa en tu comunidad
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs opacity-90">No leídas</span>
                  <span className="text-3xl leading-none font-bold">
                    {unreadCount}
                  </span>
                </div>
                <div className="rounded-lg bg-white/20 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Button variant="ghost">Administrar notificaciones</Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <NotificationFilters />
            <NotificationSummary
              totalNotifications={notifications.length}
              unreadCount={unreadCount}
            />
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Últimas notificaciones</h2>
              <p className="text-muted-foreground text-sm">
                Revisa, responde o marca como leídas
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Buscar notificaciones..."
                className="bg-background rounded-md border px-4 py-2 text-sm shadow-sm"
              />
              <Button variant="secondary">Limpiar</Button>
            </div>
          </div>

          <NotificationList notifications={notifications} />
        </section>
      </div>
    </main>
  )
}
