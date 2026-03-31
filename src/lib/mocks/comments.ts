export async function createComment(ticketId: string, content: string, isInternal: boolean = false) {
  console.log("Mock: Comment created", { ticketId, content, isInternal });
  return { id: Math.random().toString(), content, isInternal, createdAt: new Date().toISOString(), author: { name: "Demo User", role: "AGENT" } };
}

// Alias for addComment which is used in some components
export const addComment = createComment;

export async function deleteComment(id: string) {
  console.log("Mock: Comment deleted", id);
}
