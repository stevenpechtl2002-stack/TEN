create table posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  community_id uuid,
  created_at timestamptz not null default now()
);

create table post_likes (
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

create table post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table posts enable row level security;
alter table post_likes enable row level security;
alter table post_comments enable row level security;

create policy "Posts are viewable by everyone" on posts for select using (true);
create policy "Authenticated users can create posts" on posts for insert with check (auth.uid() = author_id);
create policy "Authors can delete their own posts" on posts for delete using (auth.uid() = author_id);

create policy "Likes viewable by everyone" on post_likes for select using (true);
create policy "Authenticated users can like" on post_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on post_likes for delete using (auth.uid() = user_id);

create policy "Comments viewable by everyone" on post_comments for select using (true);
create policy "Authenticated users can comment" on post_comments for insert with check (auth.uid() = author_id);
create policy "Authors can delete comments" on post_comments for delete using (auth.uid() = author_id);
