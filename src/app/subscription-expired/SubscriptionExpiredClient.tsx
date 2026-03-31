"use client";

import * as React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CreditCard,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/Logo";

export default function SubscriptionExpiredClient() {
  const { data: session, update } = useSession();
  const [refreshing, setRefreshing] = React.useState(false);

  const user = session?.user as any;
  const subscriptionStatus = user?.subscriptionStatus;
  const gracePeriodEndsAt = user?.gracePeriodEndsAt
    ? new Date(user.gracePeriodEndsAt)
    : null;
  const trialEndsAt = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;

  const isExpired = subscriptionStatus === "EXPIRED";
  const isPastDue = subscriptionStatus === "PAST_DUE";
  const isTrialExpired =
    subscriptionStatus === "TRIALING" &&
    trialEndsAt &&
    new Date() > trialEndsAt;

  // Days remaining in grace period
  const graceDaysRemaining = gracePeriodEndsAt
    ? Math.max(0, Math.ceil((gracePeriodEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Refresh session to check if subscription was updated
  const handleRefresh = async () => {
    setRefreshing(true);
    await update();
    // Check if subscription is now active
    setTimeout(() => {
      setRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  // Placeholder payment link
  const handleUpdatePayment = () => {
    // TODO: Replace with Stripe billing portal
    alert(
      "Payment portal coming soon!\n\nPlease contact sales@simplyticket.net to update your payment method."
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Logo />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          {/* Status Icon */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex rounded-full p-4 ${
                isExpired
                  ? "bg-red-500/10"
                  : isPastDue
                  ? "bg-amber-500/10"
                  : "bg-amber-500/10"
              }`}
            >
              {isExpired ? (
                <AlertTriangle className="h-12 w-12 text-red-400" />
              ) : (
                <Clock className="h-12 w-12 text-amber-400" />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">
              {isExpired
                ? "Your Subscription Has Expired"
                : isPastDue
                ? "Payment Past Due"
                : "Your Trial Has Ended"}
            </h1>
            <p className="mt-3 text-zinc-400">
              {isExpired ? (
                <>
                  Your access to SimplyTicket features has been suspended.
                  Please update your payment to restore access.
                </>
              ) : isPastDue ? (
                <>
                  We couldn&apos;t process your last payment. You have{" "}
                  <span className="font-semibold text-amber-400">
                    {graceDaysRemaining} days
                  </span>{" "}
                  remaining in your grace period before features are locked.
                </>
              ) : (
                <>
                  Your 14-day free trial has ended. Subscribe now to continue
                  using SimplyTicket.
                </>
              )}
            </p>
          </div>

          {/* Current Status Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-400">Account Status</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isExpired
                    ? "bg-red-500/10 text-red-400"
                    : isPastDue
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {isExpired ? (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    Expired
                  </>
                ) : isPastDue ? (
                  <>
                    <Clock className="h-3 w-3" />
                    Past Due
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    Trial Ended
                  </>
                )}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Email</span>
                <span className="text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Plan</span>
                <span className="text-white">{user?.plan || "Starter"}</span>
              </div>
              {gracePeriodEndsAt && !isExpired && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Grace Period Ends</span>
                  <span className="text-amber-400">
                    {gracePeriodEndsAt.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleUpdatePayment} size="lg" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>

            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full">
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              I&apos;ve Already Paid - Refresh Status
            </Button>
          </div>

          {/* Contact Support */}
          <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 text-center">
            <p className="text-sm text-zinc-400 mb-3">
              Need help with your subscription?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:billing@simplyticket.net"
                className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
              >
                <Mail className="h-4 w-4" />
                billing@simplyticket.net
              </a>
              <a
                href="tel:+12125550147"
                className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
              >
                <Phone className="h-4 w-4" />
                +1 (212) 555-0147
              </a>
            </div>
          </div>

          {/* What's Locked */}
          {isExpired && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-zinc-400 mb-3">
                Features Currently Locked:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Ticket Management",
                  "Team Messaging",
                  "Analytics",
                  "Automations",
                  "Knowledge Base",
                  "API Access",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-500"
                  >
                    <Shield className="h-3 w-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Retention Warning */}
          <div className="mt-8 rounded-xl border border-red-900/50 bg-red-950/30 p-4">
            <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important: Data Retention Policy
            </h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <p className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-amber-400">3-day grace period:</strong> You must renew your subscription within 3 days of expiration to avoid account lockout.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">•</span>
                <span>
                  <strong className="text-red-400">30-day data purge:</strong> All account data (tickets, assets, messages, files) will be permanently deleted 30 days after lockout.
                </span>
              </p>
              {user?.plan === "PRO" || user?.plan === "ENTERPRISE" ? (
                <p className="text-zinc-400 italic text-xs mt-3">
                  As a Pro user, you can still export your data. Contact support for assistance.
                </p>
              ) : (
                <p className="text-zinc-400 italic text-xs mt-3">
                  Pro users can export their data before deletion. Contact support if you need to recover important data.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

