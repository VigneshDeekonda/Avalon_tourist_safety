"use client"

import { useState } from "react"
import { DashboardLayout, type TouristView, type AuthorityView } from "@/components/dashboard-layout"
import { TouristDashboard } from "@/components/tourist-dashboard"
import { EmergencyResponse } from "@/components/emergency-response"
import { BlockchainID } from "@/components/blockchain-id"
import { OfflineSMSSystem } from "@/components/offline-sms-system"
import { AIChatbot } from "@/components/ai-chatbot"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { SafetyView } from "@/components/safety-view"
import { AlertsView } from "@/components/alerts-view"
import { ExploreView } from "@/components/explore-view"

export default function HomePage() {
  const [activeView, setActiveView] = useState<TouristView | AuthorityView>("home")
  const [userType, setUserType] = useState<"tourist" | "authority">("tourist")

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <TouristDashboard />
      case "safety":
        return <SafetyView />
      case "alerts":
        return <AlertsView />
      case "emergency":
        return (
          <div className="p-5 pb-24 md:pb-5 max-w-3xl">
            <EmergencyResponse />
          </div>
        )
      case "explore":
        return <ExploreView />
      case "offline":
        return (
          <div className="p-5 pb-24 md:pb-5 max-w-3xl">
            <OfflineSMSSystem />
          </div>
        )
      case "analytics":
        return <AnalyticsDashboard />
      default:
        return <TouristDashboard />
    }
  }

  return (
    <>
      <DashboardLayout
        activeView={activeView}
        onViewChange={setActiveView}
        userType={userType}
        onUserTypeChange={setUserType}
      >
        {renderContent()}
      </DashboardLayout>
      <AIChatbot />
    </>
  )
}
