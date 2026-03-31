
export async function createTeam(data: any) {
  console.log("Mock: Team created", data);
}

export async function inviteAgent(data: any) {
  console.log("Mock: Agent invited", data);
  return { code: "MOCK-INVITE-CODE" };
}

export async function getPendingInvites() {
  return [
    { id: "invite-1", code: "MOCK-CODE-1", email: "pending@example.com", createdAt: new Date().toISOString() },
  ];
}

export async function revokeInvite(id: string) {
  console.log("Mock: Invite revoked", id);
}

export async function redeemInvite(code: string) {
  console.log("Mock: Invite redeemed", code);
  return { success: true, organizationName: "Demo Org" };
}

export async function removeUserFromTeam(teamId: string, userId: string) {
  console.log("Mock: User removed from team", { teamId, userId });
}
