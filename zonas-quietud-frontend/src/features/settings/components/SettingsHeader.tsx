import { Settings } from "lucide-react"

interface SettingsHeaderProps {
  title: string
  description: string
}

export function SettingsHeader({
  title,
  description,
}: Readonly<SettingsHeaderProps>) {
  return (
    <header className="mb-8 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--principal) text-white shadow-lg">
        <Settings />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </header>
  )
}
