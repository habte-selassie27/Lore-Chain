# LoreChain — Handoff Log

> Update after every meaningful work unit. Record what actually happened, not what was intended.

## Current checkpoint

- **Phase:** Official Studionet deployment verified — current LoreChain source is live at `0x8313bB950e341c573075c7DBeE500dd7d28f206f` with byte-identical code, schema PASS and live reads PASS. Acceptance lifecycle writes, hosted wallet write and Vercel pointer to this address are NOT yet proven.
- **Architecture:** StudioNet Intelligent Contract + Vercel frontend only.
- **Contract:** implemented with VecDB, bounded semantic retrieval, independent validator reasoning, stale-lineage protection, same-branch retcons and branch-local overrides.
- **Frontend:** complete route surface implemented with direct live contract reads/writes, injected wallet + `personal_sign` sign-in gate, wrong-network gate, FINALIZED + GenVM execution verification and editorial story-bible UI.
- **GitHub verification:** preflight PASS, source tests 22 passed on the Python 3.12 venv, frontend Vitest 44 passed (9 files), TypeScript PASS, ESLint 0/0, Vite build PASS, `npm audit:prod` clean, and `verify:deployment-source` PASS for digest `149372c2538325eec32f421447156eda7a1edff89e9287d1891d03e8d490cb26`. Direct Mode fixture tests remain unproven in this Linux workspace (harness idle-hangs); `python` is not on PATH locally (use `.venv`).
- **StudioNet:** official deployment `0x8313bB950e341c573075c7DBeE500dd7d28f206f`, deploy tx `0x55f26b13b5ffd594d50a427eecb0c6b5ec76ffd64717d272d8dda31a28fc741e`, deployer `0x5B3661C576c7001e6d6279C67F3779705d334c89` — FINALIZED, GenVM SUCCESS, EVM `0x1`, code byte-identical, schema PASS, LATEST_FINAL reads PASS (fresh contract).
- **Vercel:** historical frontend evidence exists at https://lorechain.vercel.app; owner must set `VITE_LORECHAIN_CONTRACT=0x8313bB950e341c573075c7DBeE500dd7d28f206f` and redeploy — hosted parity is NOT PROVEN here.
- **Next exact action:** run the acceptance lifecycle against `0x8313bB95...` recording every transaction with authoritative LATEST_FINAL state re-reads, then prove a hosted wallet write and point Vercel at the address.

## 2026-10-05 — repository-wide entry-term rename to lorechain

- Replaced every case variant of the old domain term for accepted entries — including its adjective form — with `lorechain`/`Lorechain`/`LORECHAIN` across UI copy, route paths, code identifiers, tests and every project doc (`AGENTS.md`, `README.md`, `prd.md`, `trd.md`, `architecture.md`, `ui/ux.md`, `memory.md`, `project-plan.md`, this log). Longest-form-first ordering kept compounds from becoming `lorechainical`.
- Renamed the world route folder to `frontend/app/worlds/[worldId]/lorechain`; `frontend/app/routes.tsx` mounts `/worlds/:worldId/lorechain`, links in `frontend/components/views.tsx` follow, and `tests/direct/test_frontend_source.py::test_routes` asserts the new folder. Identifiers became `LorechainEntry`, `RelatedLorechain`, `searchLorechain`, `LorechainLedger`, `LorechainPage`.
- Intentionally untouched: `contracts/lorechain.py` (already zero occurrences; byte-parity with deployed source), every quoted contract-method string (none contained the term), `DEPLOYMENT.json` (hashed deployment evidence, kept verbatim), and third-party RPC code inside the bundled viem output.
- Hand-curated the handful of self-referential historical log lines (contract-rename and product-rename sections) so they stay truthful after the mechanical substitution.
- Checks: `npx tsc --noEmit` PASS, `npx eslint .` 0/0, Vitest 35 passed (7 files), `vite build` PASS, `python3 scripts/preflight.py` PASS, `npm run verify:deployment-source` PASS (SHA parity `149372c2…`), source tests 8/8 run directly (system-pytest collection still blocked in this workspace).

## 2026-10-05 — env vars renamed to Vite-native `VITE_*`

- Owner directed dropping the Next-era prefix: `NEXT_PUBLIC_LORECHAIN_CONTRACT` → `VITE_LORECHAIN_CONTRACT`, `NEXT_PUBLIC_GENLAYER_ENDPOINT` → `VITE_GENLAYER_ENDPOINT` across `lib/genlayer/config.ts`, `vite-env.d.ts`, `.env.example`, `.env.local`, both StudioNet scripts, frontend empty-state text, `read-path.test.ts`, `home-page.test.ts`, README, trd.md and memory.md. `vite.config.ts` `envPrefix` removed (Vite default `VITE_` only — nothing else leaks to the client bundle).
- The migration-era decision to keep `NEXT_PUBLIC_*` via `envPrefix` is superseded; Vercel project env must be renamed accordingly (owner action in the dashboard) before the next production build, otherwise the hosted app shows the contract-not-configured state.
- Checks: `tsc --noEmit` PASS, `eslint .` 0/0, Vitest 44 passed (9 files), `vite build` PASS, 8/8 frontend-source python tests PASS.

## 2026-10-05 — repository published to GitHub

- Initialized git in this workspace (it had no `.git` metadata) and published to `https://github.com/habte-selassie27/Lore-Chain` (owner `habte-selassie27`), branch `main`.
- History is 50 structured commits: scaffold → build config → deploy config → SPA entry → docs → contract → lib → genlayer clients → stylesheet → app bootstrap/routes → components → page routes → tests → ops/CI. Verified `git rev-list --count HEAD` = 50 with a clean tree.
- Push verified: remote `refs/heads/main` = `6ae342d5718a054ff50315d0228386727a6440ea`.
- `.gitignore` extended with `tsconfig.tsbuildinfo`; `.env.local`, `dist/`, `.venv/`, `artifacts/`, `node_modules/` all confirmed ignored before staging.
- GitHub Actions `verify` run `37368884047` triggered on push; result not yet observed at write time.
- `DEPLOYMENT.json` `source_commit` updated from `null` to the publication commit (its tree contains the deployed contract source).

