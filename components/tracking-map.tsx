"use client"

import { useState, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Navigation,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import dynamic from "next/dynamic"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface IncidentZone {
  id: string
  name: string
  type: "high" | "medium" | "low"
  center: [number, number]
  radius: number
  incidents: number
  description: string
}

interface TouristLocation {
  lat: number
  lng: number
  timestamp: Date
  accuracy: number
}

/* ------------------------------------------------------------------ */
/*  Incident data for Mumbai                                           */
/* ------------------------------------------------------------------ */

const MUMBAI_CENTER: [number, number] = [19.076, 72.8777]

const incidentZones: IncidentZone[] = [
  {
    id: "1",
    name: "Dharavi",
    type: "high",
    center: [19.0438, 72.8534],
    radius: 800,
    incidents: 142,
    description:
      "High petty-theft & scam reports. Tourists advised to visit only with registered guides.",
  },
  {
    id: "2",
    name: "Kamathipura",
    type: "high",
    center: [18.9632, 72.8274],
    radius: 600,
    incidents: 118,
    description:
      "Frequent bag-snatching and fraud incidents reported after dark.",
  },
  {
    id: "3",
    name: "Kurla Station Area",
    type: "high",
    center: [19.0659, 72.8793],
    radius: 500,
    incidents: 97,
    description:
      "Overcrowding-related incidents and pickpocketing near the station.",
  },
  {
    id: "4",
    name: "Dadar East Market",
    type: "medium",
    center: [19.0178, 72.8478],
    radius: 450,
    incidents: 63,
    description:
      "Moderate scam activity targeting tourists in market areas.",
  },
  {
    id: "5",
    name: "Andheri Station West",
    type: "medium",
    center: [19.1197, 72.8464],
    radius: 500,
    incidents: 55,
    description:
      "Auto-rickshaw overcharging and minor theft incidents.",
  },
  {
    id: "6",
    name: "Grant Road Area",
    type: "medium",
    center: [18.9638, 72.8195],
    radius: 400,
    incidents: 48,
    description:
      "Moderate reports of tourist scams and overcharging by vendors.",
  },
  {
    id: "7",
    name: "Bandra West Promenade",
    type: "low",
    center: [19.0544, 72.8202],
    radius: 350,
    incidents: 22,
    description:
      "Occasional phone-snatching incidents reported in the evening.",
  },
  {
    id: "8",
    name: "Colaba Market",
    type: "low",
    center: [18.9217, 72.8318],
    radius: 400,
    incidents: 18,
    description:
      "Low-level haggling scams. Generally safe during the day.",
  },
]

/* ------------------------------------------------------------------ */
/*  Lazy-loaded Leaflet map                                            */
/* ------------------------------------------------------------------ */

const LeafletMap = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] rounded-xl bg-muted/40 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Navigation className="h-5 w-5 animate-spin" />
        <span className="text-xs">Loading Mumbai map...</span>
      </div>
    </div>
  ),
})

/* ------------------------------------------------------------------ */
/*  Time-range tab selector                                            */
/* ------------------------------------------------------------------ */

const TIME_RANGES = ["1W", "1M", "3M", "6M", "1Y", "ALL"] as const

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function TrackingMap() {
  const [currentLocation, setCurrentLocation] = useState<TouristLocation>({
    lat: 19.076,
    lng: 72.8777,
    timestamp: new Date(),
    accuracy: 5,
  })

  const [isTracking, setIsTracking] = useState(true)
  const [selectedZone, setSelectedZone] = useState<IncidentZone | null>(null)
  const [activeRange, setActiveRange] = useState<(typeof TIME_RANGES)[number]>("1M")
  const [showZoneList, setShowZoneList] = useState(false)

  // Simulate location drift
  useEffect(() => {
    if (!isTracking) return
    const interval = setInterval(() => {
      setCurrentLocation((prev) => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        timestamp: new Date(),
        accuracy: Math.floor(Math.random() * 10) + 3,
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [isTracking])

  const stats = useMemo(() => {
    const high = incidentZones.filter((z) => z.type === "high").length
    const medium = incidentZones.filter((z) => z.type === "medium").length
    const low = incidentZones.filter((z) => z.type === "low").length
    const total = incidentZones.reduce((s, z) => s + z.incidents, 0)
    return { high, medium, low, total }
  }, [])

  return (
    <div className="space-y-3">
      {/* Map header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isTracking ? "bg-chart-2 animate-pulse" : "bg-muted-foreground"}`} />
          <span className="text-xs font-medium text-muted-foreground">
            {isTracking ? "Live Tracking" : "Paused"} - Mumbai
          </span>
        </div>

        {/* Time range tabs like Kraken */}
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
          {TIME_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                activeRange === range
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-border">
        <LeafletMap
          center={MUMBAI_CENTER}
          currentLocation={[currentLocation.lat, currentLocation.lng]}
          incidentZones={incidentZones}
          onSelectZone={setSelectedZone}
        />
      </div>

      {/* Quick stat pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs">
          <span className="h-2 w-2 rounded-full bg-destructive" />
          <span className="text-muted-foreground">High</span>
          <span className="font-semibold text-foreground">{stats.high}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs">
          <span className="h-2 w-2 rounded-full bg-chart-4" />
          <span className="text-muted-foreground">Medium</span>
          <span className="font-semibold text-foreground">{stats.medium}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Low</span>
          <span className="font-semibold text-foreground">{stats.low}</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs ml-auto">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="font-mono text-muted-foreground">
            {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Selected zone detail */}
      {selectedZone && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedZone.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {selectedZone.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  selectedZone.type === "high"
                    ? "border-destructive/30 text-destructive"
                    : selectedZone.type === "medium"
                      ? "border-chart-4/30 text-chart-4"
                      : "border-primary/30 text-primary"
                }`}
              >
                {selectedZone.incidents} incidents
              </Badge>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zone list toggle */}
      <button
        onClick={() => setShowZoneList(!showZoneList)}
        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {showZoneList ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        {showZoneList ? "Hide" : "Show"} all {incidentZones.length} incident zones
      </button>

      {/* Expandable zone list */}
      {showZoneList && (
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {incidentZones.map((zone) => (
            <button
              key={zone.id}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
              onClick={() => setSelectedZone(zone)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    zone.type === "high"
                      ? "bg-destructive"
                      : zone.type === "medium"
                        ? "bg-chart-4"
                        : "bg-primary"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{zone.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {zone.incidents} incidents -- {zone.radius}m radius
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] capitalize ${
                  zone.type === "high"
                    ? "border-destructive/20 text-destructive"
                    : zone.type === "medium"
                      ? "border-chart-4/20 text-chart-4"
                      : "border-primary/20 text-primary"
                }`}
              >
                {zone.type}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
