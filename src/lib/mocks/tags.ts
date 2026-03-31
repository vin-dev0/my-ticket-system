
export async function getTags() {
  return [
    { id: "tag-1", name: "Billing", color: "#ef4444", ticketCount: 5 },
    { id: "tag-2", name: "Feature Request", color: "#3b82f6", ticketCount: 12 },
    { id: "tag-3", name: "Bug", color: "#10b981", ticketCount: 8 },
  ];
}

export async function createTag(data: { name: string; color: string; description?: string }) {
  console.log("Mock: Tag created", data);
  return { id: Math.random().toString(), ...data, ticketCount: 0 };
}

export async function deleteTag(id: string) {
  console.log("Mock: Tag deleted", id);
}