## 2026-10-05 — palette refresh (porcelain/cerulean/sage), Three.js hero, richer home copy

- Owner requested a new color direction away from the warm paper/beige: light identity is now porcelain paper `#EEF3F6`, ink `#10181E`, cerulean accent `#0E5E8A`, sage `#5E8A6E`, charcoal `#4E6470`; dark block redefined in the same hue families (`#0E1418`/`#E4ECEF`/`#4FA3D8`/`#93B89D`). Token names and the token-only rule are unchanged; `tests/frontend/theme-tokens.test.ts` and `tests/direct/test_frontend_source.py::test_visual_identity` now pin the new hexes. `ui/ux.md` color table and `memory.md` UI identity updated.
- New decorative hero: `frontend/components/hero-canvas.tsx` — a lazy-loaded (`import("three")`) ink/accent particle constellation behind the home heading, colors read from live CSS tokens, mouse-parallax camera, single static frame under `prefers-reduced-motion`, `aria-hidden`, full dispose on unmount, silent no-op when WebGL is unavailable. `three`/`@types/three` added; the Three chunk (≈746 kB) loads only on the home route after first paint.
- Home copy made more descriptive: second deck paragraph on the no-backend/no-staging guarantee and a fifth manuscript note on printable decision receipts.
- `ui/ux.md` motion section now permits the single ambient hero constellation; anti-generic rules otherwise unchanged.
- Checks: `tsc --noEmit` PASS, `eslint .` 0/0, Vitest 44 passed (9 files), `vite build` PASS, 8/8 frontend-source python tests PASS, `npm audit:prod` clean.

## 2026-10-05 — home landing page at `/`; world desk moved to `/desk`

- New editorial landing per `ui/ux.md` (no generic Web3/AI template): folio-00 front page with display headline and protocol deck, action band to `/desk` and `/search`, a four-step "how a fact becomes canon" manuscript column (propose → retrieve → deliberate → settle), and a marginalia rail with a live contract ledger (`getStats`, gated on `CONTRACT_ADDRESS`, shared read-state sheet), the five settlement outcomes with status marks, and protocol facts. No mock or fixture content.
- World desk moved from `/` to `/desk`; masthead nav is now Home / World desk / Semantic recall; the lorechain ledger's back link points to `/desk`.
- Files: `frontend/components/home.tsx` (new `HomeLanding`), `frontend/app/page.tsx` is now the landing, new `frontend/app/desk/page.tsx` renders `WorldDesk`, `frontend/app/routes.tsx` registers `/desk`.
- Docs/tests: `ui/ux.md` gained `/` Home landing and `/desk` World desk sections; `prd.md` and `README.md` route tables updated; `test_frontend_source.py` expects `frontend/app/desk/page.tsx`; new `tests/frontend/home-page.test.ts` (4 source assertions). Vitest 43 passed (9 files), `tsc --noEmit` PASS, `eslint .` 0/0, `vite build` PASS, 8/8 frontend-source python tests PASS.

## 2026-10-05 — recall history list (browser-local, contract untouched)

- Per user request, the semantic recall panel now accumulates recalls instead of replacing results: every retrieve prepends a `RecallRun` (query, world/branch + names, timestamp, full `ReadResult` outcome) to a bounded history (`MAX_RECALL_HISTORY=20`, newest first), persisted in the existing `lorechain.recall` localStorage snapshot. A toolbar shows the kept count and a "Clear history" action. Failed/empty recalls are also recorded with their honest outcome text.
- Snapshot validation updated (`history` replaces the single `results` field; malformed entries dropped); `tests/frontend/recall-persistence.test.ts` covers restore, invalid-field dropping and the bounded-history/pending-guard source assertions. Vitest: 39 passed (8 files). `tsc --noEmit` PASS, `eslint .` 0/0, `vite build` PASS.
- New CSS (`.recall-toolbar`, `.recall-run`, `.recall-run-head`, `.recall-run-query`) uses tokens only, so `theme-tokens.test.ts` stays green. No contract change; `verify:deployment-source` untouched.

## 2026-10-05 — semantic recall persistence and repeat-recall hardening

- Per user request, the recall form now persists: world, branch, query and last results snapshot to `localStorage` under `lorechain.recall` (`RECALL_SNAPSHOT_KEY`), restored on mount with field validation; a restored world/branch is kept only if still present/eligible in live contract state, otherwise the existing first-world/first-eligible-branch fallback applies. URL `?world=` still wins over the snapshot. Persistence is local browser state only — no backend/DB introduced, canonical state remains the contract.
- Repeated recalls are guarded: pending re-entry is blocked (`if (pending || !world || !branch || !q.trim()) return;`), the button disables as "Recalling…", and the results panel shows a pending note; each recall takes ~16 s on StudioNet (on-chain query embedding).
- Coverage: `tests/frontend/recall-persistence.test.ts` — snapshot restore/drop validation (stubbed localStorage) plus source assertions for branch preservation and the pending guard. Vitest: 38 passed (8 files). `tsc --noEmit` PASS, `eslint .` 0/0, `vite build` PASS.

## 2026-10-05 — semantic recall pending state added

- User-facing issue: repeated "Retrieve lorechain" clicks looked dead because each recall embeds the query on the StudioNet leader and takes ~16 s (measured 15.8/17.3/16.8 s for three consecutive calls, all returning correctly), while the form had no pending state — the button stayed active, the screen unchanged, and concurrent clicks raced last-write-wins.
- Fix: the recall form now guards re-entry, disables the button as "Recalling…", and shows a pending note in the results panel explaining the on-chain embedding delay. Form values remain ephemeral React state by architecture (no backend/DB to persist into; refresh or navigation resets).
- Retrieval path confirmed: the browser calls the GenLayer Intelligent Contract `search_LoreChain` view method directly (read-only, LATEST_FINAL); GenVM embeds the query (all-MiniLM-L6-v2) and the contract-owned VecDB runs KNN over accepted-canon vectors. No server index, no client-side vector store, no consensus on reads.
- Checks: `tsc --noEmit` PASS, `eslint .` 0/0, Vitest 35 passed, `vite build` PASS.

