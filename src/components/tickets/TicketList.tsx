"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/dropdown";
import { cn, formatRelativeTime } from "@/lib/utils";
import { bulkDeleteTickets, bulkUpdateTicketStatus, bulkAssignTicketsByEmail, bulkAddTag } from "@/lib/mocks/tickets";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ArrowUpDown,
  Lock,
} from "lucide-react";

// No mock data needed here as we use initialTickets prop

const statusVariants = {
  OPEN: "success",
  PENDING: "warning",
  ON_HOLD: "default",
  SOLVED: "info",
  CLOSED: "secondary",
} as const;

const priorityVariants = {
  LOW: "default",
  MEDIUM: "secondary",
  HIGH: "warning",
  URGENT: "danger",
} as const;

interface TicketListProps {
  statusFilter?: string | null;
  tagFilter?: string | null;
  initialTickets: any[];
  ticketLinkPrefix?: string;
  clearFilterLink?: string;
}

export function TicketList({ 
  statusFilter: urlStatusFilter, 
  tagFilter, 
  initialTickets = [],
  ticketLinkPrefix = "/tickets",
  clearFilterLink = "/tickets"
}: TicketListProps) {
  const [selectedTickets, setSelectedTickets] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [localStatusFilter, setLocalStatusFilter] = React.useState("all");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleBulkDelete = () => {
    startTransition(async () => {
      try {
        await bulkDeleteTickets(selectedTickets);
        setSelectedTickets([]);
        router.refresh();
      } catch (e) {
        console.error(e);
        alert("Failed to delete tickets");
      }
    });
  };

  const handleBulkStatusChange = (status: string) => {
    if (!status || status === "change_status") return;
    startTransition(async () => {
      try {
        await bulkUpdateTicketStatus(selectedTickets, status);
        setSelectedTickets([]);
        router.refresh();
      } catch (e) {
        console.error(e);
        alert("Failed to update status");
      }
    });
  };

  const handleBulkAssign = () => {
    const email = prompt("Enter the email of the agent to assign these tickets to:");
    if (email) {
      startTransition(async () => {
        try {
          await bulkAssignTicketsByEmail(selectedTickets, email);
          setSelectedTickets([]);
          router.refresh();
        } catch (e: any) {
          alert("Failed to assign tickets: " + e.message);
        }
      });
    }
  };

  const handleBulkTags = () => {
    const tag = prompt("Enter a tag to add to these tickets (e.g. 'urgent', 'bug'):");
    if (tag) {
      startTransition(async () => {
        try {
          await bulkAddTag(selectedTickets, tag);
          setSelectedTickets([]);
          router.refresh();
        } catch (e: any) {
          alert("Failed to add tags: " + e.message);
        }
      });
    }
  };

  // Use URL filter if provided, otherwise use local filter
  const activeStatusFilter = urlStatusFilter || (localStatusFilter !== "all" ? localStatusFilter : null);

  // Filter tickets based on search and status
  const filteredTickets = React.useMemo(() => {
    return initialTickets.filter((ticket) => {
      // Status filter
      if (activeStatusFilter && ticket.status !== activeStatusFilter) {
        return false;
      }

      // Tag filter
      if (tagFilter && !ticket.tags.some((t: string) => t.toLowerCase() === tagFilter.toLowerCase())) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          ticket.subject.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.creator.name.toLowerCase().includes(query) ||
          ticket.number.toString().includes(query) ||
          ticket.tags.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [activeStatusFilter, searchQuery]);

  const toggleTicketSelection = (id: string) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleAllTickets = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map((t) => t.id));
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tickets..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          {!urlStatusFilter && (
            <Select
              value={localStatusFilter}
              onChange={setLocalStatusFilter}
              options={[
                { value: "all", label: "All Status" },
                { value: "OPEN", label: "Open" },
                { value: "PENDING", label: "Pending" },
                { value: "ON_HOLD", label: "On Hold" },
                { value: "SOLVED", label: "Solved" },
              ]}
              className="w-40"
            />
          )}
          {tagFilter && (
            <div className="flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm text-teal-400">
              <span className="font-medium">Tag:</span> {tagFilter}
              <Link href={clearFilterLink} className="ml-1 rounded-full p-0.5 hover:bg-teal-500/20">
                <AlertCircle className="h-3 w-3" />
              </Link>
            </div>
          )}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            View
          </Button>
        </div>
        
        {selectedTickets.length > 0 && (
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-teal-500/10 p-3">
            <span className="text-sm font-medium text-teal-400">
              {selectedTickets.length} ticket(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBulkAssign} disabled={isPending}>Assign</Button>
              <Select
                value="change_status"
                onChange={(val) => {
                  if (val !== "change_status") handleBulkStatusChange(val);
                }}
                options={[
                  { value: "change_status", label: "Change Status..." },
                  { value: "OPEN", label: "Open" },
                  { value: "PENDING", label: "Pending" },
                  { value: "ON_HOLD", label: "On Hold" },
                  { value: "SOLVED", label: "Solved" },
                  { value: "CLOSED", label: "Closed" },
                ]}
                className="w-36 h-8 text-sm"
              />
              <Button variant="ghost" size="sm" onClick={handleBulkTags} disabled={isPending}>Add Tags</Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-rose-400 hover:text-rose-300"
                onClick={handleBulkDelete}
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Delete"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[auto,1fr,120px,100px,150px,120px,50px] items-center gap-4 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
        <div>
          <input
            type="checkbox"
            checked={filteredTickets.length > 0 && selectedTickets.length === filteredTickets.length}
            onChange={toggleAllTickets}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
          />
        </div>
        <div className="flex items-center gap-1">
          Ticket <ArrowUpDown className="h-3 w-3" />
        </div>
        <div>Status</div>
        <div>Priority</div>
        <div>Assignee</div>
        <div className="flex items-center gap-1">
          Updated <ArrowUpDown className="h-3 w-3" />
        </div>
        <div></div>
      </div>

      {/* Ticket Rows */}
      <div className="flex-1 overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-12 w-12 text-zinc-600" />
            <p className="mt-4 text-lg font-medium text-zinc-400">No tickets found</p>
            <p className="text-sm text-zinc-500">
              {searchQuery
                ? "Try adjusting your search query"
                : activeStatusFilter
                ? `No ${activeStatusFilter.toLowerCase().replace("_", " ")} tickets`
                : "No tickets to display"}
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isSelected = selectedTickets.includes(ticket.id);

            return (
              <div
                key={ticket.id}
                className={cn(
                  "grid grid-cols-[auto,1fr,120px,100px,150px,120px,50px] items-center gap-4 border-b border-zinc-800/50 px-4 py-4 transition-colors hover:bg-zinc-800/30",
                  isSelected && "bg-teal-500/5"
                )}
              >
                {/* Checkbox */}
                <div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTicketSelection(ticket.id)}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
                  />
                </div>

                {/* Ticket Info */}
                <Link href={`${ticketLinkPrefix}/${ticket.id}`} className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-zinc-500">
                      #{ticket.number}
                    </span>
                    {ticket.isLocked && (
                      <Lock className="h-3 w-3 text-rose-400" />
                    )}
                    <div className="flex flex-wrap gap-1">
                      {ticket.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 truncate font-medium text-white hover:text-teal-400">
                    {ticket.subject}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                    <span>{ticket.creator.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {ticket.commentsCount}
                    </span>
                    {ticket.attachmentsCount > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {ticket.attachmentsCount}
                        </span>
                      </>
                    )}
                  </div>
                </Link>

                {/* Status */}
                <div>
                  <Badge variant={statusVariants[ticket.status as keyof typeof statusVariants]} dot>
                    {ticket.status.replace("_", " ")}
                  </Badge>
                </div>

                {/* Priority */}
                <div>
                  <Badge variant={priorityVariants[ticket.priority as keyof typeof priorityVariants]}>
                    {ticket.priority}
                  </Badge>
                </div>

                {/* Assignee */}
                <div>
                  {ticket.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={ticket.assignee.avatar}
                        name={ticket.assignee.name}
                        size="xs"
                      />
                      <span className="truncate text-sm text-zinc-300">
                        {ticket.assignee.name.split(" ")[0]}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-500">Unassigned</span>
                  )}
                </div>

                {/* Updated */}
                <div className="text-sm text-zinc-500">
                  {formatRelativeTime(ticket.updatedAt)}
                </div>

                {/* Actions */}
                <div>
                  <button className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
        <p className="text-sm text-zinc-500">
          Showing <span className="font-medium text-zinc-300">{filteredTickets.length}</span> of{" "}
          <span className="font-medium text-zinc-300">{initialTickets.length}</span> tickets
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-lg bg-teal-500/20 text-sm font-medium text-teal-400">
              1
            </button>
          </div>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
