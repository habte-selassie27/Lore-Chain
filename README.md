# LoreChain

**Consensus-managed lorechain for collaborative fictional universes.**

LoreChain is a GenLayer application for teams that need a shared, versioned story bible across branches, characters, places, timelines and retcons. Editors submit bounded lorechain statements. The Intelligent Contract retrieves only the nearest active lorechain memories from contract-owned VecDB, then independent GenLayer validators decide whether the proposal is compatible, a valid same-branch retcon, an intentional branch-local divergence, a conflict, or insufficiently supported.

## Why this is not an “AI decides X” demo

LoreChain has a real protocol state machine:

- worlds have on-chain charters, stewards and editor roles;
- every world gets an immutable root `main` branch;
- branches carry versioned lineages;
- proposals freeze their lineage version snapshot at submission;
- VecDB is used only to retrieve bounded related lorechain;
- validators independently reason over the same charter, proposal and active semantic context;
- same-branch retcons can supersede only same-branch active lorechain;
- branch-only decisions shadow exact inherited entries only for that branch and descendants;
- a lineage with an inactive ancestor cannot submit, review, retrieve, or create further descendants until reactivated;
- conflicts and insufficient-context outcomes never mutate lorechain;
- only accepted entries enter lorechain VecDB memory;
- final state transitions are deterministic after consensus.

## Deployment architecture

```text
Browser / Vercel frontend
          │
          ├── direct live reads (genlayer-js 1.1.8)
          └── injected-wallet writes
          │
          ▼
GenLayer StudioNet · chain 61999
          │
          ▼
LoreChain Intelligent Contract
  ├── lorechain state
  ├── VecDB semantic memory
  ├── independent validator consensus
  └── deterministic state transitions
```

There is **no project backend, application database, custom indexer, API service, server-action state layer, or mock application-data mode**. If the contract is empty, the UI shows a real empty state. Optional external evidence is independently hosted by the user and is accepted only as a public HTTPS URL paired with a SHA-256 digest that validators verify.

## Product surfaces

- `/` — editorial home landing (protocol overview, live contract ledger)
- `/desk` — editorial world desk / universe switcher
- `/worlds/[worldId]/lorechain` — append-only lorechain ledger with supersession history
- `/worlds/[worldId]/entities/[entityKey]` — entity dossier
- `/worlds/[worldId]/timeline` — time-anchor timeline
- `/worlds/[worldId]/branches` — branch genealogy and editor controls
- `/worlds/[worldId]/proposals/new` — bounded proposal composer
- `/proposals/[proposalId]` — semantic context + consensus review
- `/receipts/[proposalId]` — printable lorechain decision receipt
- `/search` — direct contract VecDB semantic recall

The visual system is an editorial story bible with manuscript rules and marginalia, using paper/ink/vermilion/olive rather than a generic Web3/AI dashboard.

## GenLayer baseline

- Network: StudioNet
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Explorer: `https://explorer-studio.genlayer.com`
- Browser SDK: `genlayer-js@1.1.8`
- Embedding model: `all-MiniLM-L6-v2`, 384 dimensions
- Writes: explicit injected wallet only
- Read account: no wallet/account dependency in the public browser read client
- Success rule: wait for `FINALIZED`, re-read transaction, and require GenVM leader `execution_result === "SUCCESS"`

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Set the deployed contract address:

```bash
VITE_LORECHAIN_CONTRACT=0x...
```

The frontend intentionally does not fall back to fake data if the address or network is unavailable.

## Verification

```bash
python -m pip install -r requirements-dev.txt
npm run preflight
npm run test:direct
npm run test:frontend
npm run verify:deployment-source
npm run typecheck
npm run lint
npm run build
```

Or run the complete local gate:

```bash
npm run verify
```

Current deterministic/source suite covers accepted-only semantic memory, stale lineage, same-branch retcon safety, branch-local overrides, no-backend/no-mock architecture, required UI routes, injected-wallet behavior and finalized GenVM execution checks.

## StudioNet deployment

