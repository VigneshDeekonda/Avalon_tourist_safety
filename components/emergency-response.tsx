"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Phone, MapPin, Shield, Ambulance, Car, AlertTriangle, CheckCircle, X, Send, Mic, Camera } from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  type: "police" | "ambulance" | "fire" | "local"
  phone: string
  estimatedResponse: string
  available: boolean
}

interface EmergencyIncident {
  id: string
  type: "medical" | "security" | "accident" | "other"
  priority: "low" | "medium" | "high" | "critical"
  status: "initiated" | "dispatched" | "responding" | "resolved"
  timestamp: Date
  location: { lat: number; lng: number }
  responderETA: number
}

export function EmergencyResponse() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<string | null>(null)
  const [currentIncident, setCurrentIncident] = useState<EmergencyIncident | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  const emergencyContacts: EmergencyContact[] = [
    { id: "1", name: "Local Police", type: "police", phone: "911", estimatedResponse: "3-5 min", available: true },
    {
      id: "2",
      name: "Emergency Medical",
      type: "ambulance",
      phone: "911",
      estimatedResponse: "4-7 min",
      available: true,
    },
    {
      id: "3",
      name: "Tourist Police",
      type: "local",
      phone: "+1-555-0123",
      estimatedResponse: "2-4 min",
      available: true,
    },
    {
      id: "4",
      name: "Hotel Security",
      type: "local",
      phone: "+1-555-0456",
      estimatedResponse: "1-3 min",
      available: false,
    },
  ]

  const emergencyTypes = [
    { id: "medical", label: "Medical Emergency", icon: Ambulance, color: "destructive" },
    { id: "security", label: "Security Threat", icon: Shield, color: "destructive" },
    { id: "accident", label: "Accident", icon: Car, color: "secondary" },
    { id: "other", label: "Other Emergency", icon: AlertTriangle, color: "secondary" },
  ]

  // Emergency countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && isEmergencyActive && selectedEmergencyType) {
      // Auto-dispatch emergency after countdown
      handleEmergencyDispatch()
    }
  }, [countdown, isEmergencyActive, selectedEmergencyType])

  const handleEmergencyStart = (type: string) => {
    setSelectedEmergencyType(type)
    setCountdown(10) // 10 second countdown
    setIsEmergencyActive(true)
  }

  const handleEmergencyCancel = () => {
    setIsEmergencyActive(false)
    setSelectedEmergencyType(null)
    setCountdown(0)
    setCurrentIncident(null)
  }

  const handleEmergencyDispatch = () => {
    const incident: EmergencyIncident = {
      id: `incident-${Date.now()}`,
      type: selectedEmergencyType as any,
      priority: "high",
      status: "dispatched",
      timestamp: new Date(),
      location: { lat: 40.7128, lng: -74.006 },
      responderETA: 5,
    }
    setCurrentIncident(incident)
    setCountdown(0)
  }

  const getRiskAssessment = () => {
    // AI-driven risk assessment simulation
    const riskFactors = {
      location: "medium", // Based on current geofence zone
      timeOfDay: "low", // Daytime is safer
      crowdDensity: "low", // Not crowded
      weatherConditions: "low", // Good weather
      historicalIncidents: "medium", // Some past incidents in area
    }

    const overallRisk = "medium"
    return { riskFactors, overallRisk }
  }

  const riskAssessment = getRiskAssessment()

  if (currentIncident) {
    return (
      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <CheckCircle className="h-5 w-5" />
            Emergency Response Active
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Badge variant="destructive" className="text-sm">
              {currentIncident.type.toUpperCase()} - {currentIncident.priority.toUpperCase()} PRIORITY
            </Badge>
            <p className="text-sm text-muted-foreground">
              Emergency services have been notified and are responding to your location.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Responder ETA</span>
              </div>
              <span className="text-sm font-semibold text-primary">{currentIncident.responderETA} minutes</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Location Shared</span>
              </div>
              <CheckCircle className="h-4 w-4 text-accent" />
            </div>

            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">ID Verified</span>
              </div>
              <CheckCircle className="h-4 w-4 text-accent" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsRecording(!isRecording)}>
              <Mic className={`h-4 w-4 mr-2 ${isRecording ? "text-destructive" : ""}`} />
              {isRecording ? "Stop Recording" : "Voice Message"}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Send Photo
            </Button>
          </div>

          <Button variant="destructive" className="w-full" onClick={handleEmergencyCancel}>
            Cancel Emergency
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isEmergencyActive && countdown > 0) {
    return (
      <Card className="bg-destructive/10 border-destructive/30">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-destructive">{countdown}</div>
            <h2 className="text-xl font-semibold text-foreground">Emergency Activating</h2>
            <p className="text-sm text-muted-foreground">
              Emergency services will be contacted automatically. Cancel if this was accidental.
            </p>

            <Progress value={(10 - countdown) * 10} className="w-full" />

            <div className="flex gap-2">
              <Button variant="destructive" className="flex-1" onClick={handleEmergencyDispatch}>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleEmergencyCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Emergency Button */}
      <Card className="bg-destructive/5 border-destructive/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Emergency Assistance</h2>
            <p className="text-sm text-muted-foreground">
              Select emergency type below. Your location and identity will be automatically shared with responders.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Emergency Type
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {emergencyTypes.map((type) => (
            <Button
              key={type.id}
              variant={type.color === "destructive" ? "destructive" : "secondary"}
              className="h-auto p-4 flex-col gap-2"
              onClick={() => handleEmergencyStart(type.id)}
            >
              <type.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{type.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* AI Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Current Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Risk Level</span>
            <Badge
              variant={
                riskAssessment.overallRisk === "low"
                  ? "default"
                  : riskAssessment.overallRisk === "medium"
                    ? "secondary"
                    : "destructive"
              }
            >
              {riskAssessment.overallRisk.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            {Object.entries(riskAssessment.riskFactors).map(([factor, level]) => (
              <div key={factor} className="flex items-center justify-between text-sm">
                <span className="capitalize text-muted-foreground">{factor.replace(/([A-Z])/g, " $1")}</span>
                <Badge
                  variant={level === "low" ? "default" : level === "medium" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {level}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${contact.available ? "bg-accent" : "bg-muted-foreground"}`} />
                <div>
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">ETA: {contact.estimatedResponse}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={contact.available ? "default" : "secondary"}>
                  {contact.available ? "Available" : "Busy"}
                </Badge>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
