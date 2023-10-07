import DashboardComponent from '@/components/dashboard/dashboard'
import NotReadyComponent from '@/components/error/non-ready';

export default function DashboardPage() {
  let ready = "not-ready";

  return (
    <main>
        {ready === "ready" ? <DashboardComponent /> : <NotReadyComponent />}
    </main>
  )
}