## 2026-10-05 — semantic recall parser fixed for the live contract shape

- Root cause of "search_LoreChain returned malformed data": `search_LoreChain` returns plain KNN hits WITHOUT `retrieval_source`, while the shared frontend parser required it (correct for `preview_related`/`_related`, which always include it). Every semantic-recall read therefore failed parsing. This is a pre-existing contract↔frontend mismatch — the pre-rename retrieval method had the same shape; direct tests assert result truthiness only, and all hosted proofs used raw SDK reads, so the frontend parser path was never exercised with real data.
- Fix (frontend only, contract untouched → deployment parity intact): `parseRelated` accepts an optional `fallbackSource`; the search parser defaults a missing `retrieval_source` to `"VECDB"` (KNN hits are always VecDB-sourced), while the preview parser remains fail-closed and still rejects missing/unknown sources.
- Regression coverage: 3 new tests in `tests/frontend/read-path.test.ts` — search fallback, preview rejection, unknown-source rejection. Vitest: 35 passed (7 files). `tsc --noEmit` PASS, `eslint .` 0/0, `vite build` PASS, `verify:deployment-source` still PASS.
- Live proof on the official contract: `search_LoreChain(1, 1, "an ancient pact that shattered and left the city divided", 8)` returned entry 1 (`The Sundering split the Nine Wardens`, distance `0.82827777`) with exactly the raw shape the parser now accepts.

## 2026-10-05 — Vite migration consolidated and re-verified on the current tree

- Migrated the browser frontend from Next.js to a Vite 7 SPA with React Router 7 (contract + browser frontend only, per architecture): `index.html` entry, `frontend/app/main.tsx` bootstrap, client routes in `frontend/app/routes.tsx`, `Link`/`useNavigate`/`useLocation` replacing `next/link`/`next/navigation`, `import.meta.env` config with Vite `envPrefix` keeping the existing `NEXT_PUBLIC_*` Vercel variable names, self-hosted fonts via `@fontsource-variable/*` replacing `next/font`, hosted security headers + SPA fallback rewrite moved to `vercel.json`, and `eslint-config-next` replaced with `@eslint/js` + `typescript-eslint` + `eslint-plugin-react-hooks` (`react-hooks/set-state-in-effect` kept at warn per the durable decision).
- Independently re-ran the local gate on the current tree: `python3 scripts/preflight.py` PASS, `node scripts/verify-deployment-source.mjs` PASS (`149372c2…cb26`), `tsc --noEmit` PASS, `eslint .` 0 problems over 40 files, Vitest 29 passed (6 files), `vite build` PASS.
- `npm run audit:prod` had 2 high-severity advisories (`brace-expansion`, `js-yaml`); resolved with `npm audit fix`, now 0 vulnerabilities.
- Python environment root-caused: the system Python is 3.10, where pip hides `genlayer-test==0.29.2` via requires-python filtering and the already-installed `genlayer-py 0.3.0` crashes on `collections.abc.Buffer`. A Python 3.12 virtualenv at `.venv` (gitignored) installs the real pins (`genlayer-test 0.29.2`, `genlayer-py 0.16.3`); the 22 non-fixture source tests pass there in ~1.4 s. Direct Mode fixture tests still hang in this Linux environment (first fixture test idle-hung with ~2 s CPU over 12+ minutes); unresolved here and not a source-code failure. `python` is also absent from this host's PATH, so `npm run test:direct` needs the venv activated locally; CI `setup-python` provides `python`.
- Docs alignment: `trd.md` stack/build-gate now say Vite (were Next.js), `project-plan.md` prohibition list reworded, `.gitignore` covers `dist/` and `artifacts/`.
- `.env.local` (gitignored, local only) now points at the official deployment `0x8313bB950e341c573075c7DBeE500dd7d28f206f` for the dev server; earlier it briefly pointed at the retired `0x91eE572d...` acceptance address.
- NOT PROVEN here (unchanged): acceptance lifecycle writes on `0x8313bB95...`, hosted wallet write, Vercel env parity, Direct Mode fixture runs.

## 2026-10-05 — official Studionet deployment recorded and verified

- User reported the official deployment: contract `0x8313bB950e341c573075c7DBeE500dd7d28f206f`, StudioNet import link, explorer link.
- Independently verified via `genlayer-js` 1.1.8 against `https://studio.genlayer.com/api`:
  - Deploy tx `0x55f26b13b5ffd594d50a427eecb0c6b5ec76ffd64717d272d8dda31a28fc741e` from `0x5B3661C576c7001e6d6279C67F3779705d334c89` to the contract address; explorer shows Deploy / FINALIZED / GenVM SUCCESS / Accepted.
  - Independent EVM `eth_getTransactionReceipt` returns `status: 0x1`.
  - `gen_getContractCode` returns source that byte-matches `contracts/lorechain.py` (SHA-256 `149372c2538325eec32f421447156eda7a1edff89e9287d1891d03e8d490cb26`); the base64 source embedded in the deploy tx decodes to the identical hash and contains `search_LoreChain` with none of the pre-rename retrieval name.
  - `gen_getContractSchema` contains all 23 required methods including `search_LoreChain`.
  - LATEST_FINAL `stats()` returns a fresh contract (`world_count=0`) and `list_world_ids` returns `[]`.
- `DEPLOYMENT.json` updated: new address/tx/deployer, digests all `149372c2...cb26`, `contract_source_matches_deployment: true`, status `OFFICIAL_DEPLOYMENT_VERIFIED_SCHEMA_AND_READS_PASS_HOSTED_WRITE_NOT_PROVEN`; prior lifecycle/hosted evidence renamed/preserved as historical (`previous_acceptance_lifecycle_proof`, `hosted_write_status` marked HISTORICAL). `source_commit` is `null` because this workspace has no git metadata.
- README deployment section rewritten for the new address. `npm run verify:deployment-source` now PASSES (previously failed closed).
- Checks: `verify:deployment-source` PASS, `python3 scripts/preflight.py` PASS, JSON valid.
- Not claimed: acceptance lifecycle on this address, hosted wallet write, Vercel environment parity.

