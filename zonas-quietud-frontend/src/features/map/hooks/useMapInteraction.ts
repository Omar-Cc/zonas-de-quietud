import { useState, useRef, useEffect } from 'react'

export function useMapInteraction() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const svgContainerRef = useRef<HTMLDivElement | null>(null)

  const zoomIn = () => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))
  const centerMap = () => setPan({ x: 0, y: 0 })

  useEffect(() => {
    const el = svgContainerRef.current
    if (!el) return
    el.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
    el.style.transformOrigin = `center center`
  }, [zoom, pan])

  return {
    zoom,
    pan,
    zoomIn,
    zoomOut,
    centerMap,
    svgContainerRef,
  }
}
