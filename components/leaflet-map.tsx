"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface IncidentZone {
  id: string
  name: string
  type: "high" | "medium" | "low"
  center: [number, number]
  radius: number
  incidents: number
  description: string
}

interface LeafletMapProps {
  center: [number, number]
  currentLocation: [number, number]
  incidentZones: IncidentZone[]
  onSelectZone: (zone: IncidentZone) => void
}

const ZONE_STYLES: Record<
  IncidentZone["type"],
  { color: string; fillColor: string; fillOpacity: number }
> = {
  high: { color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.2 },
  medium: { color: "#d97706", fillColor: "#d97706", fillOpacity: 0.15 },
  low: { color: "#7c3aed", fillColor: "#7c3aed", fillOpacity: 0.1 },
}

export default function LeafletMap({
  center,
  currentLocation,
  incidentZones,
  onSelectZone,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const pulseRef = useRef<L.CircleMarker | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const isDark = document.documentElement.classList.contains("dark")

    const map = L.map(containerRef.current, {
      center,
      zoom: 12,
      zoomControl: false,
      attributionControl: true,
    })

    L.control.zoom({ position: "bottomright" }).addTo(map)

    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
      subdomains: "abcd",
    }).addTo(map)

    for (const zone of incidentZones) {
      const style = ZONE_STYLES[zone.type]
      const circle = L.circle(zone.center, {
        radius: zone.radius,
        ...style,
        weight: 1.5,
      }).addTo(map)

      const label =
        zone.type === "high" ? "!" : zone.type === "medium" ? "!" : "i"
      const bgColor = style.color
      const icon = L.divIcon({
        className: "incident-zone-label",
        html: `<div style="
          display:flex;align-items:center;justify-content:center;
          width:24px;height:24px;border-radius:50%;
          font-size:11px;font-weight:700;color:#fff;
          background:${bgColor};border:2px solid ${isDark ? "#1a1a1a" : "#fff"};
          box-shadow:0 1px 4px rgba(0,0,0,.25);
        ">${label}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = L.marker(zone.center, { icon }).addTo(map)

      const tooltipBg = isDark ? "#1a1a1a" : "#fff"
      const tooltipText = isDark ? "#e5e5e5" : "#111"

      circle.bindTooltip(
        `<div style="font-family:system-ui;font-size:12px;line-height:1.4;color:${tooltipText};">
          <strong>${zone.name}</strong><br/>
          ${zone.incidents} incidents<br/>
          <span style="color:${bgColor};font-weight:600;text-transform:capitalize;">${zone.type} risk</span>
        </div>`,
        { sticky: true, className: "incident-tooltip" }
      )

      const handleClick = () => onSelectZone(zone)
      circle.on("click", handleClick)
      marker.on("click", handleClick)
    }

    const legendBg = isDark ? "#1a1a1a" : "#fff"
    const legendText = isDark ? "#e5e5e5" : "#111"
    const legendShadow = isDark ? "rgba(0,0,0,.4)" : "rgba(0,0,0,.1)"

    const legend = new L.Control({ position: "topright" })
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-legend")
      div.innerHTML = `
        <div style="background:${legendBg};padding:8px 12px;border-radius:10px;box-shadow:0 1px 6px ${legendShadow};font-size:11px;line-height:1.8;font-family:system-ui;color:${legendText};">
          <div style="font-weight:700;margin-bottom:2px;">Incident Risk</div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#dc2626;display:inline-block;"></span> High
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#d97706;display:inline-block;"></span> Medium
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#7c3aed;display:inline-block;"></span> Low
          </div>
        </div>
      `
      return div
    }
    legend.addTo(map)

    const locBorder = isDark ? "#1a1a1a" : "#fff"
    const locIcon = L.divIcon({
      className: "current-location-marker",
      html: `<div style="
        width:14px;height:14px;border-radius:50%;
        background:#7c3aed;border:2.5px solid ${locBorder};
        box-shadow:0 0 0 4px rgba(124,58,237,.25),0 1px 4px rgba(0,0,0,.2);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })

    markerRef.current = L.marker(currentLocation, { icon: locIcon }).addTo(map)
    markerRef.current.bindTooltip("You are here", { permanent: false })

    pulseRef.current = L.circleMarker(currentLocation, {
      radius: 16,
      color: "#7c3aed",
      fillColor: "#7c3aed",
      fillOpacity: 0.1,
      weight: 1,
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!markerRef.current || !pulseRef.current) return
    markerRef.current.setLatLng(currentLocation)
    pulseRef.current.setLatLng(currentLocation)
  }, [currentLocation])

  return (
    <div
      ref={containerRef}
      className="aspect-[16/9] min-h-[320px]"
    />
  )
}
