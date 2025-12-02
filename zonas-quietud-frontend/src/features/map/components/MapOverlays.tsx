interface MapOverlaysProps {
  showLayers: boolean
}

export function MapOverlays({ showLayers }: Readonly<MapOverlaysProps>) {
  return (
    <>
      {/* District Label Overlay */}
      <div className="border-border absolute top-2 left-2 rounded-lg border bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-950/90">
        <p className="text-muted-foreground">Distrito</p>
        <h2 className="text-foreground">Miraflores</h2>
      </div>

      {/* Optional layers overlay (toggle) */}
      {!showLayers && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/50">
          <p className="text-foreground/80 text-sm">Capas ocultas</p>
        </div>
      )}
    </>
  )
}
