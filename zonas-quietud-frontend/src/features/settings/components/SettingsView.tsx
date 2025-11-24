import { useState } from 'react'
import { SettingsHeader } from './SettingsHeader'
import { SettingsSidebar } from './SettingsSidebar'
import { NotificationSettings } from './NotificationSettings'
import { PrivacySettings } from './PrivacySettings'
import { AppearanceSettings } from './AppearanceSettings'

export function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-7xl">
        <SettingsHeader
          title="Configuración"
          description="Ajusta tu experiencia y preferencias de la aplicación"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <SettingsSidebar
            publicProfile={publicProfile}
            onPublicProfileChange={setPublicProfile}
          />

          <main className="space-y-6 lg:col-span-3">
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <NotificationSettings
                emailNotifications={emailNotifications}
                pushNotifications={pushNotifications}
                onEmailChange={setEmailNotifications}
                onPushChange={setPushNotifications}
              />

              <PrivacySettings
                publicProfile={publicProfile}
                onPublicProfileChange={setPublicProfile}
              />
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AppearanceSettings
                darkMode={darkMode}
                onDarkModeChange={setDarkMode}
              />

              <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-6 shadow-lg">
                <div>
                  <h3 className="text-lg font-semibold text-rose-700">
                    Consejos rápidos
                  </h3>
                  <p className="mt-2 text-sm text-rose-600">
                    Optimiza tu experiencia habilitando notificaciones
                    relevantes y manteniendo tu perfil seguro.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button className="rounded-md bg-rose-600 px-4 py-2 text-white">
                    Revisar seguridad
                  </button>
                  <button className="rounded-md border bg-white px-4 py-2 text-rose-600">
                    Ver ayuda
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