## 2026-10-05 — wallet sign-in signature gate

- The connect button now reads `Sign in with wallet` / `Signing in…`; hydration still uses non-interactive `eth_accounts`, but the visible address/write path requires a stored `personal_sign` proof for the same address and chain.
- `connect()` now requests `eth_requestAccounts`, then asks the injected wallet for a `personal_sign` signature over `LoreChain sign-in\nAddress: ...\nChain: ...\nIssued: ...` before setting the wallet as injected.
- `WalletState` carries an optional `signature`; `writeGate()` blocks writes when it is missing and reports `Sign in with your wallet to write.` Explicit `Disconnect`, account changes, and chain changes clear the stored signature so the next write requires a fresh sign-in.
- `frontend/components/app-shell.tsx` only renders the connected address/disconnect row when both address and signature exist.
- Checks: `npm run typecheck` PASS, `npm run lint` 0/0, `npm run test:frontend` 29 passed, `npm run build` PASS.

## 2026-10-05 — contract strings renamed to LoreChain

- Applied case-sensitive substring replacement in `contracts/lorechain.py` during the contract rename: every pre-rename entry-term symbol took its LoreChain form. Renamed contract symbols include the entry-state constants and types (`LoreChainEntry`, `LoreChainAccepted`, `LoreChainSuperseded`), the entry statement field (`LoreChain_statement`), the retrieval method (`search_LoreChain`), and the related-entries constant (`RELATED_ACTIVE_LORECHAIN`).
- Updated the frontend contract method mapping to call `search_LoreChain`; `lib/genlayer/required-methods.json` now includes `search_LoreChain`. Frontend entry types kept their original names at that time and were migrated to the Lorechain form in the later repository-wide term rename.
- Updated direct source/lifecycle tests and the get_entry unknown-record regex for the renamed contract strings/method.
- Checks: `python3 scripts/preflight.py` PASS, source tests 16 passed with `-p no:gltest`, TypeScript PASS, ESLint 0/0, Vitest 29 passed, Vite build PASS.
- Deployment parity now fails closed for the renamed contract: local normalized SHA-256 `149372c2538325eec32f421447156eda7a1edff89e9287d1891d03e8d490cb26` differs from historical deployed `d0ef35996494275ad870ada3183daf2dafac2c3623735b2396dadb98a1e936a6`.

## 2026-10-05 — sign-in button never flipped to the signed-in state

- The newly added wallet sign-in flow (`personal_sign` + `lorechain.wallet.signedIn` persistence) runs in `wallet-provider.tsx`, but the context `value` built by `useMemo` omitted `signature`, while `app-shell.tsx` gates the masthead on `w.address && w.signature`. Result: after both wallet prompts succeeded the header still rendered "Sign in with wallet", so signing in looked broken (and re-clicking re-prompted).
- Fix: expose `signature: wallet.signature` in the provider context value (`frontend/components/wallet-provider.tsx`); no change to `app-shell.tsx`, `writeGate`, or the session helpers.
- New guard `tests/frontend/wallet-signin.test.ts` asserts the provider publishes `signature`, the masthead still requires address plus signature, and persist/restore/clear/`personal_sign` wiring stays present.
- Also repaired from the concurrent signature-persistence edit: repo-wide `tsc --noEmit` and `eslint .` are green again.
- Verified: `tsc --noEmit` PASS, `eslint .` 0/0, Vitest 32 passed (7 files), `vite build` PASS, `python3 scripts/preflight.py` PASS. The actual wallet prompt was NOT exercised here (no injected wallet in this environment); refresh the browser and sign in once to confirm live.

## 2026-10-05 — masthead, empty-state and search polish

- Screenshot-driven pass over the two weak surfaces (world desk without a contract, semantic recall), staying inside the `ui/ux.md` story-bible system.
- Masthead: live stamp pushed to the right edge of the brand cell, wallet utility uses `space-between` so the network caption anchors to its rule, duplicate 2px rule removed (`border-right` dropped from `.masthead-nav`), nav/wordmark/index/button hover states added, global `:focus-visible` outline in vermilion.
- Empty states: `.empty-state` now fills the main row (`.site-shell main` is a grid row), folio marker gained an ink rule, copy block gained a top rule, and `VITE_LORECHAIN_CONTRACT` renders as a bordered code chip; headline capped at 920px.
- Search: controls panel uses `--wash-desk`, results panel uses `--wash-manuscript`, primary action is full-width in the rail, focus turns field borders vermilion, and `SemanticSearch` now shows a ruled idle note before the first recall plus a "no match" note; world/branch selects show honest fallback options instead of rendering empty.
- Verified with headless Chrome screenshots of `/` and `/search` in both themes (dark by default, light by temporary forced fallback that was reverted in `index.html`), pixel-probed panel backgrounds, then `vitest` 29 passed, scoped `eslint` 0 errors on the touched files, `vite build` PASS, `python3 scripts/preflight.py` PASS, all 8 `test_frontend_source.py` tests PASS.
- **Concurrent-edit warning:** at 16:09 `lib/wallet-session.ts` and `frontend/components/wallet-provider.tsx` were modified by a signature persistence edit, not by this work unit. That edit was completed later in the wallet sign-in work unit below; typecheck, lint, Vitest and build now pass.

## 2026-10-05 — dark/light theme added to the frontend

