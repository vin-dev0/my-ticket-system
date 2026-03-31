import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "SimplyTicket - Enterprise Help Desk Solution",
  description: "A powerful, scalable help desk and ticket management system for modern support teams.",
  keywords: ["help desk", "ticketing system", "customer support", "support tickets", "help center", "SimplyTicket"],
  authors: [{ name: "SimplyTicket" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="antialiased">
        <Suspense fallback={null}>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
