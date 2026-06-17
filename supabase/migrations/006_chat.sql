create table conversations (
  id uuid primary key default gen_random_uuid(),
  participant_1_id uuid references profiles(id) on delete cascade not null,
  participant_2_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique(participant_1_id, participant_2_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table conversations enable row level security;
alter table messages enable row level security;

create policy "Users see their own conversations" on conversations for select using (
  auth.uid() = participant_1_id or auth.uid() = participant_2_id
);
create policy "Authenticated users can start conversations" on conversations for insert with check (
  auth.uid() = participant_1_id or auth.uid() = participant_2_id
);

create policy "Participants see messages" on messages for select using (
  exists (
    select 1 from conversations
    where id = conversation_id
    and (participant_1_id = auth.uid() or participant_2_id = auth.uid())
  )
);
create policy "Participants can send messages" on messages for insert with check (
  auth.uid() = sender_id and exists (
    select 1 from conversations
    where id = conversation_id
    and (participant_1_id = auth.uid() or participant_2_id = auth.uid())
  )
);
