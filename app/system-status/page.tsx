import { DashboardLayout } from "@/components/dashboard-layout"
import { OfflineSMSSystem } from "@/components/offline-sms-system"

export default function SystemStatusPage() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">System Status & Offline Mode</h1>
          <p className="text-sm text-muted-foreground">Monitor connectivity and manage offline SMS communications</p>
        </div>
        <OfflineSMSSystem />
      </div>
    </DashboardLayout>
  )
}
