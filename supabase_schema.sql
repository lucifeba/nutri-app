-- Enable RLS
alter table auth.users enable row level security;

-- PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role text check (role in ('admin', 'patient')) default 'patient',
  phone text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- ANAMNESIS
create table public.anamnesis (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) not null,
    data jsonb not null default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.anamnesis enable row level security;
create policy "Users can view own anamnesis" on public.anamnesis for select using (auth.uid() = user_id);
create policy "Users can insert own anamnesis" on public.anamnesis for insert with check (auth.uid() = user_id);
create policy "Users can update own anamnesis" on public.anamnesis for update using (auth.uid() = user_id);
create policy "Admins can view all anamnesis" on public.anamnesis for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- MENUS
create table public.menus (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) not null,
    week_start_date date not null,
    content jsonb not null default '{}'::jsonb,
    created_at timestamptz default now()
);

alter table public.menus enable row level security;
create policy "Users can view own menus" on public.menus for select using (auth.uid() = user_id);
create policy "Admins can insert menus" on public.menus for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update menus" on public.menus for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- TRIGGER FOR NEW USER -> PROFILE
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'patient');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
