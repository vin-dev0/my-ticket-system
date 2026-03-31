import ClientNewTicket from "./ClientNewTicket";
import { getTags } from "@/lib/mocks/tags";


export default async function ClientNewTicketPage() {
  const availableTags = await getTags();
  return <ClientNewTicket availableTags={availableTags} />;
}
