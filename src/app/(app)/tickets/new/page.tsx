import NewTicketClient from "./NewTicketClient";
import { getTags } from "@/lib/mocks/tags";
import { getAgents } from "@/lib/mocks/users";


export default async function NewTicketPage() { 
  const [tags, agents] = await Promise.all([
    getTags(),
    getAgents()
  ]);
  
  return <NewTicketClient availableTags={tags} availableAgents={agents} />; 
}
