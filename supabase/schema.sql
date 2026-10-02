-- Jalankan seluruh isi file ini di Supabase > SQL Editor.

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null,
  description text not null,
  image_url text,
  farmer_name text,
  region text,
  commodity text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  author_name text not null,
  profession text not null,
  institution text,
  region text,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.questions enable row level security;
alter table public.answers enable row level security;

create policy "questions dibaca semua orang" on public.questions for select using (true);
create policy "questions dibuat user login" on public.questions for insert to authenticated with check (auth.uid() = user_id);
create policy "questions dihapus pemilik" on public.questions for delete to authenticated using (auth.uid() = user_id);

create policy "answers dibaca semua orang" on public.answers for select using (true);
create policy "answers dibuat user login" on public.answers for insert to authenticated with check (auth.uid() = user_id);
create policy "answers dihapus pemilik" on public.answers for delete to authenticated using (auth.uid() = user_id);

-- Storage untuk foto pertanyaan
insert into storage.buckets (id, name, public) values ('question-images', 'question-images', true) on conflict (id) do nothing;

create policy "foto dibaca semua orang" on storage.objects for select using (bucket_id = 'question-images');
create policy "foto diunggah user login" on storage.objects for insert to authenticated
  with check (bucket_id = 'question-images' and (storage.foldername(name))[1] = auth.uid()::text);
