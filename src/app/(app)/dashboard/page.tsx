import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { 
  getDashboardStats, 
  getRecentTickets, 
  getActivityFeed, 
  getWeeklyActivity, 
  getStatusDistribution 
} from "@/lib/mocks/metrics";


export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  
  if ((session?.user as any)?.role === "CLIENT") {
    redirect("/client");
  }

  const organizationId = (session.user as any).organizationId;

  const [stats, recentTickets, activityFeed, weeklyActivity, statusDistribution] = await Promise.all([
    getDashboardStats(organizationId),
    getRecentTickets(organizationId),
    getActivityFeed(organizationId),
    getWeeklyActivity(organizationId),
    getStatusDistribution(organizationId),
  ]);

  return (
    <DashboardClient 
      stats={stats}
      recentTickets={recentTickets}
      activityFeed={activityFeed}
      weeklyActivity={weeklyActivity}
      statusDistribution={statusDistribution}
    />
  ); 
}
