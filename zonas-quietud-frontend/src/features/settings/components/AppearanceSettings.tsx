interface AppearanceSettingsProps {
  darkMode: boolean
  onDarkModeChange: (value: boolean) => void
}

export function AppearanceSettings({
  darkMode,
  onDarkModeChange,
}: Readonly<AppearanceSettingsProps>) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="text-lg font-semibold text-slate-800">Apariencia</h2>
      <p className="text-sm text-slate-500">
        Personaliza el tema y la visualización
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-700">
              Modo oscuro
            </div>
            <div className="text-xs text-slate-400">
              Activa el tema oscuro en la interfaz
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={darkMode}
              onChange={() => onDarkModeChange(!darkMode)}
            />
            <div className="h-6 w-11 rounded-full bg-slate-200 transition-all peer-checked:bg-(--principal)" />
          </label>
        </div>

        <div>
          <div className="text-sm font-medium text-slate-700">
            Tamaño de fuente
          </div>
          <div className="mt-2 flex items-center gap-3">
            <button className="rounded-md bg-slate-100 px-3 py-1 text-sm">
              A
            </button>
            <button className="rounded-md bg-slate-100 px-3 py-1 text-base">
              A
            </button>
            <button className="rounded-md bg-slate-100 px-3 py-1 text-lg">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
