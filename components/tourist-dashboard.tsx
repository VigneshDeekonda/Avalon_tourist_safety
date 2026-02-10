"use client"

import React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Shield,
  AlertTriangle,
  Clock,
  Wifi,
  Phone,
  ChevronRight,
  X,
  Ambulance,
  Car,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingDown,
  Eye,
} from "lucide-react"
import { TrackingMap } from "@/components/tracking-map"

/* ------------------------------------------------------------------ */
/*  Tip card for the "FOR YOU" section                                 */
/* ------------------------------------------------------------------ */
function TipCard({
  icon: Icon,
  title,
  subtitle,
  highlight,
  onDismiss,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  highlight?: string
  onDismiss: () => void
}) {
  return (
    <div className="min-w-[220px] flex-shrink-0 rounded-xl border border-border bg-card p-4 relative">
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center mb-3">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
        {highlight ? (
          <>
            {subtitle.split(highlight)[0]}
            <span className="text-primary font-medium">{highlight}</span>
            {subtitle.split(highlight)[1]}
          </>
        ) : (
          subtitle
        )}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Watchlist row for incident zones                                   */
/* ------------------------------------------------------------------ */
function WatchlistRow({
  name,
  code,
  incidents,
  trend,
}: {
  name: string
  code: string
  incidents: number
  trend: number
}) {
  const isDown = trend < 0
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground ${incidents > 80 ? "bg-destructive" : incidents > 40 ? "bg-chart-4" : "bg-primary"}`}>
          {code.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{code}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* mini sparkline placeholder */}
        <svg width="60" height="24" viewBox="0 0 60 24" className="text-muted-foreground/30">
          <polyline
            fill="none"
            stroke={isDown ? "oklch(0.55 0.22 25)" : "oklch(0.55 0.18 150)"}
            strokeWidth="1.5"
            points="0,18 10,14 20,16 30,10 40,12 50,6 60,8"
          />
        </svg>
        <div className="text-right min-w-[60px]">
          <p className={`text-xs font-medium ${isDown ? "text-destructive" : "text-chart-2"}`}>
            {isDown ? "" : "+"}{trend}%
          </p>
          <p className="text-sm font-semibold text-foreground">{incidents}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Tourist Dashboard                                             */
/* ------------------------------------------------------------------ */
export function TouristDashboard() {
  const [tips, setTips] = useState([
    {
      id: "1",
      icon: Shield,
      title: "Stay in monitored zones",
      subtitle: "95% safety score in tourist districts",
      highlight: "95% safety score",
    },
    {
      id: "2",
      icon: Eye,
      title: "AI monitoring active",
      subtitle: "Real-time behavior analysis with 24/7 coverage",
      highlight: "24/7 coverage",
    },
    {
      id: "3",
      icon: Phone,
      title: "Emergency SMS ready",
      subtitle: "Works offline via SMS fallback system",
    },
  ])

  const dismissTip = (id: string) => {
    setTips((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* ============================================================ */}
      {/*  LEFT: Main content area                                      */}
      {/* ============================================================ */}
      <div className="flex-1 min-w-0 p-5 pb-24 md:pb-5 space-y-6">
        {/* Safety Score Section */}
        <div>
          <p className="text-xs font-medium text-muted-foreground underline underline-offset-2 decoration-dotted cursor-help">
            Safety score
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">95%</span>
            <span className="text-sm text-muted-foreground">Safe</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-muted-foreground underline underline-offset-2 decoration-dotted">
              Incident change 30d
            </p>
            <span className="text-xs text-chart-2 flex items-center gap-0.5">
              <TrendingDown className="h-3 w-3" />
              -12.4%
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs bg-transparent">
              <ArrowDownToLine className="h-3.5 w-3.5" />
              Check In
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs bg-transparent">
              <ArrowUpFromLine className="h-3.5 w-3.5" />
              Report
            </Button>
          </div>
        </div>

        {/* Leaflet Map */}
        <TrackingMap />

        {/* FOR YOU section */}
        {tips.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">For you</h3>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
              {tips.map((tip) => (
                <TipCard
                  key={tip.id}
                  icon={tip.icon}
                  title={tip.title}
                  subtitle={tip.subtitle}
                  highlight={tip.highlight}
                  onDismiss={() => dismissTip(tip.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* WATCHLIST: Incident zones */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Watchlist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 rounded-xl border border-border bg-card divide-y sm:divide-y-0 divide-border">
            <div className="divide-y divide-border px-3">
              <WatchlistRow name="Dharavi" code="High Risk" incidents={142} trend={8} />
              <WatchlistRow name="Kamathipura" code="High Risk" incidents={118} trend={-3} />
            </div>
            <div className="divide-y divide-border px-3">
              <WatchlistRow name="Kurla Station" code="High Risk" incidents={97} trend={5} />
              <WatchlistRow name="Dadar East" code="Medium" incidents={63} trend={-7} />
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
              <div className="h-8 w-8 rounded-lg bg-chart-4/15 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4 text-chart-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Safety Advisory</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Avoid Dharavi area after 8 PM. Increased petty theft reports this week.
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">5m ago</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Zone Update</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Colaba Market safety rating upgraded. Now classified as low risk.
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">1h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  RIGHT: Quick Actions Panel (Kraken-style sidebar panel)      */}
      {/* ============================================================ */}
      <div className="hidden lg:block w-80 border-l border-border bg-card p-5 space-y-5 shrink-0 overflow-y-auto">
        {/* Emergency panel header tabs */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button className="flex-1 text-xs font-medium py-1.5 rounded-md bg-card text-foreground shadow-sm text-center">
            Emergency
          </button>
          <button className="flex-1 text-xs font-medium py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors text-center">
            Contacts
          </button>
          <button className="flex-1 text-xs font-medium py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors text-center">
            Status
          </button>
        </div>

        {/* Emergency type selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-3 w-3 text-destructive" />
              </div>
              <span className="text-sm font-medium text-foreground">Quick Alert</span>
            </div>
            <Badge variant="outline" className="text-[10px]">SOS</Badge>
          </div>
        </div>

        {/* Emergency buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-destructive/30 hover:bg-destructive/5 transition-colors">
            <Ambulance className="h-5 w-5 text-destructive" />
            <span className="text-xs font-medium text-foreground">Medical</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-destructive/30 hover:bg-destructive/5 transition-colors">
            <Shield className="h-5 w-5 text-destructive" />
            <span className="text-xs font-medium text-foreground">Security</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-chart-4/30 hover:bg-chart-4/5 transition-colors">
            <Car className="h-5 w-5 text-chart-4" />
            <span className="text-xs font-medium text-foreground">Accident</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-chart-4/30 hover:bg-chart-4/5 transition-colors">
            <Phone className="h-5 w-5 text-chart-4" />
            <span className="text-xs font-medium text-foreground">Call Help</span>
          </button>
        </div>

        {/* Connectivity status */}
        <div className="rounded-xl border border-border p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Connection</span>
            <Badge className="text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Online</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">SMS Fallback</span>
            <Badge className="text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Ready</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">GPS Signal</span>
            <span className="text-xs text-foreground font-medium">4/4 bars</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Nearby Tourists</span>
            <span className="text-xs text-foreground font-medium">12</span>
          </div>
        </div>

        {/* Identity card mini */}
        <div className="rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Verified Tourist</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Blockchain ID</span>
              <span className="font-mono text-foreground">0x742d...b8D4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nationality</span>
              <span className="text-foreground">United States</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className="text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Verified</Badge>
            </div>
          </div>
        </div>

        {/* Current zone */}
        <div className="rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Current Zone</span>
          </div>
          <p className="text-sm font-semibold text-foreground">Safe Area - Tourist District</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[95%] rounded-full bg-chart-2" />
            </div>
            <span className="text-xs font-medium text-chart-2">95%</span>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 text-sm font-medium">
          View Full Report
        </Button>
      </div>
    </div>
  )
}