- `frontend/app/globals.css` now has zero hard-coded colors: the 17 stray hex/rgba values became tokens (`--rule-strong`, `--wash-alert`, `--wash-masthead`, `--wash-desk`, `--wash-margin`, `--wash-manuscript`, `--wash-sheet`, `--wash-empty`, `--field-bg`, `--paper-stripe`), and a `[data-theme=dark]` block redefines every token (paper `#1b1713`, ink `#f0e7d9`, vermilion `#e07a5f`, olive `#9aae70`, …) with matching rule/wash tokens and `color-scheme:dark`.
- Light `:root` values are unchanged, so `tests/direct/test_frontend_source.py::test_visual_identity` still asserts the manuscript identity.
- Masthead `.theme-toggle` in `frontend/components/app-shell.tsx` switches theme, persists `lorechain.theme` in `localStorage`, and an inline script in `index.html` applies the stored choice (or `prefers-color-scheme` on first visit) before first paint.
- New guard `tests/frontend/theme-tokens.test.ts`: dark block overrides every light color token, no hard-coded colors outside the two token blocks, bootstrap script and toggle wiring present.
- `eslint.config.mjs` now ignores `.venv/**` (matches `.gitignore`); a `.venv` created in this environment was being linted and failing `no-undef` on vendored Python JS.
- Verified: `eslint .` 0/0, `tsc --noEmit` PASS, Vitest 29 passed (6 files), `vite build` PASS, `python3 scripts/preflight.py` PASS, all 8 `test_frontend_source.py` tests pass when invoked directly, dev server serves the bootstrap script and the compiled toggle.

## 2026-10-05 — browser source moved under `frontend/`

- Moved `app/` and `components/` into a new top-level `frontend/` folder (`frontend/app`, `frontend/components`); `lib/`, `contracts/`, `tests/`, `scripts/` stay at the root. No application architecture change — contract + browser frontend only.
- Updated the Vite entry in `index.html` to `/frontend/app/main.tsx`, all `@/components/*` imports to `@/frontend/components/*`, and the path assertions in `tests/direct/test_frontend_source.py` (route list, `frontend/components/wallet-provider.tsx`, `frontend/app/globals.css`). The no-backend guards in `scripts/preflight.py` and `test_no_backend` now check `frontend/app/api` as well as the legacy paths.
- Fixed a pre-existing break found during verification: `frontend/app/routes.tsx` imported `./worlds/[worldId]/lorechain/page` but the directory had been left named `lore`, so `tsc --noEmit` failed before this move. Renamed the folder back to `lorechain` to match `routes.tsx`, the route table in `memory.md`, `prd.md`, `trd.md`, `architecture.md`, `ui/ux.md`, `README.md` and the test expectation. Public URL `/worlds/:worldId/lorechain` is unchanged.
- Verified after the move: `python3 scripts/preflight.py` PASS, `tsc --noEmit` PASS, `eslint .` 0/0, `vite build` PASS, Vitest 25 passed, all 8 `tests/direct/test_frontend_source.py` tests pass when invoked directly, and the dev server serves `/frontend/app/main.tsx` with HTTP 200.
- Known environment blocker (unchanged): `python -m pytest tests/direct` cannot collect in this environment because installed `genlayer-py 0.3.0` fails `from collections.abc import Buffer` on Python 3.10.

## 2026-10-05 — rename to LoreChain applied

- Replaced the pre-rename product identifiers (upper, mixed and lower case forms) across identifiers, docs, paths, environment variable names, package metadata, contract class name and contract path with LoreChain/LORECHAIN/lorechain; renamed the contract file to `contracts/lorechain.py`.
- Updated the visible masthead mark from `CM` to `LC` and fixed the Vite config to resolve the `@/*` alias directly, making the production build pass after the rename.
- `python3 scripts/preflight.py`: PASS — 23 required contract methods; no backend paths.
- Frontend Vitest: 25 passed. TypeScript: PASS. ESLint: 0/0. Vite build: PASS.
- Direct Mode full suite is NOT green in this environment: installed `genlayer-test 0.1.2` and `genlayer-py 0.3.0` fail to import on Python 3.10; without plugin autoload the 22 non-fixture source tests passed and 39 lifecycle Direct fixture errors occurred. This is an environment/package-version blocker, not a rename failure.
- `deployment source parity` now FAILS closed: local contract digest `4735574c2d7a33bfd602ef3aa8b69d69eceb0416bc57edd85ad9ffd4a85ee094` differs from the historically deployed normalized digest `d0ef35996494275ad870ada3183daf2dafac2c3623735b2396dadb98a1e936a6`. Existing address `0x91eE572dB3981b60A72Ec29802af35eF86EFf22A` remains historical provenance for the pre-rename source only.

## 2026-08-27 — team-review acceptance hardening

- Fresh acceptance deployment: source commit `d3548daa7003f2cc18d808dbf56ce0f9c2b63871`, normalized source SHA-256 `d0ef35996494275ad870ada3183daf2dafac2c3623735b2396dadb98a1e936a6`, contract `0x91eE572dB3981b60A72Ec29802af35eF86EFf22A`, deployment tx `0xc9e14e5141dfa2fc9db8feb4d2629787f22cb4babb75e3a8eebcfe00c0ee08b5`, deployer `0xb29Ead15B1E8A2420faE84de974088f67a15ccC2`. Receipt is FINALIZED, leader GenVM SUCCESS, and the independent EVM receipt is `0x1`.
- `_related()` now performs global top-32 KNN retrieval followed by bounded entity-index and lineage-index fallback (`MAX_ENTITY_FALLBACK_SCAN=16`, `MAX_SCOPED_FALLBACK_SCAN=16`). Fallback candidates are fully revalidated, deduplicated, capped, and frozen into settlement context. Direct Mode starvation coverage proves an eligible World A entry remains settlement-capable when global KNN contains only unrelated World B neighbors.
- The submitted frontend now visibly exposes `set_editor`, `set_branch_active`, `cancel_proposal`, and `invalidate_stale_proposal`, with steward/submitter/stale eligibility and exact FINALIZED + GenVM SUCCESS + LATEST_FINAL confirmation.
- The old `0xCb4E...` deployment remains historical. Vercel is still at `https://lorechain.vercel.app`, but owner action is required to set `VITE_LORECHAIN_CONTRACT=0x91eE572dB3981b60A72Ec29802af35eF86EFf22A` and redeploy; hosted proof against the new address is therefore NOT PROVEN here.

