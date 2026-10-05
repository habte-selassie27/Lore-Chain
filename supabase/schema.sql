-- LoreChain semantic-recall history (owner-approved convenience store).
-- Canonical truth remains the GenLayer contract; this table only syncs a
-- wallet's recall history across devices. Run in the Supabase SQL editor,
-- then enable Authentication → Sign In / Up → Web3 → Ethereum.

create table if not exists public.recall_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  wallet_address text not null,
  world_id integer not null,
  world_name text,
  branch_id integer not null,
  branch_name text,
  query text not null,
  outcome jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists recall_runs_user_created_idx
  on public.recall_runs (user_id, created_at desc);

alter table public.recall_runs enable row level security;

create policy "own recall rows readable" on public.recall_runs
  for select using (auth.uid() = user_id);

create policy "own recall rows insertable" on public.recall_runs
  for insert with check (auth.uid() = user_id);

create policy "own recall rows deletable" on public.recall_runs
  for delete using (auth.uid() = user_id);
