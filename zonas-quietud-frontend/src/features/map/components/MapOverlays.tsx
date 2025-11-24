interface MapOverlaysProps {
  showLayers: boolean
}

export function MapOverlays({ showLayers }: Readonly<MapOverlaysProps>) {
  return (
    <>
      {/* District Label Overlay */}
      <div className="border-border absolute top-8 left-8 rounded-lg border bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-950/90">
        <p className="text-muted-foreground">Distrito</p>
        <h2 className="text-foreground">Miraflores</h2>
      </div>

      {/* Optional layers overlay (toggle) */}
      {!showLayers && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/50">
          <p className="text-foreground/80 text-sm">Capas ocultas</p>
        </div>
      )}

      {/* Stats Overlay */}
      <div className="border-border absolute top-8 left-1/2 flex -translate-x-1/2 items-center gap-6 rounded-lg border bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm dark:bg-gray-950/90">
        <div className="text-center">
          <p className="text-muted-foreground">Calles</p>
          <p className="text-foreground">142</p>
        </div>
        <div className="bg-border h-8 w-px" />
        <div className="text-center">
          <p className="text-muted-foreground">Evaluaciones</p>
          <p className="text-foreground">3,421</p>
        </div>
        <div className="bg-border h-8 w-px" />
        <div className="text-center">
          <p className="text-muted-foreground">Promedio</p>
          <p className="text-foreground">7.2</p>
        </div>
      </div>
    </>
  )
}