## 2026-08-27 — hosted production evidence closure

- Independently verified hosted write `0x4eca0fc1cb7b19847cea1e4b5249f9b31c305457c43cf0959f3450ee127b93ab`: `to_address` is the current contract `0xCb4E8279Eff17c734c3eA2e32657691610b3467A`, status is `FINALIZED`, leader execution is `SUCCESS`, and receipt stdout/stderr are empty.
- With `genlayer-js` using `TransactionHashVariant.LATEST_FINAL`, `list_world_ids` returned `[1, 2]`, `get_world(2)` returned name `The Ember Archive` with its recorded charter, and `stats` returned `world_count=2`, `branch_count=3`, `entry_count=1`, `proposal_count=1`.
- Hosted proof now establishes production URL, injected-wallet write, finalized lorechain reread, wallet refresh persistence, explicit/manual disconnect persistence, and no Snap dependency. No contract change or redeployment was made.

## 2026-08-26 — wallet and hosted-read hardening

- Wallet hydration now performs only non-interactive `eth_accounts` on initial mount, restores an authorized account and chain without a popup, honors the non-sensitive `lorechain.wallet.manualDisconnect` preference, and exposes an explicit Disconnect button. Provider account, chain and disconnect events remain handled.
- Frontend confirmation remains state-delta based for world, branch, proposal and review writes; lorechain input normalization mirrors contract storage for bounded strings, digests, modes and entity keys.
- Added safe response headers (`nosniff`, strict referrer policy, restricted permissions, `X-Frame-Options: DENY`).
- Independently opened https://lorechain.vercel.app: page loaded and live reads rendered the deployed state (1 world, 2 branches, 1 lorechain entry, 1 proposal). No injected wallet was available in this browser, so hosted wallet write is NOT PROVEN / OWNER ACTION REQUIRED.

## 2026-08-26 — final frontend/reproducibility hardening

- Added behavioral frontend unit coverage for exact world/branch/proposal ID deltas, reviewed outcome state, and effective inactive-ancestor lineage. Vitest result: 5 passed.
- Integrated those confirmations into production world, branch, proposal, and review writes. Refresh, FINALIZED, or GenVM success alone no longer produces terminal UI success.
- Added `package-lock.json`, switched CI installation to `npm ci`, and included frontend tests plus deployment source parity in `npm run verify`.
- Updated deployment manifest repository metadata to the current known main SHA. Contract source remains unchanged; existing final contract parity remains valid.
- Hosted URL and hosted-wallet write remain NOT PROVEN here because the owner-managed Vercel URL/injected browser session is not exposed.
- Final pushed commit: `01a03dd841debdbb50cb81d591795865bfba5904`; `origin/main` matches. The contract file is unchanged from deployed source `b5c339435e440c9a99a1993b061525f1d8b689fb`, so the current address remains release-valid. GitHub run `32989102520` is the last known successful baseline; a new run for this pushed commit is not yet observed in this environment.

## 2026-08-26 — Takeover attempt / environment blocker

- Confirmed checkout `HEAD` and `origin/main` are both `9d7084ae3e5af16d72cc8231fe99bcc867319b4b`; a fresh pull was attempted and GitHub HTTPS was unavailable.
- `requirements-dev.txt` installed successfully with the bundled Python runtime.
- `scripts/preflight.py`: PASS — 23 required contract methods, no backend paths.
- `pytest tests/direct -q`: PASS — 20 passed.
- Required JavaScript install is NOT PROVEN because the system npm launcher is broken and package downloads return `EACCES` from the available package manager, including with escalation.
- StudioNet deployment is BLOCKED in this environment: no `genlayer` executable and no authenticated supported CLI account are available. No deployment facts or lifecycle claims were made.

## 2026-08-26 — StudioNet deployment proof

- Using the supported `npm.cmd` CLI path, selected built-in StudioNet and used the existing unlocked account `0xb29Ead15B1E8A2420faE84de974088f67a15ccC2`.
- Deployed frozen commit `7a6eb49fae2cabd8f865ad2a4f232987c703e3a0`; contract source SHA-256 is `fbc45de30aad01dd4fbf0cf5f9e8ee8bb47b923993824cc35c04a6ea9fa154f9`.
- Deployment tx: `0xe2eb9438f5b44c395a10fd2e4fe2ab690322f471cef39b648c0182223dce4831`.
- Contract address: `0xE386595d8Eb891e07597a6BAEad32c27E749FEc9`.
- GenLayer receipt: `FINALIZED`; leader GenVM execution `SUCCESS`; stdout/stderr empty; no execution error.
- Independent StudioNet RPC receipt returned `status: 0x1`.
- Next exact action: set `VITE_LORECHAIN_CONTRACT` to the deployed address, run schema/live-read checks, then execute and record every real lifecycle transaction with authoritative state re-reads.

## 2026-08-26 — Deployment registration blocker

- The first deployment transaction is receipt-verified (`FINALIZED`, leader `SUCCESS`, independent EVM `status: 0x1`) but `gen_getContractSchema`, `gen_getContractCode`, and `gen_call` all return `Contract 0xe386595d8eb891e07597a6baead32c27e749fec9 not found`.
- A second deployment of the exact same frozen source returned tx `0x6f108e4b557d709de9d5d28d148c7f3b82d587296fad2b284969c482f21c8635`; independent EVM receipt is `status: 0x1`, but its target `0x8Ca88ECbA344892a0e1f281c4c025897094dD8Bb` is also absent from `gen_getContractSchema`.
- This is a StudioNet/CLI deployment-registration blocker. Schema/live reads cannot be proven, so no lifecycle transactions or frontend deployment were attempted.

## 2026-08-26 — Receipt address and Direct Mode follow-up

