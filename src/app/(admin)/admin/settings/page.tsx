"use client";

import * as React from "react";
import {
  Settings,
  Globe,
  Palette,
  Mail,
  Database,
  Bell,
  Shield,
  Save,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
          <p className="text-zinc-400 mt-1">
            Configure system-wide settings and preferences.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-teal-500/10">
                <Globe className="h-5 w-5 text-teal-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">General</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Company Name
                </label>
                <Input defaultValue="SimplyTicket Inc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Support Email
                </label>
                <Input defaultValue="support@simplyticket.net" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-teal-500">
                  <option>America/New_York (EST)</option>
                  <option>America/Los_Angeles (PST)</option>
                  <option>Europe/London (GMT)</option>
                  <option>Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Email Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  SMTP Host
                </label>
                <Input defaultValue="smtp.simplyticket.net" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    SMTP Port
                  </label>
                  <Input defaultValue="587" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Encryption
                  </label>
                  <select className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-teal-500">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Settings */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Database className="h-5 w-5 text-violet-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Data & Storage</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Data Retention Period
                </label>
                <select className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-teal-500">
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>Forever</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Max Attachment Size
                </label>
                <select className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 focus:outline-none focus:border-teal-500">
                  <option>10 MB</option>
                  <option>25 MB</option>
                  <option>50 MB</option>
                  <option>100 MB</option>
                </select>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Clear Cache
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Bell className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-zinc-300">Email notifications for new tickets</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-teal-500 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-zinc-300">SLA breach alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-teal-500 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-zinc-300">Daily summary reports</span>
                <input type="checkbox" className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-teal-500 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-zinc-300">Security alerts</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-teal-500 focus:ring-teal-500" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-rose-500/5 border border-rose-500/20 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-rose-400 mb-4">Danger Zone</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-white font-medium">Export All Data</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Download a complete backup of all your data.
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              Export Data
            </Button>
          </div>
          <div>
            <h3 className="text-white font-medium">Delete All Tickets</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Permanently delete all tickets. This cannot be undone.
            </p>
            <Button variant="outline" size="sm" className="mt-3 border-rose-500/50 text-rose-400 hover:bg-rose-500/10">
              Delete All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

