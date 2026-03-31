import TeamsClient from "./TeamsClient";

export default async function TeamsPage() { 
  const isAdmin = true;
  
  // Hardcoded mock teams for the static showcase
  const teams = [
    {
      id: "team-1",
      name: "Customer Support",
      description: "Primary support team for customer inquiries.",
      organizationId: "mock-org-id",
      members: [
        { id: "m1", user: { name: "Alice Smith", email: "alice@example.com", avatar: null } },
        { id: "m2", user: { name: "Bob Jones", email: "bob@example.com", avatar: null } }
      ],
      _count: { tickets: 5 }
    },
    {
      id: "team-2",
      name: "Technical Ops",
      description: "DevOps and infrastructure support.",
      organizationId: "mock-org-id",
      members: [
        { id: "m3", user: { name: "Charlie Day", email: "charlie@example.com", avatar: null } }
      ],
      _count: { tickets: 2 }
    }
  ];

  // Hardcoded mock agents
  const agents = [
    { id: "u1", name: "Demo User", email: "demo@example.com", role: "ADMIN", _count: { assignedTickets: 42 } },
    { id: "u2", name: "Alice Smith", email: "alice@example.com", role: "AGENT", _count: { assignedTickets: 12 } },
    { id: "u3", name: "Bob Jones", email: "bob@example.com", role: "AGENT", _count: { assignedTickets: 8 } }
  ];

  return <TeamsClient initialTeams={teams as any} initialAgents={agents as any} isAdmin={isAdmin} />; 
}
