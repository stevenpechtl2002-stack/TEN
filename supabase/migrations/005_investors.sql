create table investor_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  sectors text[] not null default '{}',
  investment_min int,
  investment_max int,
  bio text,
  website text,
  created_at timestamptz not null default now()
);

create table pitches (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  stage text not null check (stage in ('idea', 'mvp', 'growth', 'scaling')),
  funding_needed int,
  deck_url text,
  created_at timestamptz not null default now()
);

create table pitch_applications (
  id uuid primary key default gen_random_uuid(),
  pitch_id uuid references pitches(id) on delete cascade not null,
  investor_id uuid references profiles(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  message text,
  created_at timestamptz not null default now(),
  unique(pitch_id, investor_id)
);

alter table investor_profiles enable row level security;
alter table pitches enable row level security;
alter table pitch_applications enable row level security;

create policy "Investor profiles viewable by all" on investor_profiles for select using (true);
create policy "Users can create investor profile" on investor_profiles for insert with check (auth.uid() = id);
create policy "Investors can update their profile" on investor_profiles for update using (auth.uid() = id);

create policy "Pitches viewable by all" on pitches for select using (true);
create policy "Authenticated users can create pitches" on pitches for insert with check (auth.uid() = author_id);
create policy "Authors can update pitches" on pitches for update using (auth.uid() = author_id);

create policy "Applications viewable by involved parties" on pitch_applications for select using (
  auth.uid() = investor_id or auth.uid() = (select author_id from pitches where id = pitch_id)
);
create policy "Investors can apply" on pitch_applications for insert with check (auth.uid() = investor_id);
create policy "Investors can update status" on pitch_applications for update using (auth.uid() = investor_id);
