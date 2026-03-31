"use client";

import * as React from "react";
import { useState } from "react";
import { submitPublicTicket } from "@/lib/mocks/publicTickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function SupportForm({ orgSlug }: { orgSlug: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      orgSlug,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
    };

    try {
      const res = await submitPublicTicket(data);
      if (res.success) {
        setIsSuccess(true);
        setTicketNumber(res.ticketNumber ?? null);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Ticket Submitted!</h2>
        <p className="text-zinc-400 mb-6">
          Your request has been securely delivered to the support team.
        </p>
        <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-zinc-500">Ticket Number</p>
          <p className="text-2xl font-mono text-white mt-1">#{ticketNumber}</p>
        </div>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-200">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Your Name *</label>
          <Input name="name" placeholder="John Doe" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Email Address *</label>
          <Input name="email" type="email" placeholder="john@example.com" required disabled={isSubmitting} />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Subject *</label>
        <Input name="subject" placeholder="Brief summary of your issue" required disabled={isSubmitting} />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Description *</label>
        <Textarea name="description" placeholder="Please provide as much detail as possible..." rows={6} required disabled={isSubmitting} />
      </div>
      
      <div className="pt-2 border-t border-zinc-800">
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Submit Ticket
        </Button>
      </div>
    </form>
  );
}
