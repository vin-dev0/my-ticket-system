"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/dropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { cn, formatDateTime, formatRelativeTime } from "@/lib/utils";
import {
  ArrowLeft,
  Send,
  Paperclip,
  MoreHorizontal,
  Clock,
  User,
  Tag,
  MessageSquare,
  Eye,
  History,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Lock,
  Plus,
  Check,
  X,
} from "lucide-react";
import { addComment } from "@/lib/mocks/comments";
import { updateTicketTags, updateTicketStatus, updateTicketPriority, claimTicket, toggleTicketLock, bulkDeleteTickets } from "@/lib/mocks/tickets";
import { useRouter } from "next/navigation";

const mockActivities: any[] = [];
export default function TicketDetailClient({ 
  initialTicket, 
  availableTags = [],
  isAdmin = false
}: { 
  initialTicket: any, 
  availableTags?: any[],
  isAdmin?: boolean
}) {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("comments");
  const [replyText, setReplyText] = React.useState("");
  const [isInternal, setIsInternal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);
  const [isUpdatingPriority, setIsUpdatingPriority] = React.useState(false);

  const [isTagDropdownOpen, setIsTagDropdownOpen] = React.useState(false);
  const [isUpdatingTags, setIsUpdatingTags] = React.useState(false);
  
  const [isLocked, setIsLocked] = React.useState(initialTicket.isLocked);
  const [isTogglingLock, setIsTogglingLock] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  // Track selected tag IDs locally and their full objects for display
  const [selectedTagObjects, setSelectedTagObjects] = React.useState<any[]>(initialTicket.tags || []);

  const mockTicket = {
    ...initialTicket,
    team: initialTicket.team || { name: "Support", color: "#14b8a6" },
    watchers: initialTicket.watchers || [],
  };
  const mockComments = initialTicket.comments || [];

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await addComment({ ticketId: initialTicket.id, content: replyText, isInternal });
      setReplyText("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTag = async (tag: any) => {
    setIsUpdatingTags(true);
    const isCurrentlySelected = selectedTagObjects.some(t => t.id === tag.id);
    let newTags = [];
    if (isCurrentlySelected) {
      newTags = selectedTagObjects.filter(t => t.id !== tag.id);
    } else {
      newTags = [...selectedTagObjects, tag];
    }
    
    setSelectedTagObjects(newTags);
    try {
      await updateTicketTags(initialTicket.id, newTags.map(t => t.id));
    } catch (e) {
      console.error(e);
      // Revert on error
      setSelectedTagObjects(selectedTagObjects);
    } finally {
      setIsUpdatingTags(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    setIsUpdatingStatus(true);
    try {
      await updateTicketStatus(initialTicket.id, value);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (value: string) => {
    setIsUpdatingPriority(true);
    try {
      await updateTicketPriority(initialTicket.id, value);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingPriority(false);
    }
  };

  const handleClaimTicket = async () => {
    try {
      await claimTicket(initialTicket.id);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleLock = async () => {
    setIsTogglingLock(true);
    try {
      await toggleTicketLock(initialTicket.id);
      setIsLocked(!isLocked);
      alert(isLocked ? "Ticket unlocked" : "Ticket locked");
    } catch (e: any) {
      alert(e.message || "Failed to toggle lock");
    } finally {
      setIsTogglingLock(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    setIsDeleting(true);
    try {
      await bulkDeleteTickets([initialTicket.id]);
      alert("Ticket deleted");
      router.push("/tickets");
    } catch (e: any) {
      alert(e.message || "Failed to delete ticket");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/tickets"
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-zinc-500">
                    #{mockTicket.number}
                  </span>
                  <Badge variant="success" dot>
                    {mockTicket.status}
                  </Badge>
                  <Badge variant="warning">{mockTicket.priority}</Badge>
                  {isLocked && (
                    <Badge variant="danger">
                      <Lock className="h-3 w-3 mr-1" /> Locked
                    </Badge>
                  )}
                </div>
                <h1 className="mt-1 text-lg font-semibold text-white">
                  {mockTicket.subject}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="secondary" size="sm">
                <CheckCircle2 className="h-4 w-4" />
                Resolve
              </Button>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleToggleLock}
                  isLoading={isTogglingLock}
                  className={isLocked ? "text-rose-400 border-rose-500/30 hover:bg-rose-500/10" : ""}
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : <Lock className="h-4 w-4 opacity-50" />}
                  {isLocked ? "Unlock" : "Lock"}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDelete}
                isLoading={isDeleting}
                disabled={isLocked && !isAdmin}
                className="text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Original Message */}
          <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <div className="flex items-start gap-4">
              <Avatar
                src={mockTicket.creator.avatar}
                name={mockTicket.creator.name}
                size="md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">
                      {mockTicket.creator.name}
                    </span>
                    <span className="ml-2 text-sm text-zinc-500">
                      {mockTicket.creator.email}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {formatDateTime(mockTicket.createdAt)}
                  </span>
                </div>
                <div className="mt-4 whitespace-pre-wrap text-zinc-300">
                  {mockTicket.description}
                </div>
              </div>
            </div>
          </div>

          {/* Comments/Activity Tabs */}
          <Tabs value={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab value="comments" icon={<MessageSquare className="h-4 w-4" />}>
                Comments
              </Tab>
              <Tab value="activity" icon={<History className="h-4 w-4" />}>
                Activity
              </Tab>
            </TabList>

            <TabPanel value="comments">
              <div className="space-y-4">
                {mockComments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className={cn(
                      "rounded-xl border p-4",
                      comment.isInternal
                        ? "border-amber-500/30 bg-amber-500/5"
                        : "border-zinc-800 bg-zinc-900/50"
                    )}
                  >
                    {comment.isInternal && (
                      <div className="mb-3 flex items-center gap-2 text-xs text-amber-400">
                        <Lock className="h-3 w-3" />
                        Internal Note
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={comment.author.avatar}
                        name={comment.author.name}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {comment.author.name}
                          </span>
                          <Badge variant="secondary" className="text-[10px]">
                            {comment.author.role}
                          </Badge>
                          <span className="text-xs text-zinc-500">
                            {formatRelativeTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="mt-2 text-zinc-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel value="activity">
              <div className="space-y-3">
                {mockActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-zinc-600" />
                    <span className="text-zinc-300">{activity.action}</span>
                    <span className="text-zinc-500">by {activity.user}</span>
                    <span className="text-zinc-600">
                      {formatRelativeTime(activity.time)}
                    </span>
                  </div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Reply Box */}
        <div className="border-t border-zinc-800 p-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
              <button
                onClick={() => setIsInternal(false)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  !isInternal
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                Public Reply
              </button>
              <button
                onClick={() => setIsInternal(true)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isInternal
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <Lock className="h-3 w-3" />
                Internal Note
              </button>
            </div>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                isInternal
                  ? "Add an internal note (only visible to agents)..."
                  : "Write your reply to the customer..."
              }
              className="border-0 bg-transparent focus:ring-0"
              rows={3}
            />
            <div className="flex items-center justify-between px-4 py-3">
              <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                <Paperclip className="h-5 w-5" />
              </button>
              <Button size="sm" disabled={!replyText.trim() || isSubmitting} isLoading={isSubmitting} onClick={handleReply}>
                <Send className="h-4 w-4" />
                {isInternal ? "Add Note" : "Send Reply"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 shrink-0 overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-4">
        <div className="space-y-6">
          {/* Requester */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Requester</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar
                  src={mockTicket.creator.avatar}
                  name={mockTicket.creator.name}
                  size="md"
                />
                <div>
                  <p className="font-medium text-white">
                    {mockTicket.creator.name}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {mockTicket.creator.company}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-zinc-400">{mockTicket.creator.email}</p>
                <a
                  href="#"
                  className="flex items-center gap-1 text-teal-400 hover:underline"
                >
                  View profile <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Properties */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={isUpdatingStatus ? "opacity-50 pointer-events-none" : ""}>
                <label className="text-xs text-zinc-500">Status</label>
                <Select
                  value={mockTicket.status}
                  onChange={handleStatusChange}
                  options={[
                    { value: "OPEN", label: "Open" },
                    { value: "PENDING", label: "Pending" },
                    { value: "ON_HOLD", label: "On Hold" },
                    { value: "SOLVED", label: "Solved" },
                  ]}
                  className="mt-1"
                />
              </div>
              <div className={isUpdatingPriority ? "opacity-50 pointer-events-none" : ""}>
                <label className="text-xs text-zinc-500">Priority</label>
                <Select
                  value={mockTicket.priority}
                  onChange={handlePriorityChange}
                  options={[
                    { value: "LOW", label: "Low" },
                    { value: "MEDIUM", label: "Medium" },
                    { value: "HIGH", label: "High" },
                    { value: "URGENT", label: "Urgent" },
                  ]}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500">Assignee</label>
                <div className="mt-1 flex items-center justify-between">
                  {mockTicket.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={mockTicket.assignee.avatar}
                        name={mockTicket.assignee.name}
                        size="sm"
                      />
                      <span className="text-sm text-zinc-300">
                        {mockTicket.assignee.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-500">Unassigned</span>
                  )}
                  
                  {!mockTicket.assignee && (
                    <Button onClick={handleClaimTicket} variant="outline" size="sm" className="h-7 text-xs px-2 ml-2">
                      Claim
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500">Team</label>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: mockTicket.team.color }}
                  />
                  <span className="text-sm text-zinc-300">
                    {mockTicket.team.name}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card variant="glass" className="relative z-10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 relative">
                {selectedTagObjects.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-white"
                    style={{ backgroundColor: tag.color || "#3f3f46" }}
                  >
                    {tag.name}
                    <button 
                      onClick={() => handleToggleTag(tag)}
                      disabled={isUpdatingTags}
                      className="ml-1 rounded-full p-0.5 hover:bg-black/20 disabled:opacity-50"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                <div className="relative">
                  <button 
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    disabled={isUpdatingTags}
                    className="rounded-full border border-dashed border-zinc-700 px-2.5 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-400 disabled:opacity-50"
                  >
                    <Plus className="h-3 w-3 inline mr-1" /> Add
                  </button>

                  {isTagDropdownOpen && (
                    <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
                      <div className="mb-2 px-2 text-xs font-medium text-zinc-500">Available Tags</div>
                      {availableTags.length === 0 ? (
                        <div className="px-2 py-1 text-xs text-zinc-500">No tags available</div>
                      ) : (
                        <div className="max-h-40 overflow-y-auto space-y-1">
                          {availableTags.map((tag) => {
                            const isSelected = selectedTagObjects.some((t: any) => t.id === tag.id);
                            return (
                              <button
                                key={tag.id}
                                onClick={() => handleToggleTag(tag)}
                                className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-xs transition-colors hover:bg-zinc-800"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} />
                                  <span className="text-zinc-300">{tag.name}</span>
                                </div>
                                {isSelected && <Check className="h-3 w-3 text-teal-500" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>



          {/* SLA - Only show if implemented, for now hide or show empty */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">SLA Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-zinc-500 italic">No SLA policy applied</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



