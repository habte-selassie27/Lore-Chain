import {useParams} from "react-router-dom";
import {LorechainLedger} from "@/frontend/components/views";

export default function Page() {
  const {worldId = ""} = useParams();
  return <LorechainLedger worldId={Number(worldId)} />;
}
