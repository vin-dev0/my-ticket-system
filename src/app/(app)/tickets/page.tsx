import TicketsClient from "./TicketsClient";
import { getTickets } from "@/lib/mocks/tickets";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";


export default async function TicketsPage() { 
  const session = await auth();
  if ((session?.user as any)?.role === "CLIENT") {
    redirect("/client");
  }

  const tickets = await getTickets();
  return <TicketsClient initialTickets={tickets} />; 
}

