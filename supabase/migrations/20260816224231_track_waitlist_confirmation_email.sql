alter table public.waitlist_signups
  add column confirmation_sent_at timestamptz,
  add column confirmation_email_id text;

comment on column public.waitlist_signups.confirmation_sent_at is
  'When the waitlist confirmation email was accepted by the email provider.';

comment on column public.waitlist_signups.confirmation_email_id is
  'Provider message ID for the waitlist confirmation email.';

revoke insert (email, role, marketing_consent, consented_at, source)
  on table public.waitlist_signups from anon, authenticated;

drop policy if exists "Public can join the waitlist"
  on public.waitlist_signups;
