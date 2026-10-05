import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigationType} from "react-router-dom";
import {EmptyPage} from "@/frontend/components/ui";
import HomePage from "./page";
import DeskPage from "./desk/page";
import ProposalPage from "./proposals/[proposalId]/page";
import ReceiptPage from "./receipts/[proposalId]/page";
import SearchPage from "./search/page";
import BranchesPage from "./worlds/[worldId]/branches/page";
import LorechainPage from "./worlds/[worldId]/lorechain/page";
import EntityPage from "./worlds/[worldId]/entities/[entityKey]/page";
import NewProposalPage from "./worlds/[worldId]/proposals/new/page";
import TimelinePage from "./worlds/[worldId]/timeline/page";

function ScrollToTop() {
  const {pathname} = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType === "PUSH") window.scrollTo(0, 0);
  }, [pathname, navigationType]);
  return null;
}

function NotFoundPage() {
  return (
    <EmptyPage eyebrow="404" title="Not found">
      This page is not part of the lorechain. Return to the world desk and browse from there.
    </EmptyPage>
  );
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/desk" element={<DeskPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/proposals/:proposalId" element={<ProposalPage />} />
        <Route path="/receipts/:proposalId" element={<ReceiptPage />} />
        <Route path="/worlds/:worldId/lorechain" element={<LorechainPage />} />
        <Route path="/worlds/:worldId/timeline" element={<TimelinePage />} />
        <Route path="/worlds/:worldId/branches" element={<BranchesPage />} />
        <Route path="/worlds/:worldId/proposals/new" element={<NewProposalPage />} />
        <Route path="/worlds/:worldId/entities/:entityKey" element={<EntityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
