"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Star,
  Filter,
  MoreHorizontal,
  Sparkles,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  type: "ticket" | "email" | "message";
  subject?: string;
  content: string;
  category: string;
  isFavorite: boolean;
  usageCount: number;
  createdAt: string;
}

// No mock data for brand new app
const sampleTemplates: Template[] = [];

const typeIcons = {
  ticket: FileText,
  email: Mail,
  message: MessageSquare,
};

const typeColors = {
  ticket: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  email: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  message: "bg-teal-500/10 text-teal-400 border-teal-500/30",
};

export default function TemplatesClient() {
  const { data: session, status } = useSession();
  const [templates, setTemplates] = React.useState<Template[]>(sampleTemplates);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  const userPlan = (session?.user as any)?.plan || "STARTER";
  const userRole = (session?.user as any)?.role || "CLIENT";

  // Check if user has Pro access (Pro/Enterprise plan OR Admin/Owner role)
  const hasProAccess = userPlan === "PRO" || userPlan === "ENTERPRISE" || userRole === "ADMIN" || userRole === "OWNER";

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  };

  if (!hasProAccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
            <Lock className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Pro Feature</h2>
          <p className="mt-3 text-zinc-400">
            Templates are available on the Pro plan. Create reusable ticket, email, and messaging
            templates to speed up your workflow.
          </p>
          <Button className="mt-6">
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Templates</h1>
          <p className="mt-1 text-zinc-400">
            Create and manage reusable templates for tickets, emails, and messages
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search templates..."
            icon={<Search className="h-4 w-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "ticket", "email", "message"].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === type
                  ? "bg-teal-500/20 text-teal-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => {
          const Icon = typeIcons[template.type];
          return (
            <div
              key={template.id}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-lg border p-2", typeColors[template.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    <p className="text-xs text-zinc-500">{template.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(template.id)}
                  className="text-zinc-600 transition-colors hover:text-amber-400"
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      template.isFavorite && "fill-amber-400 text-amber-400"
                    )}
                  />
                </button>
              </div>

              {template.subject && (
                <p className="mb-2 text-sm font-medium text-zinc-300">{template.subject}</p>
              )}

              <p className="line-clamp-3 text-sm text-zinc-500">{template.content}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-600">Used {template.usageCount} times</span>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon-sm" onClick={() => setSelectedTemplate(template)}>
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-rose-400 hover:text-rose-300">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="mt-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-zinc-700" />
          <p className="mt-4 text-zinc-400">No templates found</p>
          <Button variant="outline" className="mt-4" onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Create your first template
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={createModalOpen || !!selectedTemplate} onClose={() => { setCreateModalOpen(false); setSelectedTemplate(null); }} size="lg">
        <ModalHeader onClose={() => { setCreateModalOpen(false); setSelectedTemplate(null); }}>
          {selectedTemplate ? "Edit Template" : "Create Template"}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Template Name</label>
              <Input placeholder="e.g., Welcome Response" defaultValue={selectedTemplate?.name} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Type</label>
              <select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white">
                <option value="ticket">Ticket Response</option>
                <option value="email">Email</option>
                <option value="message">Quick Message</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Subject (optional)</label>
              <Input placeholder="Email/ticket subject line" defaultValue={selectedTemplate?.subject} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Content</label>
              <textarea
                className="h-40 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="Use {{variable_name}} for dynamic content..."
                defaultValue={selectedTemplate?.content}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Available variables: {`{{customer_name}}, {{agent_name}}, {{ticket_id}}, {{company_name}}`}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setCreateModalOpen(false); setSelectedTemplate(null); }}>
            Cancel
          </Button>
          <Button>
            {selectedTemplate ? "Save Changes" : "Create Template"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

