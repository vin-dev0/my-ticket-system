export const MOCK_SESSION = {
  user: {
    id: "mock-user-id",
    name: "Demo User",
    email: "demo@example.com",
    role: "ADMIN",
    organizationId: "mock-org-id",
    plan: "PRO",
  },
  expires: new Date(Date.now() + 3600 * 1000).toISOString(),
};

export const MOCK_STATS = {
  total: 128,
  open: 42,
  resolved: 86,
  csat: 4.8,
  resolutionRate: 67,
};

export const MOCK_TICKETS = [
  {
    id: "1",
    number: 1001,
    subject: "Login issue with SSO",
    status: "OPEN",
    priority: "HIGH",
    createdAt: new Date().toISOString(),
    creator: { name: "Alice Smith", avatar: null },
    assignee: { name: "Demo User", avatar: null },
  },
  {
    id: "2",
    number: 1002,
    subject: "Pricing page not loading",
    status: "PENDING",
    priority: "MEDIUM",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    creator: { name: "Bob Jones", avatar: null },
    assignee: null,
  },
  {
    id: "3",
    number: 1003,
    subject: "How to export reports?",
    status: "SOLVED",
    priority: "LOW",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    creator: { name: "Charlie Day", avatar: null },
    assignee: { name: "Demo User", avatar: null },
  },
];

export const MOCK_ACTIVITY = [
  {
    id: "a1",
    content: "Updated the ticket status to Resolved.",
    createdAt: new Date().toISOString(),
    author: { name: "Demo User", avatar: null },
    ticket: { number: 1003, subject: "How to export reports?" },
  },
  {
    id: "a2",
    content: "Customer replied: 'It still doesn't work'.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    author: { name: "Alice Smith", avatar: null },
    ticket: { number: 1001, subject: "Login issue with SSO" },
  },
];

export const MOCK_STATUS_DISTRIBUTION = [
  { name: "Open", value: 42, color: "#10b981" },
  { name: "Pending", value: 15, color: "#f59e0b" },
  { name: "On Hold", value: 5, color: "#6b7280" },
  { name: "Solved", value: 66, color: "#0ea5e9" },
];

export const MOCK_WEEKLY_ACTIVITY = [
  { day: "Mon", created: 12, resolved: 10 },
  { day: "Tue", created: 15, resolved: 12 },
  { day: "Wed", created: 8, resolved: 14 },
  { day: "Thu", created: 20, resolved: 15 },
  { day: "Fri", created: 18, resolved: 20 },
  { day: "Sat", created: 5, resolved: 8 },
  { day: "Sun", created: 3, resolved: 5 },
];
