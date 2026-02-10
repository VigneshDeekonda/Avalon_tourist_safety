"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Shield,
  AlertTriangle,
  Phone,
  Menu,
  X,
  Search,
  Bell,
  ChevronLeft,
  Globe,
  HelpCircle,
  Sun,
  Moon,
  MapPin,
  Smartphone,
  BarChart3,
  Users,
  Settings,
  MessageCircle,
  Scan,
  LayoutGrid,
} from "lucide-react"

export type TouristView = "home" | "safety" | "alerts" | "emergency" | "explore" | "offline"
export type AuthorityView = "analytics" | "tourists" | "incidents" | "monitoring" | "verification" | "communications" | "sms" | "settings"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeView: TouristView | AuthorityView
  onViewChange: (view: TouristView | AuthorityView) => void
  userType: "tourist" | "authority"
  onUserTypeChange: (type: "tourist" | "authority") => void
}

export function DashboardLayout({
  children,
  activeView,
  onViewChange,
  userType,
  onUserTypeChange,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("safetour-theme") : null
    if (stored === "dark" || (!stored && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("safetour-theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("safetour-theme", "light")
      }
      return next
    })
  }, [])

  const touristNavItems: { icon: typeof MapPin; label: string; view: TouristView }[] = [
    { icon: MapPin, label: "Home", view: "home" },
    { icon: Shield, label: "Safety", view: "safety" },
    { icon: AlertTriangle, label: "Alerts", view: "alerts" },
    { icon: Phone, label: "Emergency", view: "emergency" },
    { icon: Globe, label: "Explore", view: "explore" },
    { icon: Smartphone, label: "Offline/SMS", view: "offline" },
  ]

  const authorityNavItems: { icon: typeof MapPin; label: string; view: AuthorityView }[] = [
    { icon: BarChart3, label: "Analytics", view: "analytics" },
    { icon: Users, label: "Tourists", view: "tourists" },
    { icon: AlertTriangle, label: "Incidents", view: "incidents" },
    { icon: MapPin, label: "Monitoring", view: "monitoring" },
    { icon: Scan, label: "Verification", view: "verification" },
    { icon: MessageCircle, label: "Communications", view: "communications" },
    { icon: Smartphone, label: "SMS System", view: "sms" },
    { icon: Settings, label: "Settings", view: "settings" },
  ]

  const navItems = userType === "tourist" ? touristNavItems : authorityNavItems

  const handleNavClick = (view: TouristView | AuthorityView) => {
    onViewChange(view)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <button onClick={() => handleNavClick(userType === "tourist" ? "home" : "analytics")} className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground tracking-tight hidden sm:block">SafeTour</span>
          </button>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search zones, alerts & more"
              className="pl-9 h-9 bg-muted/50 border-border text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium bg-transparent hidden sm:flex"
            onClick={() => {
              const next = userType === "tourist" ? "authority" : "tourist"
              onUserTypeChange(next)
              onViewChange(next === "tourist" ? "home" : "analytics")
            }}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            {userType === "tourist" ? "Authority" : "Tourist"}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-primary/10 border border-border flex items-center justify-center text-xs font-semibold text-primary ml-1 cursor-pointer">
            JD
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 top-14 bg-card border-r border-border
            flex flex-col transition-all duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            ${sidebarCollapsed ? "w-16" : "w-52"}
            md:translate-x-0 md:static md:inset-auto
          `}
        >
          <nav className="flex-1 px-2.5 py-4 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full text-left
                  ${activeView === item.view
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                  ${sidebarCollapsed ? "justify-center px-2" : ""}
                `}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="px-2.5 py-4 border-t border-border flex flex-col gap-0.5">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground
                hover:bg-muted hover:text-foreground transition-colors w-full text-left
                ${sidebarCollapsed ? "justify-center px-2" : ""}
              `}
            >
              <ChevronLeft className={`h-[18px] w-[18px] shrink-0 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
              {!sidebarCollapsed && <span>Collapse</span>}
            </button>
            <button
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground
                hover:bg-muted hover:text-foreground transition-colors w-full text-left
                ${sidebarCollapsed ? "justify-center px-2" : ""}
              `}
            >
              <HelpCircle className="h-[18px] w-[18px] shrink-0" />
              {!sidebarCollapsed && <span>Help</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav for Tourist */}
      {userType === "tourist" && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 md:hidden">
          <div className="flex items-center justify-around px-1 py-1.5">
            {touristNavItems.slice(0, 5).map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`
                  flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-lg text-[10px] font-medium
                  ${activeView === item.view ? "text-primary" : "text-muted-foreground"}
                `}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
