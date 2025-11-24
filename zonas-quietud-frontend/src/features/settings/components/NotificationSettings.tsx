interface NotificationSettingsProps {
  emailNotifications: boolean
  pushNotifications: boolean
  onEmailChange: (value: boolean) => void
  onPushChange: (value: boolean) => void
}

export function NotificationSettings({
  emailNotifications,
  pushNotifications,
  onEmailChange,
  onPushChange,
}: Readonly<NotificationSettingsProps>) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Notificaciones
          </h2>
          <p className="text-sm text-slate-500">
            Controla cómo y cuándo recibes alertas
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-700">
              Correo electrónico
            </div>
            <div className="text-xs text-slate-400">
              Recibe resúmenes y alertas por email
            </div>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={emailNotifications}
            onChange={() => onEmailChange(!emailNotifications)}
          />
        </label>

        <label className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-700">Push</div>
            <div className="text-xs text-slate-400">
              Notificaciones en tu dispositivo
            </div>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={pushNotifications}
            onChange={() => onPushChange(!pushNotifications)}
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-md bg-(--principal) px-4 py-2 text-sm text-white shadow">
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
