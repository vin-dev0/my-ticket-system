"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Chrome, AlertCircle } from "lucide-react";
import { loginWithCredentials, loginWithGoogle, loginWithMicrosoft } from "@/lib/mocks/auth";
import { logAction } from "@/hooks/useAccessLog";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" /></div>}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  // Check for OAuth errors in URL
  React.useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "oauth_no_account") {
      setError("No account found with this email. Please register with an invite code first, then you can link your Google account.");
    } else if (urlError === "OAuthAccountNotLinked") {
      setError("This email is already registered with a different sign-in method. Please use your original sign-in method.");
    } else if (urlError === "AccessDenied" || urlError === "Callback") {
      setError("Account not found. Please register with an invite code first, then you can link your Google account.");
    } else if (urlError === "OAuthCallback" || urlError === "OAuthSignin") {
      setError("OAuth sign-in failed. Please try again.");
    } else if (urlError) {
      setError("Sign in failed. Please try again or register for a new account.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    try {
      const result = await loginWithCredentials(formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        // Log failed login attempt
        logAction("LOGIN_FAILED", { email, reason: result.error });
      } else {
        // Log successful login
        logAction("LOGIN", { email, method: "credentials" });
      }
      // If no error, the redirect happens automatically
    } catch {
      // Redirect errors are thrown by NextAuth, this is expected behavior
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Log OAuth login attempt
      logAction("LOGIN", { method: "google" });
      await loginWithGoogle();
    } catch {
      // Redirect happens automatically
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      logAction("LOGIN", { method: "microsoft" });
      await loginWithMicrosoft();
    } catch {
      // Redirect happens automatically
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <Logo size="lg" />
            <h1 className="mt-6 text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-zinc-400">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-400">
              <AlertCircle className="h-5 w-5" />
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
                <Link
                  href="/forgot-password"
                  className="text-sm text-teal-400 hover:underline"
                >
                  Forgot password?
                </Link>
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
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-teal-500"
              />
              <label htmlFor="remember" className="text-sm text-zinc-400">
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-sm text-zinc-500">or continue with</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <Chrome className="h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleMicrosoftLogin}>
              <svg className="h-5 w-5" viewBox="0 0 21 21" fill="none">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Microsoft
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-400 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-teal-900/30 lg:via-zinc-900 lg:to-cyan-900/30 lg:p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8 inline-flex rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 p-6 shadow-lg shadow-teal-500/30">
            <svg viewBox="0 0 32 32" fill="none" className="h-16 w-16">
              <path
                d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" fill="#14B8A6" />
              <path
                d="M12 15L15 18L20 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">
            The smarter way to handle support
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Join growing teams delivering exceptional customer experiences with SimplyTicket.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-teal-400 to-cyan-500"
                />
              ))}
            </div>
            <p className="text-sm text-zinc-400">
              <span className="font-semibold text-white">1,000+</span> happy users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
