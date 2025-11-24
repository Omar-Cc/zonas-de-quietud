interface PrivacySettingsProps {
  publicProfile: boolean
  onPublicProfileChange: (value: boolean) => void
}

export function PrivacySettings({
  publicProfile,
  onPublicProfileChange,
}: Readonly<PrivacySettingsProps>) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Privacidad</h2>
        <p className="text-sm text-slate-500">Ajustes de visibilidad y datos</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-700">
              Perfil público
            </div>
            <div className="text-xs text-slate-400">
              ¿Tu actividad puede ser vista por otros?
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={publicProfile}
              onChange={() => onPublicProfileChange(!publicProfile)}
            />
            <div className="h-6 w-11 rounded-full bg-slate-200 transition-all peer-checked:bg-(--principal)" />
          </label>
        </div>

        <div>
          <div className="text-sm font-medium text-slate-700">
            Eliminar datos
          </div>
          <p className="text-xs text-slate-400">
            Solicita la eliminación de tus datos.
          </p>
          <div className="mt-3">
            <button className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600">
              Solicitar eliminación
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
