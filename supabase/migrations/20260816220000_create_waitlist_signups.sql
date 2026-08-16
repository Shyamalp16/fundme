create extension if not exists citext with schema extensions;

create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null unique,
  role text not null default 'both'
    constraint waitlist_signups_role_check
    check (role in ('both', 'creator', 'supporter')),
  marketing_consent boolean not null
    constraint waitlist_signups_consent_check
    check (marketing_consent is true),
  consented_at timestamptz not null default now(),
  source text not null default 'prelaunch-web'
    constraint waitlist_signups_source_length_check
    check (char_length(source) between 1 and 64),
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_length_check
    check (char_length(email::text) between 3 and 320),
  constraint waitlist_signups_email_format_check
    check (email::text ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);

comment on table public.waitlist_signups is
  'Pre-launch fun(d)ME waitlist signups with explicit marketing consent.';

create index waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

revoke all on table public.waitlist_signups from anon, authenticated;

grant insert (email, role, marketing_consent, consented_at, source)
  on table public.waitlist_signups
  to anon, authenticated;

create policy "Public can join the waitlist"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (
    marketing_consent is true
    and role in ('both', 'creator', 'supporter')
    and source = 'prelaunch-web'
  );
