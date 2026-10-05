import {useParams} from "react-router-dom";
import {EntityDossier} from "@/frontend/components/views";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function Page() {
  const {worldId = "", entityKey = ""} = useParams();
  return <EntityDossier worldId={Number(worldId)} entityKey={safeDecode(entityKey)} />;
}
