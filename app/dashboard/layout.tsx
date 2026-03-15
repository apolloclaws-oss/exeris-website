import { createClient } from '@/lib/supabase/server'
import DashboardSidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Proxy (middleware) handelt de redirect af — hier alleen renderen
  if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
      <DashboardSidebar userEmail={user.email ?? ''} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
