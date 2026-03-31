"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Ticket,
  MessageSquare,
  Filter,
  Download,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";

// No mock data for brand new app
const mockClients: any[] = [];

export default function ClientsClient() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [clients, setClients] = React.useState(mockClients);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newClient, setNewClient] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingClient, setEditingClient] = React.useState<typeof mockClients[0] | null>(null);

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) return;
    
    const client = {
      id: String(Date.now()),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      company: newClient.company,
      avatar: null,
      status: "active" as const,
      ticketCount: 0,
      lastActivity: new Date(),
      satisfaction: 100,
    };
    
    setClients([client, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({ name: "", email: "", phone: "", company: "" });
  };

  const handleEditClick = (client: typeof mockClients[0]) => {
    setEditingClient(client);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingClient || !editingClient.name || !editingClient.email) return;
    setClients(clients.map((c) => (c.id === editingClient.id ? editingClient : c)));
    setIsEditModalOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  const filteredClients = React.useMemo(() => {
    if (!searchQuery) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        (client.company && client.company.toLowerCase().includes(query))
    );
  }, [clients, searchQuery]);

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Status", "Tickets", "Satisfaction"];
    const csvContent = [
      headers.join(","),
      ...clients.map(c => [
        `"${c.name}"`,
        `"${c.email}"`,
        `"${c.phone || ""}"`,
        `"${c.company || ""}"`,
        `"${c.status}"`,
        c.ticketCount,
        `${c.satisfaction}%`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-zinc-400">
            Manage your client directory and view their support history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">Total Clients</p>
            <p className="mt-1 text-3xl font-bold text-white">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">Active This Month</p>
            <p className="mt-1 text-3xl font-bold text-teal-400">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">New This Week</p>
            <p className="mt-1 text-3xl font-bold text-cyan-400">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">Avg. Satisfaction</p>
            <p className="mt-1 text-3xl font-bold text-emerald-400">0%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center gap-4">
        <Input
          placeholder="Search clients..."
          icon={<Search className="h-4 w-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredClients.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
            <div className="rounded-full bg-zinc-800/50 p-6 mb-4">
              <Users className="h-10 w-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Clients Yet</h3>
            <p className="text-zinc-500 max-w-xs mx-auto mb-6">
              Your client directory is currently empty. Start by adding your first client manually or via import.
            </p>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Your First Client
            </Button>
          </div>
        ) : filteredClients.map((client) => (
          <Card key={client.id} hover className="cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={client.avatar}
                    name={client.name}
                    size="lg"
                    status={client.status === "active" ? "online" : "offline"}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{client.name}</h3>
                    <p className="text-sm text-zinc-400">{client.company}</p>
                  </div>
                </div>
                <Dropdown
                  align="right"
                  trigger={
                    <button className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  }
                >
                  <div onClick={() => handleEditClick(client)}>
                    <DropdownItem icon={<Edit className="h-4 w-4" />}>
                      Edit Client
                    </DropdownItem>
                  </div>
                  <div onClick={() => handleDeleteClient(client.id)}>
                    <DropdownItem icon={<Trash2 className="h-4 w-4" />} destructive>
                      Delete Client
                    </DropdownItem>
                  </div>
                </Dropdown>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="h-4 w-4" />
                  {client.phone}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Ticket className="h-4 w-4" />
                    {client.ticketCount}
                  </span>
                  <span>{formatRelativeTime(client.lastActivity)}</span>
                </div>
                <Badge
                  variant={client.satisfaction >= 90 ? "success" : client.satisfaction >= 80 ? "warning" : "danger"}
                >
                  {client.satisfaction}% CSAT
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Client Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader onClose={() => setIsAddModalOpen(false)}>
          Add New Client
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Full Name <span className="text-red-500">*</span></label>
              <Input 
                placeholder="John Doe" 
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email <span className="text-red-500">*</span></label>
              <Input 
                type="email" 
                placeholder="john@example.com"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Phone</label>
              <Input 
                placeholder="+1 (555) 000-0000"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Company</label>
              <Input 
                placeholder="Acme Corp"
                value={newClient.company}
                onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddClient} 
            disabled={!newClient.name || !newClient.email}
          >
            Add Client
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Client Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalHeader onClose={() => setIsEditModalOpen(false)}>
          Edit Client
        </ModalHeader>
        <ModalBody>
          {editingClient && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Full Name <span className="text-red-500">*</span></label>
                <Input 
                  placeholder="John Doe" 
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email <span className="text-red-500">*</span></label>
                <Input 
                  type="email" 
                  placeholder="john@example.com"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Phone</label>
                <Input 
                  placeholder="+1 (555) 000-0000"
                  value={editingClient.phone || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Company</label>
                <Input 
                  placeholder="Acme Corp"
                  value={editingClient.company || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveEdit} 
            disabled={!editingClient?.name || !editingClient?.email}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
