"use client";

import * as React from "react";
import {
  Shield,
  Lock,
  Clock,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";
import { getOrganizationSettings, updateOrganizationSettings } from "@/lib/mocks/organizations";

export default function SecurityPage() {
  const [activeConfig, setActiveConfig] = React.useState<string | null>(null);
  const [settings, setSettings] = React.useState<any>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const fetchSettings = async () => {
      const data = await getOrganizationSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleUpdateSetting = async (key: string, value: any) => {
    setIsSubmitting(true);
    try {
      const updated = await updateOrganizationSettings({ [key]: value });
      setSettings(updated);
      alert("Setting updated successfully");
    } catch (e: any) {
      alert(e.message || "Error updating setting");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAll = async (newSettings: any) => {
    setIsSubmitting(true);
    try {
      const updated = await updateOrganizationSettings(newSettings);
      setSettings(updated);
      setActiveConfig(null);
      alert("Policy updated successfully");
    } catch (e: any) {
      alert(e.message || "Error saving policy");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Center</h1>
          <p className="text-zinc-400 mt-1">
            Manage organization security policies and audit and access logs.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Badge variant="success" dot>System Secure</Badge>
          <span className="text-zinc-500">Last audit: Today, 10:45 AM</span>
        </div>
      </div>

      {/* Security Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Security Grade</span>
            </div>
            <p className="text-3xl font-bold text-white">A+</p>
            <p className="text-xs text-zinc-500 mt-1">No vulnerabilities detected</p>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium text-zinc-400">MFA Adoption</span>
            </div>
            <p className="text-3xl font-bold text-white">85%</p>
            <p className="text-xs text-emerald-400 mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-zinc-400">Active Sessions</span>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-xs text-zinc-500 mt-1">Across 3 departments</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="h-5 w-5 text-violet-400" />
              <span className="text-sm font-medium text-zinc-400">IP Filtering</span>
            </div>
            <p className="text-3xl font-bold text-white">Active</p>
            <p className="text-xs text-zinc-500 mt-1">Restricted to Org IP range</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy Management */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white">Active Policies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PolicyCard 
              icon={<Lock className="text-teal-400" />}
              title="Ticket Lockdown"
              description="Protect critical tickets from accidental deletion. Only admins can toggle lock status."
              status={settings.ticketLockdownEnabled !== false ? "ENABLED" : "DISABLED"}
              badgeVariant={settings.ticketLockdownEnabled !== false ? "success" : "secondary"}
              onConfigure={() => setActiveConfig("TICKET_LOCKDOWN")}
            />
            <PolicyCard 
              icon={<Clock className="text-cyan-400" />}
              title="Session Expiry"
              description="Automatically log out users after a set period of inactivity."
              status={settings.sessionTimeout || "30m"}
              badgeVariant="default"
              onConfigure={() => setActiveConfig("SESSION_TIMEOUT")}
            />
            <PolicyCard 
              icon={<Users className="text-violet-400" />}
              title="MFA Requirement"
              description="Force Two-Factor Authentication for all users with Clerk role 'Admin'."
              status={settings.mfaRequired ? "REQUIRED" : "OPTIONAL"}
              badgeVariant={settings.mfaRequired ? "info" : "secondary"}
              onConfigure={() => setActiveConfig("MFA")}
            />
             <PolicyCard 
              icon={<Globe className="text-amber-400" />}
              title="IP Allowlist"
              description="Restrict administrative access to specific IP addresses or CIDR ranges."
              status={settings.allowedIPs?.length > 0 ? `${settings.allowedIPs.length} RANGES` : "DISABLED"}
              badgeVariant={settings.allowedIPs?.length > 0 ? "success" : "secondary"}
              onConfigure={() => setActiveConfig("IP_FILTERING")}
            />
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Upcoming Security Features</h3>
              <Badge variant="secondary">Roadmap</Badge>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm text-zinc-400">
                <span>SSO / SAML Integration</span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-800">Q3 2026</span>
              </li>
              <li className="flex items-center justify-between text-sm text-zinc-400 border-t border-zinc-800 pt-3">
                <span>Advanced Threat Detection (AI-powered)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-zinc-800">Q4 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Audit Log */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Activity Audit Log</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 uppercase">Recent Events</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs">View All</Button>
            </div>
            <div className="divide-y divide-zinc-800">
              <AuditItem 
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                action="Admin login"
                user="Alex (Owner)"
                time="2 min ago"
              />
              <AuditItem 
                icon={<Lock className="h-4 w-4 text-teal-500" />}
                action="Ticket #1042 Locked"
                user="Sarah (Admin)"
                time="1 hour ago"
              />
              <AuditItem 
                icon={<AlertTriangle className="h-4 w-4 text-rose-500" />}
                action="Failed login attempt"
                user="IP: 192.168.1.45"
                time="3 hours ago"
              />
              <AuditItem 
                icon={<Activity className="h-4 w-4 text-cyan-500" />}
                action="API Integration status check"
                user="System"
                time="5 hours ago"
              />
               <AuditItem 
                icon={<Users className="h-4 w-4 text-violet-500" />}
                action="User removed from Support Team"
                user="Alex (Owner)"
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfigModal 
        config={activeConfig} 
        settings={settings}
        onClose={() => setActiveConfig(null)}
        onSave={handleSaveAll}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

function PolicyCard({ icon, title, description, status, badgeVariant, onConfigure }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:bg-zinc-800/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-zinc-800">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <Badge variant={badgeVariant}>{status}</Badge>
      </div>
      <h3 className="font-medium text-white mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed">
        {description}
      </p>
      <button 
        onClick={onConfigure}
        className="mt-4 flex items-center gap-1 text-xs text-teal-400 hover:underline"
      >
        Configure <ChevronRight size={12} />
      </button>
    </div>
  );
}

function ConfigModal({ config, settings, onClose, onSave, isSubmitting }: any) {
  const [localSettings, setLocalSettings] = React.useState<any>({});

  React.useEffect(() => {
    if (config) setLocalSettings(settings);
  }, [config, settings]);

  if (!config) return null;

  const renderContent = () => {
    switch (config) {
      case "TICKET_LOCKDOWN":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
              <div>
                <p className="text-sm font-medium text-white">Enable Lockdown</p>
                <p className="text-xs text-zinc-500">Allow tickets to be locked</p>
              </div>
              <input 
                type="checkbox" 
                checked={localSettings.ticketLockdownEnabled !== false}
                onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, ticketLockdownEnabled: e.target.checked }))}
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
              <div>
                <p className="text-sm font-medium text-white">Auto-lock Resolved</p>
                <p className="text-xs text-zinc-500">Lock tickets automatically when solved</p>
              </div>
              <input 
                type="checkbox" 
                checked={localSettings.autoLockSolved}
                onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, autoLockSolved: e.target.checked }))}
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500"
              />
            </div>
          </div>
        );
      case "SESSION_TIMEOUT":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">Duration (minutes)</label>
              <select 
                value={localSettings.sessionTimeout || "30m"}
                onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, sessionTimeout: e.target.value }))}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white"
              >
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="8h">8 Hours</option>
              </select>
            </div>
          </div>
        );
      case "MFA":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
              <div>
                <p className="text-sm font-medium text-white">Require MFA for Admins</p>
                <p className="text-xs text-zinc-500">Enforce 2FA for all administrative roles</p>
              </div>
              <input 
                type="checkbox" 
                checked={localSettings.mfaRequired}
                onChange={(e) => setLocalSettings((prev: any) => ({ ...prev, mfaRequired: e.target.checked }))}
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500"
              />
            </div>
          </div>
        );
      case "IP_FILTERING":
        return (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500 mb-2">Define which IP addresses are allowed to access administrative features.</p>
            <div className="space-y-2">
              {(localSettings.allowedIPs || []).map((ip: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-zinc-800 border border-zinc-700">
                  <span className="text-sm font-mono text-zinc-300">{ip}</span>
                  <button 
                    onClick={() => {
                      const newIPs = [...(localSettings.allowedIPs || [])];
                      newIPs.splice(index, 1);
                      setLocalSettings({ ...localSettings, allowedIPs: newIPs });
                    }}
                    className="text-zinc-500 hover:text-rose-400"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                placeholder="e.g. 192.168.1.1 or 10.0.0.0/24"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    const val = e.target.value.trim();
                    if (val) {
                      const newIPs = [...(localSettings.allowedIPs || []), val];
                      setLocalSettings({ ...localSettings, allowedIPs: newIPs });
                      e.target.value = "";
                    }
                  }
                }}
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={(e: any) => {
                  const input = (e.target as any).previousSibling;
                  if (input && input.value) {
                    const newIPs = [...(localSettings.allowedIPs || []), input.value.trim()];
                    setLocalSettings({ ...localSettings, allowedIPs: newIPs });
                    input.value = "";
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        );
      default:
        return <p className="text-zinc-400 text-sm">Settings for this policy will be available soon.</p>;
    }
  };

  return (
    <Modal isOpen={!!config} onClose={onClose} size="sm">
      <ModalHeader onClose={onClose}>Configure {config.replace("_", " ")}</ModalHeader>
      <ModalBody>
        {renderContent()}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button isLoading={isSubmitting} onClick={() => onSave(localSettings)}>
          Save Policy
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function AuditItem({ icon, action, user, time }: any) {
  return (
    <div className="p-4 hover:bg-zinc-800/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{action}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-zinc-500">{user}</span>
            <span className="text-[10px] text-zinc-600">•</span>
            <span className="text-xs text-zinc-600">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
