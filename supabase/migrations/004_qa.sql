create table qa_rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table qa_questions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references qa_rooms(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  upvotes int not null default 0,
  created_at timestamptz not null default now()
);

create table qa_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references qa_questions(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  upvotes int not null default 0,
  is_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

alter table qa_rooms enable row level security;
alter table qa_questions enable row level security;
alter table qa_answers enable row level security;

create policy "QA rooms viewable by all" on qa_rooms for select using (true);
create policy "Questions viewable by all" on qa_questions for select using (true);
create policy "Authenticated users can ask" on qa_questions for insert with check (auth.uid() = author_id);
create policy "Answers viewable by all" on qa_answers for select using (true);
create policy "Authenticated users can answer" on qa_answers for insert with check (auth.uid() = author_id);

insert into qa_rooms (name, slug, description) values
  ('Gründung', 'gruendung', 'Fragen rund ums Unternehmen gründen'),
  ('Steuern & Finanzen', 'steuern-finanzen', 'Steuerliche und finanzielle Fragen'),
  ('Marketing', 'marketing', 'Marketing, Social Media, Werbung'),
  ('Recht', 'recht', 'Rechtliche Fragen für Unternehmer'),
  ('Team & HR', 'team-hr', 'Mitarbeiter, Verträge, Personalfragen'),
  ('Technologie', 'technologie', 'Tech, Software, Digitalisierung');
