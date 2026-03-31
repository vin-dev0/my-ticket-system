"use client";

// This hook is a no-op for the static frontend showcase.
export function useAccessLog() {
  // Do nothing
}

// This function is a no-op for the static frontend showcase.
export async function logAction(action: string, metadata?: Record<string, any>) {
  console.log("Mock: Log action", { action, metadata });
}
