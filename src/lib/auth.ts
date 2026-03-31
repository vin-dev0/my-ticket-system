import { MOCK_SESSION } from "./mock-data";

// Mock auth function for static export - no longer imports NextAuth
export const auth = async () => {
  return MOCK_SESSION as any;
};

// Mock handlers for standard NextAuth API routes (even though they are deleted)
export const handlers = {
  GET: () => new Response("Mock Auth", { status: 200 }),
  POST: () => new Response("Mock Auth", { status: 200 }),
};

// Mock signIn and signOut functions for components
export const signIn = async (provider?: string, options?: any) => {
  console.log("Mock: Sign In triggered", { provider, options });
  return { url: "/" };
};

export const signOut = async (options?: any) => {
  console.log("Mock: Sign Out triggered", { options });
  return { url: "/login" };
};

// NextAuth usually sets these, but we mock them to avoid errors in server components
export const SESSION_COOKIE_NAME = "next-auth.session-token";
