import {useParams} from "react-router-dom";
import {ProposalReview} from "@/frontend/components/views";

export default function Page() {
  const {proposalId = ""} = useParams();
  return <ProposalReview proposalId={Number(proposalId)} />;
}
