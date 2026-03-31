
import { MOCK_TICKETS } from "@/lib/mock-data";

export async function createTicket(data: any) {
  console.log("Mock: Ticket created locally (not saved)", data);
  return { id: Math.random().toString(), ...data, number: 9999, createdAt: new Date().toISOString() };
}

export async function getTickets() {
  return MOCK_TICKETS.map(ticket => ({
    ...ticket,
    creator: {
      ...ticket.creator,
      name: ticket.creator.name || "Mock User"
    },
    assignee: ticket.assignee ? {
      ...ticket.assignee,
      name: ticket.assignee.name || "Mock User"
    } : null,
    tags: ["mock-tag"],
    commentsCount: 2,
    attachmentsCount: 1,
  }));
}

export async function updateTicketTags(ticketId: string, tagIds: string[]) {
  console.log("Mock: Tags updated", { ticketId, tagIds });
}

export async function updateTicketStatus(ticketId: string, status: string) {
  console.log("Mock: Status updated", { ticketId, status });
}

export async function updateTicketPriority(ticketId: string, priority: string) {
  console.log("Mock: Priority updated", { ticketId, priority });
}

export async function claimTicket(ticketId: string) {
  console.log("Mock: Ticket claimed", { ticketId });
}

export async function bulkUpdateTicketStatus(ticketIds: string[], status: string) {
  console.log("Mock: Bulk status updated", { ticketIds, status });
}

export async function toggleTicketLock(ticketId: string) {
  console.log("Mock: Ticket lock toggled", { ticketId });
}

export async function bulkDeleteTickets(ticketIds: string[]) {
  console.log("Mock: Bulk delete", { ticketIds });
}

export async function bulkAssignTickets(ticketIds: string[], assigneeId: string) {
  console.log("Mock: Bulk assign", { ticketIds, assigneeId });
}

export async function bulkAssignTicketsByEmail(ticketIds: string[], email: string) {
  console.log("Mock: Bulk assign by email", { ticketIds, email });
}

export async function bulkAddTag(ticketIds: string[], tagName: string) {
  console.log("Mock: Bulk add tag", { ticketIds, tagName });
}

export async function getTicketCounts() {
  return {
    total: MOCK_TICKETS.length,
    open: MOCK_TICKETS.filter(t => t.status === "OPEN").length,
    pending: MOCK_TICKETS.filter(t => t.status === "PENDING").length,
    onHold: 0,
    solved: MOCK_TICKETS.filter(t => t.status === "SOLVED").length,
  };
}
