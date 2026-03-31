"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { TicketChart } from "@/components/dashboard/TicketChart";
import { RecentTickets } from "@/components/dashboard/RecentTickets";
import { StatusDistribution } from "@/components/dashboard/StatusDistribution";
import { TeamPerformance } from "@/components/dashboard/TeamPerformance";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Download,
  RefreshCw,
} from "lucide-react";

export default function DashboardClient({
  stats,
  recentTickets,
  activityFeed,
  weeklyActivity,
  statusDistribution
}: {
  stats: any;
  recentTickets: any[];
  activityFeed: any[];
  weeklyActivity: any[];
  statusDistribution: any[];
}) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400">
            Welcome back! Here&apos;s what&apos;s happening with your support desk.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="secondary" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fade-in stagger-1">
          <StatsCard
            title="Total Tickets"
            value={stats.total}
            change={0}
            icon={Ticket}
            iconColor="text-teal-400"
            iconBg="bg-teal-500/10"
          />
        </div>
        <div className="animate-fade-in stagger-2">
          <StatsCard
            title="Open Tickets"
            value={stats.open}
            change={0}
            icon={Clock}
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10"
          />
        </div>
        <div className="animate-fade-in stagger-3">
          <StatsCard
            title="Resolved Tickets"
            value={stats.resolved}
            change={0}
            icon={CheckCircle2}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10"
          />
        </div>
        <div className="animate-fade-in stagger-4">
          <StatsCard
            title="Resolution Rate"
            value={`${stats.resolutionRate}%`}
            change={0}
            changeLabel="no data yet"
            icon={Zap}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="animate-fade-in stagger-5 lg:col-span-2">
          <TicketChart data={weeklyActivity} />
        </div>
        <div className="animate-fade-in stagger-6">
          <StatusDistribution data={statusDistribution} />
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="mb-8 animate-fade-in">
        <RecentTickets tickets={recentTickets} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="animate-fade-in">
          <TeamPerformance />
        </div>
        <div className="animate-fade-in">
          <ActivityFeed activities={activityFeed} />
        </div>
      </div>
    </div>
  );
}



