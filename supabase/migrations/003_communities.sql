create table communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  creator_id uuid references profiles(id) on delete cascade not null,
  is_private boolean not null default false,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table community_members (
  community_id uuid references communities(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'moderator', 'admin')),
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

create table groups (
  id uuid primary key default gen_random_uuid(),
  community_id uuid references communities(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table communities enable row level security;
alter table community_members enable row level security;
alter table groups enable row level security;

create policy "Public communities viewable by all" on communities for select using (
  not is_private or id in (
    select community_id from community_members where user_id = auth.uid()
  )
);
create policy "Anyone can create communities" on communities for insert with check (auth.uid() = creator_id);
create policy "Admins can update community" on communities for update using (
  id in (select community_id from community_members where user_id = auth.uid() and role = 'admin')
);

create policy "Members viewable by all" on community_members for select using (true);
create policy "Users can join communities" on community_members for insert with check (auth.uid() = user_id);
create policy "Users can leave communities" on community_members for delete using (auth.uid() = user_id);

create policy "Groups viewable by all" on groups for select using (true);
