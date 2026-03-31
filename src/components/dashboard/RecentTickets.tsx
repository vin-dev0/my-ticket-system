"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatRelativeTime, priorityColors, statusColors } from "@/lib/utils";
import { ChevronRight, MessageSquare } from "lucide-react";

// Mock data for demo
// No mock data for brand new app
export function RecentTickets({ tickets = [] }: { tickets?: any[] }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Tickets</h3>
          <p className="text-sm text-zinc-400">Latest support requests</p>
        </div>
        <Link
          href="/tickets"
          className="flex items-center gap-1 text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="divide-y divide-zinc-800">
        {tickets.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-center">
             <div className="rounded-full bg-zinc-800/50 p-4 mb-3">
               <MessageSquare className="h-8 w-8 text-zinc-600" />
             </div>
             <p className="text-zinc-400">No recent tickets found.</p>
           </div>
        ) : tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-800/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-zinc-500">
                  #{ticket.number}
                </span>
                <Badge
                  variant={
                    ticket.status === "OPEN"
                      ? "success"
                      : ticket.status === "PENDING"
                      ? "warning"
                      : ticket.status === "ON_HOLD"
                      ? "default"
                      : "info"
                  }
                  dot
                >
                  {ticket.status.replace("_", " ")}
                </Badge>
                <Badge
                  variant={
                    ticket.priority === "URGENT"
                      ? "danger"
                      : ticket.priority === "HIGH"
                      ? "warning"
                      : ticket.priority === "LOW"
                      ? "default"
                      : "secondary"
                  }
                >
                  {ticket.priority}
                </Badge>
              </div>
              <p className="mt-1 truncate font-medium text-white">
                {ticket.subject}
              </p>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-500">
                <span>by {ticket.creator.name}</span>
                <span>•</span>
                <span>{formatRelativeTime(ticket.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {ticket.assignee ? (
                <Avatar
                  src={ticket.assignee.avatar}
                  name={ticket.assignee.name}
                  size="sm"
                />
              ) : (
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                  Unassigned
                </span>
              )}
              <div className="flex items-center gap-1 text-zinc-500">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{ticket.commentsCount}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



