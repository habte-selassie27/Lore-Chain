import {useSearchParams} from "react-router-dom";
import {SemanticSearch} from "@/frontend/components/views";

export default function Page() {
  const [searchParams] = useSearchParams();
  const world = searchParams.get("world");
  return <SemanticSearch initialWorld={world ? Number(world) : undefined} />;
}
