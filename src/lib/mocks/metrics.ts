
import { 
  MOCK_STATS, 
  MOCK_TICKETS, 
  MOCK_ACTIVITY, 
  MOCK_STATUS_DISTRIBUTION, 
  MOCK_WEEKLY_ACTIVITY 
} from "@/lib/mock-data";

export async function getDashboardStats(organizationId: string) {
  return MOCK_STATS;
}

export async function getRecentTickets(organizationId: string, limit = 5) {
  return MOCK_TICKETS.slice(0, limit);
}

export async function getActivityFeed(organizationId: string, limit = 10) {
  return MOCK_ACTIVITY.slice(0, limit);
}

export async function getStatusDistribution(organizationId: string) {
  return MOCK_STATUS_DISTRIBUTION;
}

export async function getWeeklyActivity(organizationId: string) {
  return MOCK_WEEKLY_ACTIVITY;
}

export async function getReportsVolume(organizationId: string) {
  return [
    { name: "Jan", created: 45, resolved: 38 },
    { name: "Feb", created: 52, resolved: 48 },
    { name: "Mar", created: 48, resolved: 50 },
    { name: "Apr", created: 61, resolved: 55 },
    { name: "May", created: 55, resolved: 60 },
    { name: "Jun", created: 70, resolved: 65 },
  ];
}

export async function getReportsResponseTime(organizationId: string) {
  return [
    { name: "Mon", time: 24 },
    { name: "Tue", time: 18 },
    { name: "Wed", time: 32 },
    { name: "Thu", time: 15 },
    { name: "Fri", time: 28 },
    { name: "Sat", time: 10 },
    { name: "Sun", time: 12 },
  ];
}

export async function getReportsSatisfaction(organizationId: string) {
  return [
    { name: "5 Stars", value: 85 },
    { name: "4 Stars", value: 10 },
    { name: "3 Stars", value: 3 },
    { name: "2 Stars", value: 1 },
    { name: "1 Star", value: 1 },
  ];
}

export async function getReportsChannels(organizationId: string) {
  return [
    { name: "Email", tickets: 120 },
    { name: "Web", tickets: 85 },
    { name: "Chat", tickets: 45 },
    { name: "Phone", tickets: 20 },
    { name: "API", tickets: 15 },
  ];
}