- Confirmed CLI `0.39.2`, built-in `studionet` network, chain `61999`, RPC `https://studio.genlayer.com/api`, and active deployer `0xb29Ead15B1E8A2420faE84de974088f67a15ccC2`.
- Extracted complete receipts for both prior deployments. For tx `0xe2eb9438f5b44c395a10fd2e4fe2ab690322f471cef39b648c0182223dce4831`, `data.contract_address` is `0xE386595d8Eb891e07597a6BAEad32c27E749FEc9`; for tx `0x6f108e4b557d709de9d5d28d148c7f3b82d587296fad2b284969c482f21c8635`, it is `0x8Ca88ECbA344892a0e1f281c4c025897094dD8Bb`. Both match their CLI-displayed addresses byte-for-byte.
- Both receipts are `FINALIZED`, leader GenVM `SUCCESS`, and independent `eth_getTransactionReceipt` status `0x1`. Address-based CLI/SDK code, schema and `gen_call(stats())` checks still return `Contract not found`; no alternate lorechain address was discovered. This is Case C registration resolution, not proven operational deployment.
- Added genuine GenLayer Direct Mode execution coverage using `genlayer-test 0.29.2` with the contract-pinned `v0.2.16` GenVM runner: deployment/create-world/root branch, authorization, invalid modes/bounds, compatible acceptance, same-branch retcon supersession, branch-local shadowing, sibling isolation, semantic retrieval, and insufficient-context no-entry behavior. Full direct suite result after correction: 23 passed (20 existing + 3 new).
- On Windows, `genlayer-test 0.29.2` has a harness cleanup bug when unlinking its still-open stdin temp file (`WinError 32`). `tests/direct/conftest.py` contains a narrowly scoped cleanup workaround; the contract remains loaded and executed by the real Direct VM.
- VecDB source inspection found only global `knn(vector, k)` and iteration, with no metadata filter or namespace. The existing bounded global top-32 scan can starve eligible same-world entries beyond rank 32; no unsupported fix was made. This remains a documented limitation requiring either future runtime filtering or an explicitly bounded contract indexing design.
- StudioNet schema/live reads remain NOT PROVEN; therefore no real StudioNet lifecycle, Vercel deployment or hosted-wallet write is claimed.

## 2026-08-23 — Blueprint pack

Created AGENTS, PRD, TRD, architecture, UI/UX, plan, memory and handoff. No code/deployment existed yet.

Durable defaults: StudioNet 61999, `genlayer-js` 1.1.8, injected-wallet writes, accepted-only semantic memory, distinct editorial UI.

## 2026-08-26 00:18 +01:00 — Architecture reconciliation

Final owner requirement superseded the old Worker/D1/R2 blueprint boundary. LoreChain became contract + browser frontend only, with no application database/backend/indexer/mock-data mode. Optional public evidence is externally hosted and digest-bound.

Implemented initial protocol/client foundations: worlds, root branch, editor roles, branches, proposals, lineage snapshots, VecDB, semantic search, direct StudioNet data source and wallet/finality helpers.

## 2026-08-26 00:34 +01:00 — Lorechain semantics hardening

Discovered a critical branch semantics issue and fixed it:

- `RETCON_VALID` may supersede only active same-branch lorechain.
- `BRANCH_ONLY` uses branch-local override flags for active inherited ancestor lorechain.
- Ancestor entries are never globally mutated by child branches.
- Descendant branches inherit the override shadow.
- Branch activation changes bump version and can stale frozen proposals.

Implemented the full product route set: world desk, lorechain ledger, entity dossier, timeline, branch genealogy, proposal composer/review, semantic recall and decision receipt.

Verification at this stage:

- Python contract syntax: PASS.
- Preflight: PASS.
- direct/source tests: 20 passed.

## 2026-08-26 01:06 +01:00 — Release verification scaffold

Added:

- no-backend/no-mock source gates
- explicit zero-value GenLayer writes
- deployment manifest
- schema verifier
- StudioNet read exercise
- CLI deployment script
- GitHub Actions verification
- README/license/env templates

Reality check at that time:

- no contract address/deployment transaction/Vercel URL was claimed;
- `DEPLOYMENT.json` remained `NOT_DEPLOYED`.

## 2026-08-26 01:38 +01:00 — CI failure triage

GitHub Actions exposed a real TypeScript compatibility issue: `tsconfig.json` targeted ES2017 while the GenLayer client uses native BigInt literals. Updated the target to ES2022.

The next CI run proved:

- dependency installation: PASS;
- preflight: PASS;
- 20 direct/source tests: PASS;
- TypeScript: PASS.

It then stopped on React 19 lint heuristics around asynchronous refresh effects. The flagged helpers await live contract reads before setting state, so `react-hooks/set-state-in-effect` was moved to warning level instead of disabling the lint/build gate.

## 2026-08-26 01:42 +01:00 — Full GitHub verification green

GitHub Actions run `32916066098` on commit `307a29c7d4a63e903e625e19012a337349de5aae` completed successfully.

Verified facts:

- `python scripts/preflight.py` — PASS: 23 required contract methods; no backend paths.
- `python -m pytest tests/direct -q` — **20 passed**.
- `tsc --noEmit` — PASS.
- `eslint .` — completed with warnings only; no errors.
- `next build` — PASS on Next.js 16.3.2 / Turbopack.
- all required application routes were emitted by the production build.

Also replaced the placeholder README and landed the reconciled architecture/PRD/TRD/project plan/UI-UX repository docs so the next agent does not need hidden chat context.

### Reality check

Proven: source architecture, direct/source invariant coverage, TypeScript compatibility, lint gate, production frontend build.

At the original implementation checkpoint, StudioNet deployment, schema parity and live lifecycle were not proven. Current deployment and lifecycle facts are recorded in the dated entries below. Still not proven: Vercel URL, hosted wallet write, remote Studio Mode disagreement, and several live negative paths.

### Deployment handoff sequence

