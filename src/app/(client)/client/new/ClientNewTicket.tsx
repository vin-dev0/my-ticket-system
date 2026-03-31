"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/dropdown";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Paperclip, HelpCircle, AlertTriangle, XCircle, CheckSquare, Lightbulb, Check } from "lucide-react";
import Link from "next/link";
import { createTicket } from "@/lib/mocks/tickets";

export default function ClientNewTicket({ availableTags = [] }: { availableTags?: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, setType] = React.useState("QUESTION");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTicket({
        subject,
        description,
        type,
        priority: "MEDIUM",
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      });
      router.push("/client");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6 pt-2">
        <div>
          <Link
            href="/client"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">Submit a Request</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Provide details about your issue and we'll get back to you shortly.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Provide clear information about your request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Subject *
                  </label>
                  <Input
                    placeholder="Brief description of your issue"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Provide detailed information about your issue..."
                    rows={8}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Attachments (Optional)
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-zinc-700 p-8 text-center transition-colors hover:border-zinc-600">
                    <Paperclip className="mx-auto h-8 w-8 text-zinc-500" />
                    <p className="mt-2 text-sm text-zinc-400">
                      Drag and drop files here, or <span className="cursor-pointer text-teal-400 hover:underline">browse</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Category
                  </label>
                  <Select
                    value={type}
                    onChange={setType}
                    options={[
                      { value: "QUESTION", label: "Question", icon: <HelpCircle className="h-4 w-4 text-cyan-400" /> },
                      { value: "INCIDENT", label: "Incident", icon: <AlertTriangle className="h-4 w-4 text-amber-400" /> },
                      { value: "PROBLEM", label: "Problem", icon: <XCircle className="h-4 w-4 text-rose-400" /> },
                      { value: "TASK", label: "Task", icon: <CheckSquare className="h-4 w-4 text-emerald-400" /> },
                      { value: "FEATURE_REQUEST", label: "Feature Request", icon: <Lightbulb className="h-4 w-4 text-violet-400" /> },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                   {availableTags.length === 0 && <span className="text-zinc-500 text-sm">No tags available</span>}
                   {availableTags.map((tag) => {
                     const isSelected = selectedTags.includes(tag.id);
                     return (
                       <button
                         key={tag.id}
                         type="button"
                         onClick={() => toggleTag(tag.id)}
                         className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                           isSelected
                             ? "text-white"
                             : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                         }`}
                         style={isSelected ? { backgroundColor: tag.color } : {}}
                       >
                         {tag.name}
                         {isSelected && <Check className="h-3 w-3" />}
                       </button>
                     );
                   })}
                 </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20" size="lg" disabled={!subject || !description || isSubmitting} isLoading={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              Submit Ticket
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
