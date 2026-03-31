import ClientDashboard from "./ClientDashboard";
import { getTickets } from "@/lib/mocks/tickets";


export default async function ClientPage() {
  const tickets = await getTickets();
  return <ClientDashboard initialTickets={tickets} />;
}
