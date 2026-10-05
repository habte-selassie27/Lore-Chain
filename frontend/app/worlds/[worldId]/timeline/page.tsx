import {useParams} from "react-router-dom";
import {TimelineView} from "@/frontend/components/views";

export default function Page() {
  const {worldId = ""} = useParams();
  return <TimelineView worldId={Number(worldId)} />;
}
