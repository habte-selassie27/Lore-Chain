import {useParams} from "react-router-dom";
import {BranchMap} from "@/frontend/components/views";

export default function Page() {
  const {worldId = ""} = useParams();
  return <BranchMap worldId={Number(worldId)} />;
}
