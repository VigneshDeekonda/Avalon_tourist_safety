"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Clock,
  TrendingDown,
  TrendingUp,
  Eye,
  Lock,
  Wifi,
} from "lucide-react"

const safetyFactors = [
  { label: "Location Risk", level: "low" as const, score: 92, icon: MapPin },
  { label: "Time of Day", level: "low" as const, score: 95, icon: Clock },
  { label: "Crowd Density", level: "medium" as const, score: 72, icon: Eye },
  { label: "Historical Incidents", level: "low" as const, score: 88, icon: AlertTriangle },
  { label: "Surveillance Active", level: "low" as const, score: 98, icon: Eye },
  { label: "Connectivity", level: "low" as const, score: 100, icon: Wifi },
]

const recentChecks = [
  { zone: "Colaba Tourist District", status: "safe", time: "2 min ago", score: 96 },
  { zone: "Gateway of India", status: "safe", time: "15 min ago", score: 94 },
  { zone: "Marine Drive Promenade", status: "safe", time: "1 hr ago", score: 91 },
  { zone: "Chhatrapati Shivaji Terminus", status: "caution", time: "2 hrs ago", score: 78 },
]

export function SafetyView() {
  return (
    <div className="p-5 pb-24 md:pb-5 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Safety Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Real-time AI-powered safety assessment for your location</p>
      </div>

      {/* Overall score card */}
      <div className="rounded-xl border border-chart-2/20 bg-chart-2/5 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overall Safety Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-bold tracking-tight text-foreground">95</span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <TrendingDown className="h-3.5 w-3.5 text-chart-2" />
              <span className="text-xs font-medium text-chart-2">Incidents down 12% this month</span>
            </div>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-chart-2/10 flex items-center justify-center">
            <Shield className="h-7 w-7 text-chart-2" />
          </div>
        </div>
        <Progress value={95} className="mt-4 h-2" />
      </div>

      {/* Safety Factors Grid */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Risk Factor Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safetyFactors.map((factor) => (
            <div key={factor.label} className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                  <factor.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{factor.label}</p>
                  <p className="text-xs text-muted-foreground capitalize">{factor.level} risk</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${factor.score >= 90 ? "text-chart-2" : factor.score >= 70 ? "text-chart-4" : "text-destructive"}`}>
                  {factor.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security features */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Active Protections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">AI Monitoring</p>
            <p className="text-xs text-muted-foreground mt-0.5">24/7 behavior analysis</p>
            <Badge className="mt-2 text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Active</Badge>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Blockchain ID</p>
            <p className="text-xs text-muted-foreground mt-0.5">Identity verified</p>
            <Badge className="mt-2 text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Verified</Badge>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Wifi className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">SMS Fallback</p>
            <p className="text-xs text-muted-foreground mt-0.5">Offline emergency</p>
            <Badge className="mt-2 text-[10px] bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/10">Ready</Badge>
          </div>
        </div>
      </div>

      {/* Recent zone checks */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Zone Checks</h3>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {recentChecks.map((check) => (
            <div key={check.zone} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <CheckCircle className={`h-4 w-4 ${check.status === "safe" ? "text-chart-2" : "text-chart-4"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{check.zone}</p>
                  <p className="text-xs text-muted-foreground">{check.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${check.score >= 90 ? "text-chart-2" : "text-chart-4"}`}>
                  {check.score}%
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] capitalize ${check.status === "safe" ? "border-chart-2/20 text-chart-2" : "border-chart-4/20 text-chart-4"}`}
                >
                  {check.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
