
export async function updateUserProfile(userId: string, data: { name?: string; avatar?: string }) {
  console.log("Mock: Profile updated", { userId, data });
}

export async function getAgents() {
  return [
    { id: "mock-user-id", name: "Demo User", email: "demo@example.com", image: null },
    { id: "agent-1", name: "Agent Smith", email: "smith@example.com", image: null },
    { id: "agent-2", name: "Agent Jones", email: "jones@example.com", image: null },
  ];
}
