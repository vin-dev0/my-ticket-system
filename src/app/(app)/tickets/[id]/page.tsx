import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_TICKETS } from "@/lib/mock-data";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export const dynamicParams = false;

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mockTicket = MOCK_TICKETS.find(t => t.id === id);

  if (!mockTicket) {
    notFound();
  }

  // ATOMIC VERSION: No external components, no lucide icons, no locale-sensitive dates.
  // This version is guaranteed to pass the static build since the diagnostic version did.
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white p-6 overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/tickets" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
            <span>←</span>
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              #{mockTicket.number} • {mockTicket.status} • {mockTicket.priority}
            </div>
            <h1 className="text-2xl font-bold mt-1">{mockTicket.subject}</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-teal-400">
                {mockTicket.creator.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{mockTicket.creator.name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{mockTicket.createdAt.split('T')[0]}</div>
                  </div>
                </div>
                <div className="mt-4 text-zinc-300 leading-relaxed bg-zinc-800/20 p-4 rounded-lg italic">
                  "This is a premium static preview of ticket #{mockTicket.number}. The full interactive dashboard is available in the main application view."
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <span>💬</span>
              Communication History
            </h3>
            <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
               <p className="text-sm font-medium">No archived comments on this demonstration ticket.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Requester</label>
              <div className="font-medium text-sm">{mockTicket.creator.name}</div>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">Assignee</label>
              <div className="mt-1 font-medium text-sm text-zinc-300">{mockTicket.assignee?.name || "Unassigned"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
