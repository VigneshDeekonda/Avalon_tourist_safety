"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Bell,
  Filter,
} from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "info" | "critical" | "resolved"
  title: string
  description: string
  location: string
  time: string
  read: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Dharavi Area Advisory",
    description: "Increased petty theft reports near Dharavi market area. Avoid after 8 PM. Tourist police patrols have been increased.",
    location: "Dharavi, Mumbai",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "critical",
    title: "Flash Flood Warning",
    description: "Heavy rainfall expected in low-lying areas of Mumbai. Avoid Kurla and Sion areas. Emergency shelters marked on map.",
    location: "South Mumbai",
    time: "20 min ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Colaba Safety Upgrade",
    description: "Colaba Market zone safety rating has been upgraded to Low Risk. New CCTV coverage added to the area.",
    location: "Colaba Market",
    time: "1 hr ago",
    read: true,
  },
  {
    id: "4",
    type: "resolved",
    title: "Traffic Disruption Cleared",
    description: "The traffic disruption near Dadar East has been resolved. Roads are now open and safe for travel.",
    location: "Dadar East",
    time: "2 hrs ago",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    title: "Scam Activity Reported",
    description: "Multiple reports of overcharging by unauthorized taxi drivers near CST station. Use only licensed taxis or ride-hailing apps.",
    location: "CST Station Area",
    time: "3 hrs ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "Festival Safety Notice",
    description: "Ganesh Chaturthi celebrations ongoing. Expect large crowds near Girgaon Chowpatty. Follow marked safe routes.",
    location: "Girgaon Chowpatty",
    time: "5 hrs ago",
    read: true,
  },
]

const typeConfig = {
  warning: { icon: AlertTriangle, color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/20" },
  critical: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  info: { icon: Shield, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  resolved: { icon: CheckCircle, color: "text-chart-2", bg: "bg-chart-2/10", border: "border-chart-2/20" },
}

export function AlertsView() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all")

  const filteredAlerts = alerts.filter((a) => {
    if (filter === "unread") return !a.read
    if (filter === "critical") return a.type === "critical" || a.type === "warning"
    return true
  })

  const unreadCount = alerts.filter((a) => !a.read).length

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="p-5 pb-24 md:pb-5 max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1.5 bg-muted rounded-lg p-1 w-fit">
        {(["all", "unread", "critical"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
              filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {filteredAlerts.map((alert) => {
          const config = typeConfig[alert.type]
          const Icon = config.icon
          return (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 transition-colors ${
                alert.read ? "bg-card border-border" : `${config.bg} ${config.border}`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    {!alert.read && (
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    )}
                    <Badge variant="outline" className={`text-[10px] capitalize ${config.border} ${config.color}`}>
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">No alerts to show</p>
            <p className="text-xs text-muted-foreground/70 mt-1">You are all caught up.</p>
          </div>
        )}
      </div>
    </div>
  )
}
