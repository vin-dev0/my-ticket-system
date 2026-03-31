import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_TICKETS } from "@/lib/mock-data";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export const dynamicParams = false;

export default async function ClientTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mockTicket = MOCK_TICKETS.find(t => t.id === id);

  if (!mockTicket) {
    notFound();
  }

  // ATOMIC VERSION: No external components, no lucide icons, no locale-sensitive dates.
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/client/tickets" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
            <span>←</span>
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Ticket #{mockTicket.number} • {mockTicket.status}
            </div>
            <h1 className="text-3xl font-bold mt-1">{mockTicket.subject}</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
               <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center font-bold text-teal-400 border border-teal-500/20">
                {mockTicket.creator.name[0]}
              </div>
              <div>
                <div className="font-semibold text-white">{mockTicket.creator.name}</div>
                <div className="text-xs text-zinc-500">Created on {mockTicket.createdAt.split('T')[0]}</div>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg italic">
              "This is a static preview of your ticket. In the live portal, you can reply directly to our support agents here."
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-400 mb-2">Communication History</h3>
            <p className="text-sm text-zinc-500">This mockup portal does not store actual message history. </p>
          </div>
        </div>
      </div>
    </div>
  );
}