1. Pull current `main`; do not rewrite the architecture.
2. Run `npm run verify` once in the deployment environment.
3. Confirm a supported authenticated GenLayer CLI account without exposing/committing secrets.
4. Deploy `contracts/lorechain.py` to StudioNet.
5. Verify deployment transaction reaches FINALIZED and actual GenVM execution is successful.
6. Record contract address, deploy tx, deployer and frozen source commit in `DEPLOYMENT.json`, `memory.md`, `handoff.md`.
7. Set `VITE_LORECHAIN_CONTRACT` and run `npm run verify:schema`.
8. Execute real lifecycle proof: create world → create child branch → establish accepted lorechain → compatible proposal → same-branch retcon → branch-only divergence; exercise an insufficient/fail-closed case where practical.
9. For every write, record transaction hash, FINALIZED status, actual GenVM execution result and authoritative re-read.
10. Deploy the verified commit to Vercel with the StudioNet contract env value.
11. From hosted UI, verify public reads, explicit injected wallet connection, wrong-network gate and at least one successful hosted write.
12. Only then mark `DEPLOYMENT.json` deployed and add public contract/explorer/frontend URLs.

**Do not:** add a backend/database/indexer/mock mode; create a private-key fallback; weaken same-branch retcon/branch-local override semantics; treat VecDB distance as confidence; claim a transaction succeeded from hash/finality alone; invent any deployment fact.

## Hardening checkpoint

- Studio Mode isolation: the bundled executable is available and was invoked with `--network studionet`, but its fixtures remained Direct Mode; the temporary control contract passed in-memory. Remote Studio Mode control/LoreChain deployment is `NOT PROVEN`.
- An inactive ancestor now makes a selected lineage ineligible for proposal submission, review, semantic retrieval, and descendant branch creation until reactivated.
- Review performs a second lineage freshness check immediately after consensus. Explicit `duplicate_of` equivalence settles `INSUFFICIENT_CONTEXT` without appending duplicate lorechain.
- Direct Mode covers unavailable, mismatched, and valid HTTPS SHA-256-bound evidence. Frontend writes remain in `confirming` until authoritative state re-read succeeds.
- The Direct Mode framework executes one mocked leader path and cannot simulate separate leader/validator responses; adversarial disagreement proof is `NOT PROVEN`.
- The strict-target hardening rejects malformed/mixed/duplicate/coerced IDs as complete target-set failures and applies deterministic entity-key intersection checks. `duplicate_of` is now persisted and returned by `get_proposal`; frontend parsing is updated.
- The bundled `gltest.exe` was invoked at `C:\Users\\USER\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\Scripts\\gltest.exe --network studionet`. Its available fixtures remained Direct Mode; a temporary control contract passed in-memory, so remote Studio Mode deployment remains `NOT PROVEN`.
- Fresh current-source CLI deployment is operational: commit `50506030388dd3570b6474d7ce02219b28ffe85b`, source SHA-256 `d19575da9f1e5d1f090cde62eb852377887adb588b729ae013b07f959c2fd71a`, address `0x86280023045b2801966f9561313DaeB82EdC3C74`, tx `0x934a31d7aef2b071091505c91bb8b22407a973f7f1bf477d6140decd3e1bfd36`. FINALIZED, leader SUCCESS, independent EVM receipt `0x1`, exact code/schema/stats reads PASS.
- Historical pre-release proof on the previous deployment commit: create world `0xbc1e7298d2506732246be06ab0f4f580be085f9f03a7bbf6020b17dee0b25c50`; child branch `0x2c309e82d31da739b73873d44d9d41209da529d8eff65a50e8c74b13e943df80`; proposal submission `0xc2b553e5b759dd15fa6f2fc5986e4ea293c31f1808d3d3700ca50d89b872ab4b`; COMPATIBLE review `0xd6867982769a30f2832ca93b03cd44a8172edd018d240d98041f520803a2598f`; grandchild `0x37489f8c24098be2d0481a6e7bebf9e9ae60ec3a73dfb030281caa06f7e06339`. All reached FINALIZED, leader SUCCESS, and state re-reads confirmed.
- Additional live proof on the current deployment: branch-only submission `0xc06334c81996be66ebb97f7de3ed667e6454ee0f7a5b5c9f956845ace0f1c888` and review `0xc20cc1dd68ff2c841ce03f0c612d2bbe8467cd271fe1e776984eef6d44a225dd` reached FINALIZED with leader SUCCESS. Proposal 3 settled BRANCH_ONLY, resulting entry 2 on branch 2 recorded override [1], while parent entry 1 remained readable. Same-branch RETCON submission `0x05ad69aba423fb8ad9e304d96a1254a8d921d3b6bb7d09f833f3182e76b20109` and review `0x6230c4ec7494c35a28978df0511175027ae0df022d2d8c7f2b8424c083076401` likewise reached FINALIZED with leader SUCCESS. Proposal 4 settled RETCON_VALID, resulting entry 3; entry 1 remained readable with superseded_by=3. Grandchild search returned current lineage entries.
- Final hardened release redeployed after strict envelope/duplicate validation changes: commit `b5c339435e440c9a99a1993b061525f1d8b689fb`, SHA-256 `8a6e4aa3a4fafab477618043637736d39e80988eb508a12f1736521f9d41528e`, address `0xCb4E8279Eff17c734c3eA2e32657691610b3467A`, tx `0x54856986a9b0bfd1f591e5027c9c36b2960e30edb10178fb97c4f80fe7c16f63`. Receipt address matches CLI, FINALIZED, leader SUCCESS, EVM receipt 0x1, code/schema/stats PASS.
- Final-source live proof: create world `0xa259a16ff111c9f54d231359c34b3092abd40355d187763e8e1f6ecbe331784b`; child branch `0x5968c462d853bb6ea41162aad1eea0d903070bd14d29f0ac3ebb5f9db1768031`; submit `0x235e05096ec18f765da5c4bd05fb1ea3fe4021f2d2ec7d162b66a434d0ced334`; review `0x5ab893d835b64e0878ed24e194a61bbba51250e1a6c6353e91526f4b877aa8de`. Each reached FINALIZED with leader SUCCESS; authoritative state is world=1, branches=2, proposal=1 COMPATIBLE, entry=1, and `search_LoreChain` returns entry 1.
