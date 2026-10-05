import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONTRACT_ADDRESS } from "@/lib/genlayer/config";
import { getStats } from "@/lib/genlayer/contract";
import type { ContractStats, ReadResult } from "@/lib/types";
import { LedgerRule, ReadState, StatusMark } from "./ui";
import { HeroCanvas } from "./hero-canvas";

const short = (v: string) => `${v.slice(0, 10)}…${v.slice(-6)}`;

const OUTCOMES: [string, string][] = [
  ["COMPATIBLE", "coexists with active canon; nothing superseded"],
  ["RETCON_VALID", "supersedes exact same-branch canon"],
  ["BRANCH_ONLY", "shadows inherited canon for this branch"],
  ["CONFLICT", "contradiction refused; canon unchanged"],
  ["INSUFFICIENT_CONTEXT", "unverifiable; canon unchanged"],
];

export function HomeLanding() {
  const [stats, setStats] = useState<ReadResult<ContractStats>>();
  const contractLabel = CONTRACT_ADDRESS ? short(CONTRACT_ADDRESS) : undefined;
  useEffect(() => {
    if (CONTRACT_ADDRESS) void getStats().then(setStats);
  }, []);
  return (
    <div className="page-shell">
      <div className="hero-stage">
        <HeroCanvas />
        <header className="page-heading" data-folio="00">
          <p className="eyebrow">LoreChain · StudioNet · chain 61999</p>
          <h1>The story bible that remembers what actually happened.</h1>
          <p className="deck">
            LoreChain is consensus-managed canon for collaborative fictional
            universes. Editors propose bounded facts; the GenLayer Intelligent
            Contract retrieves only the nearest active lorechain from
            contract-owned VecDB memory, and independent validators decide what
            is compatible, what retcons, what diverges — and what never
            happened.
          </p>
          <p className="deck">
            There is no server, database or indexer behind this interface.
            Every world, charter, branch, lineage version, proposal and
            accepted entry is read directly from the contract; every write is
            signed by your injected wallet and settles only after validator
            consensus and finality. If the contract is empty, this page says
            so — nothing here is staged.
          </p>
        </header>
      </div>
      <div className="action-band">
        <Link className="primary-action" to="/desk">
          Open the world desk
        </Link>
        <Link className="secondary-action" to="/search">
          Recall by meaning
        </Link>
      </div>
      <div className="manuscript-grid">
        <section>
          <div className="manuscript-note" data-tone="red">
            <span className="note-index">i</span>
            <div>
              <h3>Propose a bounded fact</h3>
              <p className="deck">
                An editor submits one small statement at a time — title,
                statement, entity keys, an optional time anchor — against a
                chosen branch lineage. Drafts stay in the browser until
                submitted.
              </p>
            </div>
          </div>
          <div className="manuscript-note">
            <span className="note-index">ii</span>
            <div>
              <h3>Retrieve the nearest canon</h3>
              <p className="deck">
                The contract embeds the proposal and pulls only the nearest
                active lorechain from its own VecDB memory. Similarity is
                retrieval metadata, never a verdict.
              </p>
            </div>
          </div>
          <div className="manuscript-note">
            <span className="note-index">iii</span>
            <div>
              <h3>Deliberate independently</h3>
              <p className="deck">
                GenLayer validators reason separately over the same charter,
                proposal, evidence and retrieved canon. Their decisions must
                match before anything settles.
              </p>
            </div>
          </div>
          <div className="manuscript-note" data-tone="red">
            <span className="note-index">iv</span>
            <div>
              <h3>Settle one of five outcomes</h3>
              <p className="deck">
                Only accepted entries enter canonical VecDB memory. Conflicts
                and insufficient context never mutate canon; same-branch
                retcons and branch-local divergences are distinct, deliberate
                state transitions.
              </p>
            </div>
          </div>
          <div className="manuscript-note">
            <span className="note-index">v</span>
            <div>
              <h3>Keep the receipt</h3>
              <p className="deck">
                Every settled proposal produces a printable decision receipt
                with its lineage, retrieved context and outcome — so a shared
                universe always knows why a fact stands, which branch it
                belongs to, and what it replaced.
              </p>
            </div>
          </div>
        </section>
        <aside className="marginalia">
          <div className="margin-section">
            <h3>Live contract ledger</h3>
            {CONTRACT_ADDRESS ? (
              <ReadState result={stats}>
                {(s) => (
                  <>
                    <LedgerRule label="contract" value={contractLabel} />
                    <LedgerRule label="worlds" value={s.world_count} />
                    <LedgerRule label="branches" value={s.branch_count} />
                    <LedgerRule label="lorechain entries" value={s.entry_count} />
                    <LedgerRule label="proposals" value={s.proposal_count} />
                    <LedgerRule label="embedding" value={s.embedding_model} />
                    <LedgerRule label="dimensions" value={s.vector_dimensions} />
                  </>
                )}
              </ReadState>
            ) : (
              <p className="field-help">
                Contract not configured. Set NEXT_PUBLIC_LORECHAIN_CONTRACT to
                read the live ledger.
              </p>
            )}
          </div>
          <div className="margin-card">
            <h3>Settlement outcomes</h3>
            {OUTCOMES.map(([status, note]) => (
              <div className="ledger-rule" key={status}>
                <StatusMark status={status} />
                <small>{note}</small>
              </div>
            ))}
          </div>
          <div className="margin-card">
            <h3>Protocol facts</h3>
            <LedgerRule label="network" value="StudioNet" />
            <LedgerRule label="chain id" value={61999} />
            <LedgerRule label="browser sdk" value="genlayer-js 1.1.8" />
            <LedgerRule label="writes" value="injected wallet only" />
            <LedgerRule label="backend" value="none — contract is truth" />
          </div>
        </aside>
      </div>
    </div>
  );
}
