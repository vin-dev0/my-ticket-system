"use client";

import { SessionProvider } from "next-auth/react";

// Standard mock session structure to avoid build-time fetching
const staticSession = {
  user: {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    organizationId: "org-1",
    image: null,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      session={staticSession as any}
      refetchOnWindowFocus={false} 
      refetchInterval={0} 
    >
      {children}
    </SessionProvider>
  );
}
