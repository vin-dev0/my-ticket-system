"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginWithCredentials, loginWithMicrosoft } from "@/lib/mocks/auth";

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" /></div>}>
      <ClientLoginPageContent />
    </Suspense>
  );
}

function ClientLoginPageContent() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) setError("Sign in failed. Please check your credentials.");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginWithCredentials(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <Logo size="lg" />
          <h1 className="text-2xl font-bold text-white mt-4">Client Portal</h1>
          <p className="text-sm text-zinc-400">Sign in to view and manage your tickets</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="you@company.com"
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20" size="lg" isLoading={isLoading}>
            Sign In to Portal
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-sm text-zinc-500">or continue with</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <Button variant="outline" className="w-full" onClick={() => loginWithMicrosoft()}>
          <svg className="h-5 w-5 mr-2" viewBox="0 0 21 21" fill="none">
            <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
            <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
            <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
            <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
          </svg>
          Microsoft
        </Button>

        <div className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/login" className="hover:text-zinc-300 transition-colors">
            IT Personnel Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