Official Studionet deployment of the current LoreChain source: contract `0x8313bB950e341c573075c7DBeE500dd7d28f206f`, deployment tx `0x55f26b13b5ffd594d50a427eecb0c6b5ec76ffd64717d272d8dda31a28fc741e`, deployer `0x5B3661C576c7001e6d6279C67F3779705d334c89` ([import](https://studio.genlayer.com/?import-contract=0x8313bB950e341c573075c7DBeE500dd7d28f206f), [explorer](https://explorer-studio.genlayer.com/address/0x8313bB950e341c573075c7DBeE500dd7d28f206f)). It is FINALIZED with leader GenVM SUCCESS, EVM receipt `0x1`, byte-identical code, schema PASS (23 required methods) and live LATEST_FINAL reads. Normalized contract SHA-256: `149372c2538325eec32f421447156eda7a1edff89e9287d1891d03e8d490cb26`.

Team-review acceptance hardening adds bounded deterministic entity- and lineage-scoped fallback candidates after global VecDB KNN filtering. `MAX_SCOPED_FALLBACK_SCAN=16` and `MAX_ENTITY_FALLBACK_SCAN=16`; candidates remain world/lineage/status/supersession/shadow checked, deduplicated, capped by `MAX_RELATED`, and settlement-capable. Related results expose `VECDB`, `ENTITY_SCOPE`, or `LINEAGE_SCOPE`; distance is retrieval metadata, never confidence. The adversarial starvation Direct Mode test proves unrelated global neighbors cannot reduce eligible scoped lorechain to zero.

The submitted frontend exposes steward-only editor grants/revokes, branch activation, proposal cancellation, and stale-proposal invalidation. Each uses FINALIZED + GenVM SUCCESS + exact LATEST_FINAL state confirmation. Vercel remains [lorechain.vercel.app](https://lorechain.vercel.app), but the owner must set `VITE_LORECHAIN_CONTRACT=0x8313bB950e341c573075c7DBeE500dd7d28f206f` and redeploy before it represents this deployment.

Current GenLayer CLI documentation uses:

```bash
npm install -g genlayer
genlayer network set studionet
genlayer account show
genlayer deploy --contract contracts/lorechain.py
```

Or run `scripts/deploy-studionet.sh` after configuring a supported GenLayer CLI account. The repository never creates, prints or commits private keys. The current CLI documentation describes `genlayer account create` as an encrypted-keystore flow, so this project does not invent an unsupported passwordless-account mechanism.

Deployment status for the current source:

- Current `contracts/lorechain.py` is deployed at `0x8313bB950e341c573075c7DBeE500dd7d28f206f` ([explorer](https://explorer-studio.genlayer.com/address/0x8313bB950e341c573075c7DBeE500dd7d28f206f)).
- Deployment transaction: `0x55f26b13b5ffd594d50a427eecb0c6b5ec76ffd64717d272d8dda31a28fc741e`; deployer: `0x5B3661C576c7001e6d6279C67F3779705d334c89`.
- The receipt address matches the target address. It reached `FINALIZED`, leader GenVM execution was `SUCCESS`, and the independent StudioNet EVM receipt status was `0x1`.
- Code lookup (`gen_getContractCode`) and the source embedded in the deploy transaction both byte-match `contracts/lorechain.py`. Schema PASS with all 23 required methods (including `search_LoreChain`); `stats()` and `list_world_ids()` resolve via LATEST_FINAL (fresh contract, `world_count=0`).
- `npm run verify:deployment-source` PASSES: local, deployed and current digests are all `149372c2538325eec32f421447156eda7a1edff89e9287d1891d03e8d490cb26`.
- All earlier deployments and their lifecycle/hosted-write evidence remain historical only; they are not release proof for this source.
- Acceptance lifecycle writes, a hosted wallet write, and the Vercel environment pointing at this address are NOT yet proven; owner configuration is still required.

The current contract-owned VecDB API exposes global `knn(vector, k)` without metadata filtering or namespaces. LoreChain retains the bounded global top-32 semantic pass, then supplements it from bounded deterministic entity and lineage indexes. This prevents unrelated global neighbors from wholly starving eligible scoped lorechain, while preserving the limitation that fallback is bounded rather than exhaustive.

For the current operational deployment:

1. set `VITE_LORECHAIN_CONTRACT` to the verified address;
2. run `npm run verify:schema` and `npm run verify:studionet`;
3. keep deployment source parity green with `npm run verify:deployment-source`;
4. consult `DEPLOYMENT.json` for the exact public transaction evidence.

## Lorechain decision model

### `COMPATIBLE`
The proposal coexists with active lorechain in the selected branch lineage. No entries are superseded or shadowed.

### `RETCON_VALID`
Only valid for `RETCON` mode. Validators must independently agree on the exact active **same-branch** entries replaced. Deterministic code refuses ancestor/cross-branch targets.

### `BRANCH_ONLY`
Only valid on a child branch in `BRANCH` mode. Validators must independently agree on the exact active **ancestor-branch** entries the divergence shadows. Parent records remain unchanged and visible in their own lineage.

### `CONFLICT`
The proposal materially contradicts active lorechain without a valid retcon/branch interpretation. Lorechain is unchanged.

### `INSUFFICIENT_CONTEXT`
Evidence/context is too weak or cannot be independently verified. Lorechain is unchanged.

## Documentation

The repository includes the complete build specification and living continuity files:

- `AGENTS.md`
- `memory.md`
- `handoff.md`
- `prd.md`
- `trd.md`
- `architecture.md`
- `project-plan.md`
- `ui/ux.md`

`handoff.md` is updated after every meaningful work unit so another agent can continue without hidden conversation history.

## License

Apache-2.0.
