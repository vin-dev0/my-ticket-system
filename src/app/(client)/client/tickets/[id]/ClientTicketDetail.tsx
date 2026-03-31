"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatDateTime, formatRelativeTime } from "@/lib/utils";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { addComment } from "@/lib/mocks/comments";
import { useRouter } from "next/navigation";

export default function ClientTicketDetail({ initialTicket }: { initialTicket: any }) {
  const router = useRouter();
  const [replyText, setReplyText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Filter out internal comments for the client
  const publicComments = initialTicket.comments?.filter((c: any) => !c.isInternal) || [];

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await addComment({ ticketId: initialTicket.id, content: replyText, isInternal: false });
      setReplyText("");
      router.refresh(); // Refresh page to see new comment
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6 pt-2">
        <div className="flex items-center gap-4">
          <Link
            href="/client"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-zinc-500">
                #{initialTicket.number}
              </span>
              <Badge variant="success" dot>
                {initialTicket.status}
              </Badge>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">
              {initialTicket.subject}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Discussion Thread */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Message */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/20">
            <div className="flex items-start gap-4">
              <Avatar
                src={initialTicket.creator.avatar}
                name={initialTicket.creator.name}
                size="md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">
                      {initialTicket.creator.name}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {formatDateTime(initialTicket.createdAt)}
                  </span>
                </div>
                <div className="mt-4 whitespace-pre-wrap text-zinc-300">
                  {initialTicket.description}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            {publicComments.map((comment: any) => (
              <div
                key={comment.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="flex items-start gap-4">
                  <Avatar
                    src={comment.author.avatar}
                    name={comment.author.name}
                    size="md"
                    className={
                      comment.author.role === "CLIENT" ? "" : "ring-2 ring-teal-500/50"
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {comment.author.name}
                        </span>
                        {comment.author.role !== "CLIENT" && (
                          <Badge variant="success" className="bg-teal-500/10 text-teal-400">
                            Support Team
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-zinc-500">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <div className="mt-2 whitespace-pre-wrap text-zinc-300">
                      {comment.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-xl">
             <Textarea
              placeholder="Type your reply to the support team..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="resize-none border-0 bg-transparent p-2 focus-visible:ring-0"
              rows={4}
            />
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
              <span className="text-xs text-zinc-500">Your replies are sent directly to your assigned agent.</span>
              <Button onClick={handleReply} disabled={!replyText.trim() || isSubmitting} isLoading={isSubmitting} className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20">
                <Send className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
            <h3 className="font-medium text-white mb-4">Request Status</h3>
            <div className="space-y-4">
               <div>
                  <p className="text-sm text-zinc-500">Status</p>
                  <Badge variant="success" className="mt-1">{initialTicket.status.replace("_", " ")}</Badge>
               </div>
               <div>
                  <p className="text-sm text-zinc-500">Priority</p>
                  <p className="text-sm font-medium text-zinc-300 mt-1">{initialTicket.priority.replace("_", " ")}</p>
               </div>
               {initialTicket.assignee && (
                 <div>
                    <p className="text-sm text-zinc-500">Assigned To</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar src={initialTicket.assignee.avatar} name={initialTicket.assignee.name} size="sm" />
                      <p className="text-sm font-medium text-white">{initialTicket.assignee.name}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
