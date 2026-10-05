import {useParams} from "react-router-dom";
import {DecisionReceipt} from "@/frontend/components/views";

export default function Page() {
  const {proposalId = ""} = useParams();
  return <DecisionReceipt proposalId={Number(proposalId)} />;
}
