"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Bot, Users, TrendingUp, Clock } from "lucide-react"

interface ChatSession {
  id: string
  touristName: string
  language: string
  status: "active" | "resolved" | "escalated"
  priority: "low" | "medium" | "high"
  lastMessage: string
  timestamp: Date
  location: string
}

export function AuthorityChatbot() {
  const [activeSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      touristName: "John Doe",
      language: "English",
      status: "active",
      priority: "high",
      lastMessage: "I need emergency help, someone is following me",
      timestamp: new Date(Date.now() - 300000),
      location: "Downtown - 5th Street",
    },
    {
      id: "session-2",
      touristName: "Maria Garcia",
      language: "Spanish",
      status: "active",
      priority: "medium",
      lastMessage: "¿Dónde está el hospital más cercano?",
      timestamp: new Date(Date.now() - 600000),
      location: "Tourist District",
    },
    {
      id: "session-3",
      touristName: "Pierre Dubois",
      language: "French",
      status: "resolved",
      priority: "low",
      lastMessage: "Merci pour votre aide!",
      timestamp: new Date(Date.now() - 1800000),
      location: "Historic Quarter",
    },
  ])

  const chatStats = {
    activeChats: activeSessions.filter((s) => s.status === "active").length,
    totalToday: 47,
    averageResponseTime: 2.3,
    satisfactionRate: 94,
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "resolved":
        return "default"
      case "escalated":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Chat Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{chatStats.activeChats}</span>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              Total Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-accent">{chatStats.totalToday}</span>
            <p className="text-xs text-muted-foreground">Chat sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-secondary">{chatStats.averageResponseTime}m</span>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-primary">{chatStats.satisfactionRate}%</span>
            <p className="text-xs text-muted-foreground">User satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Chat Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Active Chat Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions
            .filter((session) => session.status === "active")
            .map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-foreground">{session.touristName}</h4>
                    <Badge variant={getPriorityColor(session.priority)} className="text-xs">
                      {session.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {session.language}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{session.lastMessage}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{session.location}</span>
                    <span>{Math.floor((Date.now() - session.timestamp.getTime()) / 60000)}m ago</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Chat
                  </Button>
                  <Button variant="default" size="sm">
                    Respond
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Recent Chat History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-accent" />
            Recent Chat History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    session.status === "active"
                      ? "bg-destructive"
                      : session.status === "resolved"
                        ? "bg-accent"
                        : "bg-secondary"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">{session.touristName}</p>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={getStatusColor(session.status)} className="text-xs mb-1">
                  {session.status}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {Math.floor((Date.now() - session.timestamp.getTime()) / 60000)}m ago
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Assistant Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Assistant Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Auto-Response Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Emergency Detection</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Language Auto-Detect</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Safety Alerts</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Response Priorities</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Emergency Keywords</span>
                  <Badge variant="destructive">Immediate</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Safety Inquiries</span>
                  <Badge variant="secondary">High</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>General Questions</span>
                  <Badge variant="outline">Normal</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Configure AI
            </Button>
            <Button variant="default" className="flex-1">
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
