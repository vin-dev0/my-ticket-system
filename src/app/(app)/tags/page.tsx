import TagsClient from "./TagsClient";
import { getTags } from "@/lib/mocks/tags";

export default async function TagsPage() {
  const tags = await getTags();
  return <TagsClient initialTags={tags} />;
}
