"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Receipt,
  Settings,
  Lock,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PaymentsClient() {
  const { data: session, status } = useSession();
  const [isConnected, setIsConnected] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  const userPlan = (session?.user as any)?.plan || "STARTER";
  const userRole = (session?.user as any)?.role || "CLIENT";

  // Check if user has Pro access (Pro/Enterprise plan OR Admin/Owner role)
  const hasProAccess = userPlan === "PRO" || userPlan === "ENTERPRISE" || userRole === "ADMIN" || userRole === "OWNER";

  if (!hasProAccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
            <Lock className="h-8 w-8 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Pro Feature</h2>
          <p className="mt-3 text-zinc-400">
            Credit card processing is available on the Pro plan. Accept payments directly
            within tickets and provide seamless billing for your customers.
          </p>
          <Button className="mt-6">
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Payment Processing</h1>
          <p className="mt-1 text-zinc-400">
            Accept credit card payments from your customers
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
              <CreditCard className="h-10 w-10 text-teal-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white">Connect Your Payment Processor</h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              Integrate with Stripe to accept credit card payments directly within SimplyTicket.
              Charge customers for services, products, or support.
            </p>

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              {[
                { icon: DollarSign, title: "Accept Payments", desc: "Charge customers within tickets" },
                { icon: Receipt, title: "Automatic Invoices", desc: "Generate and send invoices" },
                { icon: TrendingUp, title: "Revenue Tracking", desc: "Monitor sales and growth" },
                { icon: Building, title: "Multi-currency", desc: "Accept payments worldwide" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
                  <feature.icon className="h-5 w-5 shrink-0 text-teal-400" />
                  <div>
                    <p className="font-medium text-white">{feature.title}</p>
                    <p className="text-sm text-zinc-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Button size="lg" onClick={() => setIsConnected(true)}>
                <CreditCard className="h-5 w-5" />
                Connect with Stripe
              </Button>
              <p className="text-xs text-zinc-500">
                Powered by Stripe • PCI compliant • 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected state - show dashboard
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payment Processing</h1>
          <p className="mt-1 text-zinc-400">
            Manage payments and view transaction history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Connected to Stripe
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Revenue (This Month)</p>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">$0.00</p>
          <p className="mt-1 text-xs text-zinc-500">No transactions yet</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Successful Payments</p>
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
          <p className="mt-1 text-xs text-zinc-500">This month</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Pending</p>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
          <p className="mt-1 text-xs text-zinc-500">Awaiting payment</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Failed</p>
            <AlertCircle className="h-4 w-4 text-rose-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
          <p className="mt-1 text-xs text-zinc-500">This month</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h3 className="font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="p-12 text-center">
          <Receipt className="mx-auto h-12 w-12 text-zinc-700" />
          <p className="mt-4 text-zinc-400">No transactions yet</p>
          <p className="mt-1 text-sm text-zinc-600">
            Transactions will appear here when customers make payments
          </p>
          <Button variant="outline" className="mt-4">
            <ArrowUpRight className="h-4 w-4" />
            Open Stripe Dashboard
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 font-semibold text-white">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <DollarSign className="h-4 w-4" />
            Create Invoice
          </Button>
          <Button variant="outline">
            <CreditCard className="h-4 w-4" />
            Request Payment
          </Button>
          <Button variant="outline">
            <Receipt className="h-4 w-4" />
            View All Invoices
          </Button>
        </div>
      </div>
    </div>
  );
}

