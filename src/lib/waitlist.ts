import { hasSupabaseConfig, supabase } from "./supabase";

export type WaitlistRole = "both" | "creator" | "supporter";

type JoinWaitlistInput = {
  email: string;
  role: WaitlistRole;
};

export async function joinWaitlist({ email, role }: JoinWaitlistInput) {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("The waitlist is not connected yet. Please try again later.");
  }

  const { error } = await supabase.from("waitlist_signups").insert({
    consented_at: new Date().toISOString(),
    email: email.trim().toLowerCase(),
    marketing_consent: true,
    role,
    source: "prelaunch-web",
  });

  // Joining twice should feel identical to joining once. We intentionally avoid
  // upsert because PostgREST requires public SELECT permission for that path.
  if (error?.code === "23505") return;

  if (error) {
    console.error("Waitlist signup failed", { code: error.code });
    throw new Error("We could not save your signup. Please try again.");
  }
}
