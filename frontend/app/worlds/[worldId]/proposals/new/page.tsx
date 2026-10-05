import {useParams} from "react-router-dom";
import {ProposalComposer} from "@/frontend/components/views";

export default function Page() {
  const {worldId = ""} = useParams();
  return <ProposalComposer worldId={Number(worldId)} />;
}
