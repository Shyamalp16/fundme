import { FunctionsHttpError } from "@supabase/supabase-js";

import { hasSupabaseConfig, supabase } from "./supabase";

export type WaitlistRole = "both" | "creator" | "supporter";

type JoinWaitlistInput = {
  email: string;
  role: WaitlistRole;
};

type JoinWaitlistResponse = {
  alreadyJoined: boolean;
  emailSent: boolean;
  ok: boolean;
};

async function getFunctionErrorMessage(error: unknown) {
  if (!(error instanceof FunctionsHttpError)) return null;

  try {
    const payload = (await error.context.json()) as { message?: unknown };
    return typeof payload.message === "string" ? payload.message : null;
  } catch {
    return null;
  }
}

export async function joinWaitlist({ email, role }: JoinWaitlistInput) {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("The waitlist is not connected yet. Please try again later.");
  }

  const { data, error } = await supabase.functions.invoke<JoinWaitlistResponse>("join-waitlist", {
    body: {
      email: email.trim().toLowerCase(),
      marketingConsent: true,
      role,
      source: "prelaunch-web",
    },
  });

  if (error) {
    const message = await getFunctionErrorMessage(error);
    console.error("Waitlist signup failed", { name: error.name });
    throw new Error(message ?? "We could not save your signup. Please try again.");
  }

  if (!data?.ok || !data.emailSent) {
    throw new Error("You’re on the list, but the confirmation email could not be sent. Please try once more.");
  }

  return data;
}
