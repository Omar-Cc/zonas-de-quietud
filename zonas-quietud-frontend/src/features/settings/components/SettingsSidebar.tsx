interface SettingsSidebarProps {
  publicProfile: boolean
  onPublicProfileChange: (value: boolean) => void
}

export function SettingsSidebar({
  publicProfile,
  onPublicProfileChange,
}: Readonly<SettingsSidebarProps>) {
  return (
    <aside className="rounded-2xl bg-white/60 p-4 shadow backdrop-blur-md lg:col-span-1">
      <nav className="space-y-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
            ⚙️
          </span>
          <span className="text-sm font-medium text-slate-700">General</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
            🔔
          </span>
          <span className="text-sm font-medium text-slate-700">
            Notificaciones
          </span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
            🔒
          </span>
          <span className="text-sm font-medium text-slate-700">Privacidad</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
            🎨
          </span>
          <span className="text-sm font-medium text-slate-700">Apariencia</span>
        </button>
      </nav>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-xs tracking-wide text-slate-500 uppercase">
          Cuenta
        </h3>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-700">
                Perfil público
              </div>
              <div className="text-xs text-slate-400">
                Permite que otros vean tu perfil
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={publicProfile}
                onChange={() => onPublicProfileChange(!publicProfile)}
              />
              <div className="h-6 w-11 rounded-full bg-slate-200 transition-all peer-checked:bg-(--principal) peer-focus:ring-2 peer-focus:ring-indigo-300" />
              <span className="ml-3 text-sm text-slate-600">
                {publicProfile ? 'Sí' : 'No'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  )
}
