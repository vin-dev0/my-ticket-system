"use client";

import * as React from "react";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Shield,
  Ban,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
  RefreshCw,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types for user data
interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export default function UserManagementPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<string>("all");
  const [pendingCount, setPendingCount] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch users on mount
  React.useEffect(() => {
    fetchUsers();
    fetchPendingCount();
  }, []);

  const fetchPendingCount = async () => {
    try {
      const res = await fetch("/api/join-requests?status=PENDING");
      if (res.ok) {
        const data = await res.json();
        setPendingCount(data.joinRequests?.length || 0);
      }
    } catch (err) {
      console.error("Failed to fetch pending count", err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("Failed to update user role");
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    }
  };

  // Filter users based on search and role
  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, selectedRole]);

  const roleColors: Record<string, string> = {
    OWNER: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    ADMIN: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    SUPERVISOR: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    AGENT: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    CUSTOMER: "bg-zinc-700/50 text-zinc-300 border-zinc-600",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-zinc-400 mt-1">
            View and manage all users in your organization.
          </p>
          {pendingCount > 0 && (
            <Link href="/admin/invites?tab=requests">
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors">
                <Bell className="h-4 w-4" />
                {pendingCount} pending member {pendingCount === 1 ? 'approval' : 'approvals'}
              </div>
            </Link>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchUsers}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/invites">
            <Button>
              <UserPlus className="h-4 w-4" />
              Invite User
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by name or email..."
            icon={<Search className="h-5 w-5" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-teal-500"
        >
          <option value="all">All Roles</option>
          <option value="OWNER">Owner</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="AGENT">Agent</option>
          <option value="CLIENT">Customer</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {["OWNER", "ADMIN", "SUPERVISOR", "AGENT", "CLIENT"].map((role) => (
          <div
            key={role}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
          >
            <p className="text-2xl font-bold text-white">
              {users.filter((u) => u.role === role).length}
            </p>
            <p className="text-zinc-500 text-sm">{role.charAt(0) + role.slice(1).toLowerCase()}s</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="h-8 w-8 text-teal-500 animate-spin mx-auto" />
            <p className="text-zinc-400 mt-4">Loading users...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-rose-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={fetchUsers}>
              Try Again
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 mt-4">No users found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">User</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">Role</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">Joined</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-medium text-sm">Last Login</th>
                <th className="text-right py-3 px-4 text-zinc-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name || "No name"}</p>
                        <p className="text-zinc-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded border ${roleColors[user.role]} bg-transparent cursor-pointer focus:outline-none`}
                    >
                      <option value="OWNER">Owner</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPERVISOR">Supervisor</option>
                      <option value="AGENT">Agent</option>
                      <option value="CLIENT">Customer</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {user.isActive ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-zinc-500 text-sm">
                        <Ban className="h-4 w-4" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-zinc-500 text-sm">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id, user.isActive)}
                      >
                        {user.isActive ? (
                          <>
                            <Ban className="h-4 w-4" />
                            Disable
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Enable
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-zinc-500 text-sm">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

