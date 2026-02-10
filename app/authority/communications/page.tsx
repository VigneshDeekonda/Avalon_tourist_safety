import { DashboardLayout } from "@/components/dashboard-layout"
import { AuthorityChatbot } from "@/components/authority-chatbot"

export default function CommunicationsPage() {
  return (
    <DashboardLayout>
      <div className="p-4">
        <AuthorityChatbot />
      </div>
    </DashboardLayout>
  )
}
