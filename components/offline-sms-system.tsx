"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, Smartphone, Send, AlertTriangle, CheckCircle, Clock, Signal, MessageSquare } from "lucide-react"

interface SMSMessage {
  id: string
  type: "emergency" | "alert" | "status" | "response"
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "failed" | "pending"
  recipient?: string
}

interface OfflineData {
  location: { lat: number; lng: number }
  timestamp: Date
  emergencyContacts: string[]
  lastKnownSafeZone: string
  batteryLevel: number
}

export function OfflineSMSSystem() {
  const [isOnline, setIsOnline] = useState(true)
  const [signalStrength, setSignalStrength] = useState(4)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [emergencyPhone, setEmergencyPhone] = useState("+1-555-0123")
  const [offlineMode, setOfflineMode] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)

  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>([
    {
      id: "sms-1",
      type: "emergency",
      content: "EMERGENCY: Tourist John Doe needs assistance at Downtown 5th St. Location: 40.7128,-74.006",
      timestamp: new Date(Date.now() - 300000),
      status: "delivered",
      recipient: "Emergency Services",
    },
    {
      id: "sms-2",
      type: "alert",
      content: "SAFETY ALERT: High risk area detected. Tourist advised to move to safe zone. ID: tourist-12345",
      timestamp: new Date(Date.now() - 600000),
      status: "delivered",
      recipient: "Tourist Police",
    },
    {
      id: "sms-3",
      type: "status",
      content: "STATUS: Tourist check-in successful. Location: Tourist District. Safety score: 95%",
      timestamp: new Date(Date.now() - 900000),
      status: "sent",
      recipient: "Emergency Contact",
    },
  ])

  const offlineData: OfflineData = {
    location: { lat: 40.7128, lng: -74.006 },
    timestamp: new Date(),
    emergencyContacts: ["+1-555-0123", "+1-555-0456", "911"],
    lastKnownSafeZone: "Downtown Safe Zone",
    batteryLevel: 67,
  }

  // Simulate connectivity changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newOnlineStatus = Math.random() > 0.3 // 70% chance of being online
      setIsOnline(newOnlineStatus)
      setSignalStrength(Math.floor(Math.random() * 5))

      if (!newOnlineStatus && !offlineMode) {
        setOfflineMode(true)
        handleOfflineMode()
      } else if (newOnlineStatus && offlineMode) {
        handleOnlineMode()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [offlineMode])

  const handleOfflineMode = () => {
    console.log("[v0] Switching to offline mode - SMS fallback activated")
    // Simulate sending offline notification SMS
    const offlineSMS: SMSMessage = {
      id: `sms-offline-${Date.now()}`,
      type: "status",
      content: `OFFLINE MODE: Tourist system offline. Last location: ${offlineData.lastKnownSafeZone}. Battery: ${offlineData.batteryLevel}%. Emergency contacts active.`,
      timestamp: new Date(),
      status: "pending",
      recipient: "Emergency Contact",
    }
    setSmsMessages((prev) => [offlineSMS, ...prev])
  }

  const handleOnlineMode = () => {
    setOfflineMode(false)
    setSyncProgress(0)

    // Simulate data synchronization
    const syncInterval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(syncInterval)
          console.log("[v0] Data synchronization completed")
          return 100
        }
        return prev + 20
      })
    }, 500)
  }

  const sendEmergencySMS = () => {
    const emergencySMS: SMSMessage = {
      id: `sms-emergency-${Date.now()}`,
      type: "emergency",
      content: `EMERGENCY ALERT: Immediate assistance required. Location: ${offlineData.location.lat},${offlineData.location.lng}. Tourist ID: tourist-12345. Time: ${new Date().toLocaleString()}`,
      timestamp: new Date(),
      status: "pending",
      recipient: "Emergency Services",
    }

    setSmsMessages((prev) => [emergencySMS, ...prev])

    // Simulate SMS delivery
    setTimeout(() => {
      setSmsMessages((prev) =>
        prev.map((msg) => (msg.id === emergencySMS.id ? { ...msg, status: "delivered" as const } : msg)),
      )
    }, 2000)
  }

  const sendStatusUpdate = () => {
    const statusSMS: SMSMessage = {
      id: `sms-status-${Date.now()}`,
      type: "status",
      content: `STATUS UPDATE: Tourist safe in ${offlineData.lastKnownSafeZone}. Battery: ${offlineData.batteryLevel}%. All systems operational.`,
      timestamp: new Date(),
      status: "pending",
      recipient: emergencyPhone,
    }

    setSmsMessages((prev) => [statusSMS, ...prev])

    setTimeout(() => {
      setSmsMessages((prev) => prev.map((msg) => (msg.id === statusSMS.id ? { ...msg, status: "sent" as const } : msg)))
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "sent":
        return "secondary"
      case "failed":
        return "destructive"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle
      case "alert":
        return AlertTriangle
      case "status":
        return CheckCircle
      case "response":
        return MessageSquare
      default:
        return MessageSquare
    }
  }

  return (
    <div className="space-y-4">
      {/* Connectivity Status */}
      <Card className={`${isOnline ? "bg-accent/5 border-accent/20" : "bg-destructive/5 border-destructive/20"}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-5 w-5 text-accent" /> : <WifiOff className="h-5 w-5 text-destructive" />}
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
              <div className="flex items-center gap-1">
                <Signal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Signal: {signalStrength}/4</span>
              </div>
            </div>
            <Badge variant={smsEnabled ? "default" : "secondary"}>SMS {smsEnabled ? "Active" : "Disabled"}</Badge>
          </div>

          {offlineMode && (
            <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">Offline Mode Active</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Internet connection lost. SMS fallback system activated for emergency communications.
              </p>
              {syncProgress > 0 && syncProgress < 100 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Syncing data...</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <Progress value={syncProgress} className="h-1" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency SMS Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Emergency SMS System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="destructive" className="h-auto p-4 flex-col gap-2" onClick={sendEmergencySMS}>
              <AlertTriangle className="h-6 w-6" />
              <span className="text-sm font-medium">Send Emergency SMS</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" onClick={sendStatusUpdate}>
              <CheckCircle className="h-6 w-6" />
              <span className="text-sm font-medium">Send Status Update</span>
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Contact Number</label>
            <div className="flex gap-2">
              <Input
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+1-555-0123"
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Data Cache */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            Offline Data Cache
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last Known Location</p>
              <p className="font-mono text-xs">
                {offlineData.location.lat}, {offlineData.location.lng}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Safe Zone</p>
              <p className="text-xs">{offlineData.lastKnownSafeZone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Battery Level</p>
              <div className="flex items-center gap-2">
                <Progress value={offlineData.batteryLevel} className="flex-1 h-2" />
                <span className="text-xs">{offlineData.batteryLevel}%</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Emergency Contacts</p>
              <p className="text-xs">{offlineData.emergencyContacts.length} contacts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Message History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            SMS Message History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {smsMessages.map((message) => {
            const IconComponent = getMessageTypeIcon(message.type)
            return (
              <div key={message.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <IconComponent
                  className={`h-4 w-4 mt-0.5 ${
                    message.type === "emergency"
                      ? "text-destructive"
                      : message.type === "alert"
                        ? "text-secondary"
                        : "text-accent"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getStatusColor(message.status)} className="text-xs">
                      {message.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{message.recipient}</span>
                  </div>
                  <p className="text-sm text-foreground">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp.toLocaleString()}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* System Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            System Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Core Systems</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>GPS Tracking</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Geo-fencing</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Emergency Response</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Blockchain ID</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Communication</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>AI Chatbot</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Online" : "Offline"}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>SMS Fallback</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Analytics</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Syncing" : "Cached"}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Verification</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall System Health</span>
              <Badge variant="default" className="bg-accent text-accent-foreground">
                Operational
              </Badge>
            </div>
            <Progress value={95} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              All critical systems operational. SMS fallback ready for offline scenarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
