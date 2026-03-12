-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Properties table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  hotel_name text not null,
  location text,
  room_count text,
  extracted_data jsonb not null,
  system_prompt text not null,
  is_active boolean default true,
  trial_started_at timestamptz default now(),
  trial_ends_at timestamptz default (now() + interval '14 days'),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Conversations table
create table public.conversations (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  guest_session_id text not null,
  language_detected text default 'en',
  started_at timestamptz default now(),
  last_message_at timestamptz default now(),
  message_count integer default 0
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  revenue_signal text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.properties enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- RLS Policies for properties
create policy "Users can view own properties"
  on public.properties for select
  using (auth.uid() = user_id);

create policy "Users can insert own properties"
  on public.properties for insert
  with check (auth.uid() = user_id);

create policy "Users can update own properties"
  on public.properties for update
  using (auth.uid() = user_id);

create policy "Users can delete own properties"
  on public.properties for delete
  using (auth.uid() = user_id);

-- RLS Policies for conversations (via property ownership)
create policy "Users can view own conversations"
  on public.conversations for select
  using (
    exists (
      select 1 from public.properties
      where properties.id = conversations.property_id
      and properties.user_id = auth.uid()
    )
  );

create policy "Public can insert conversations"
  on public.conversations for insert
  with check (true);

create policy "Public can update conversations"
  on public.conversations for update
  using (true);

-- RLS Policies for messages (via property ownership)
create policy "Users can view own messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.properties
      where properties.id = messages.property_id
      and properties.user_id = auth.uid()
    )
  );

create policy "Public can insert messages"
  on public.messages for insert
  with check (true);

-- Public read policy for properties (for guest assistant page)
create policy "Public can view active properties"
  on public.properties for select
  using (is_active = true);
