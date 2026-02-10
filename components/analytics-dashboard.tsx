"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Shield,
  MapPin,
  Clock,
  Activity,
  CheckCircle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface SafetyMetrics {
  totalTourists: number
  activeTourists: number
  safeZoneTourists: number
  riskZoneTourists: number
  emergencyIncidents: number
  resolvedIncidents: number
  averageResponseTime: number
  safetyScore: number
}

interface IncidentData {
  time: string
  incidents: number
  resolved: number
}

interface ZoneData {
  zone: string
  tourists: number
  riskLevel: number
}

interface ResponseTimeData {
  service: string
  avgTime: number
  target: number
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")

  const safetyMetrics: SafetyMetrics = {
    totalTourists: 1247,
    activeTourists: 892,
    safeZoneTourists: 756,
    riskZoneTourists: 136,
    emergencyIncidents: 12,
    resolvedIncidents: 10,
    averageResponseTime: 4.2,
    safetyScore: 94,
  }

  const incidentData: IncidentData[] = [
    { time: "00:00", incidents: 2, resolved: 2 },
    { time: "04:00", incidents: 1, resolved: 1 },
    { time: "08:00", incidents: 3, resolved: 2 },
    { time: "12:00", incidents: 4, resolved: 4 },
    { time: "16:00", incidents: 2, resolved: 1 },
    { time: "20:00", incidents: 0, resolved: 0 },
  ]

  const zoneData: ZoneData[] = [
    { zone: "Downtown", tourists: 324, riskLevel: 15 },
    { zone: "Tourist District", tourists: 289, riskLevel: 8 },
    { zone: "Waterfront", tourists: 156, riskLevel: 12 },
    { zone: "Historic Quarter", tourists: 123, riskLevel: 5 },
  ]

  const responseTimeData: ResponseTimeData[] = [
    { service: "Police", avgTime: 3.8, target: 5.0 },
    { service: "Medical", avgTime: 4.2, target: 6.0 },
    { service: "Fire", avgTime: 3.5, target: 4.0 },
    { service: "Tourist Police", avgTime: 2.1, target: 3.0 },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 756, color: "hsl(var(--chart-1))" },
    { name: "Medium Risk", value: 98, color: "hsl(var(--chart-2))" },
    { name: "High Risk", value: 38, color: "hsl(var(--chart-3))" },
  ]

  const blockchainStats = {
    totalVerifications: 2847,
    successfulVerifications: 2791,
    failedVerifications: 56,
    averageVerificationTime: 1.8,
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Safety Analytics</h1>
          <p className="text-sm text-muted-foreground">Real-time monitoring and incident analysis</p>
        </div>
        <div className="flex gap-2">
          {(["24h", "7d", "30d"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Active Tourists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{safetyMetrics.activeTourists}</span>
              <Badge variant="default" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">of {safetyMetrics.totalTourists} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              Safety Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">{safetyMetrics.safetyScore}%</span>
              <Badge variant="default" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2%
              </Badge>
            </div>
            <Progress value={safetyMetrics.safetyScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-secondary" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary">
                {safetyMetrics.emergencyIncidents - safetyMetrics.resolvedIncidents}
              </span>
              <Badge variant="secondary" className="text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{safetyMetrics.resolvedIncidents} resolved today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{safetyMetrics.averageResponseTime}m</span>
              <Badge variant="default" className="text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.8m
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Average emergency response</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Incident Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Zone Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tourists" fill="hsl(var(--chart-1))" />
              <Bar dataKey="riskLevel" fill="hsl(var(--chart-2))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Response Time Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            Emergency Response Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {responseTimeData.map((service) => (
            <div key={service.service} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{service.service}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{service.avgTime}m avg</span>
                  <Badge variant={service.avgTime <= service.target ? "default" : "destructive"}>
                    {service.avgTime <= service.target ? "On Target" : "Over Target"}
                  </Badge>
                </div>
              </div>
              <Progress value={((service.target - service.avgTime) / service.target) * 100 + 50} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: {service.target}m</span>
                <span>
                  {service.avgTime <= service.target ? "✓" : "⚠"}{" "}
                  {Math.abs(service.target - service.avgTime).toFixed(1)}m{" "}
                  {service.avgTime <= service.target ? "under" : "over"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Blockchain Verification Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Blockchain Verification Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">{blockchainStats.totalVerifications}</p>
              <p className="text-xs text-muted-foreground">Total Verifications</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-accent">{blockchainStats.successfulVerifications}</p>
              <p className="text-xs text-muted-foreground">Successful</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-destructive">{blockchainStats.failedVerifications}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-secondary">{blockchainStats.averageVerificationTime}s</p>
              <p className="text-xs text-muted-foreground">Avg Time</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-sm text-accent">
                {((blockchainStats.successfulVerifications / blockchainStats.totalVerifications) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={(blockchainStats.successfulVerifications / blockchainStats.totalVerifications) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            Real-time System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
            <CheckCircle className="h-4 w-4 text-accent mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">System Status: Operational</p>
              <p className="text-xs text-muted-foreground">All monitoring systems functioning normally</p>
              <p className="text-xs text-muted-foreground mt-1">Last updated: 30 seconds ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
            <AlertTriangle className="h-4 w-4 text-secondary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">High Tourist Density Alert</p>
              <p className="text-xs text-muted-foreground">Downtown area approaching capacity limits</p>
              <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Activity className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Performance Update</p>
              <p className="text-xs text-muted-foreground">Response times improved by 15% this week</p>
              <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
