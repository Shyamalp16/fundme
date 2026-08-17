import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import type { Database } from "../../../src/lib/database.types.ts";

type WaitlistRole = "both" | "creator" | "supporter";

type JoinWaitlistBody = {
  email?: unknown;
  marketingConsent?: unknown;
  role?: unknown;
  source?: unknown;
  website?: unknown;
};

type SignupRecord = {
  confirmation_sent_at: string | null;
  id: string;
  role: WaitlistRole;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = new Set<WaitlistRole>(["both", "creator", "supporter"]);

const roleCopy: Record<WaitlistRole, string> = {
  both: "You’ll be among the first to hear how to make an ask and how to support one.",
  creator: "You’ll be among the first to hear when you can make your own ask.",
  supporter: "You’ll be among the first to hear when you can give a $1 yes.",
};

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

function confirmationHtml(role: WaitlistRole, siteUrl: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>You’re on the fudnME waitlist</title>
  </head>
  <body style="margin:0;background:#f3f0e8;color:#171714;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You’re early. We’ll let you know when fudnME is ready.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f3f0e8;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:620px;border:1px solid #171714;border-radius:18px;background:#fffdf7;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #cbc6b9;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size:25px;font-weight:800;letter-spacing:-1.4px;">fu<span style="color:#ff5c45;">dn</span>ME</td>
                    <td align="right" style="color:#5d5b54;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Waitlist · 01 / 01</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:46px 28px 24px;">
                <div style="margin-bottom:18px;color:#c73525;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">You’re on the list</div>
                <h1 style="max-width:500px;margin:0;font-size:46px;line-height:0.98;letter-spacing:-2.6px;">A dollar is tiny.<br>A crowd isn’t.</h1>
                <p style="max-width:500px;margin:24px 0 0;color:#5d5b54;font-size:17px;line-height:1.55;">Thanks for getting here before the crowd. ${roleCopy[role]}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #171714;border-radius:14px;background:#bde3d3;">
                  <tr>
                    <td style="padding:22px 24px;color:#ff5c45;font-size:64px;font-weight:800;line-height:1;letter-spacing:-5px;">$1</td>
                    <td style="padding:22px 24px;text-align:right;">
                      <div style="font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;">The whole idea</div>
                      <div style="margin-top:7px;font-size:17px;font-weight:700;">one person × enough strangers</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 42px;">
                <a href="${siteUrl}" style="display:inline-block;padding:14px 22px;border-radius:999px;color:#fffdf7;background:#171714;font-size:14px;font-weight:800;text-decoration:none;">See the idea again&nbsp;&nbsp;→</a>
                <p style="margin:22px 0 0;color:#5d5b54;font-size:13px;line-height:1.55;">Nothing is live yet and no payment account has been created. We’ll only send launch updates. Changed your mind? Reply with “unsubscribe” and we’ll take you off the list.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;border-top:1px solid #cbc6b9;color:#5d5b54;font-size:11px;line-height:1.5;">fudnME · A social $1 experiment · Pre-launch</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function confirmationText(role: WaitlistRole, siteUrl: string) {
  return `YOU’RE ON THE FUDNME WAITLIST

A dollar is tiny. A crowd isn’t.

Thanks for getting here before the crowd. ${roleCopy[role]}

The whole idea: one person × enough strangers = something worth doing.

See the idea again: ${siteUrl}

Nothing is live yet and no payment account has been created. We’ll only send launch updates. Changed your mind? Reply with “unsubscribe” and we’ll take you off the list.

fudnME · A social $1 experiment · Pre-launch`;
}

export default {
  fetch: withSupabase<Database>({ auth: ["publishable", "secret"] }, async (req, ctx) => {
    if (req.method !== "POST") {
      return json({ message: "Method not allowed.", ok: false }, 405);
    }

    let body: JoinWaitlistBody;
    try {
      body = await req.json();
    } catch {
      return json({ message: "Send a valid JSON body.", ok: false }, 400);
    }

    // Treat honeypot submissions as successful without storing or emailing them.
    if (typeof body.website === "string" && body.website.trim()) {
      return json({ alreadyJoined: false, emailSent: true, ok: true });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = typeof body.role === "string" && roles.has(body.role as WaitlistRole)
      ? body.role as WaitlistRole
      : null;

    if (!EMAIL_PATTERN.test(email) || email.length > 320) {
      return json({ message: "Enter a valid email address.", ok: false }, 400);
    }
    if (!role) {
      return json({ message: "Choose how you want to join.", ok: false }, 400);
    }
    if (body.marketingConsent !== true) {
      return json({ message: "Please agree to receive launch updates.", ok: false }, 400);
    }

    const { data: inserted, error: insertError } = await ctx.supabaseAdmin
      .from("waitlist_signups")
      .insert({
        consented_at: new Date().toISOString(),
        email,
        marketing_consent: true,
        role,
        source: body.source === "prelaunch-web" ? body.source : "prelaunch-web",
      })
      .select("id, role, confirmation_sent_at")
      .single<SignupRecord>();

    let signup = inserted;
    let alreadyJoined = false;

    if (insertError?.code === "23505") {
      alreadyJoined = true;
      const { data: existing, error: lookupError } = await ctx.supabaseAdmin
        .from("waitlist_signups")
        .select("id, role, confirmation_sent_at")
        .eq("email", email)
        .single<SignupRecord>();

      if (lookupError || !existing) {
        console.error("Waitlist duplicate lookup failed", { code: lookupError?.code });
        return json({ message: "We could not finish your signup. Please try again.", ok: false }, 500);
      }
      signup = existing;
    } else if (insertError || !signup) {
      console.error("Waitlist insert failed", { code: insertError?.code });
      return json({ message: "We could not save your signup. Please try again.", ok: false }, 500);
    }

    if (signup.confirmation_sent_at) {
      return json({ alreadyJoined, emailSent: true, ok: true });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY")?.trim();
    const from = Deno.env.get("WAITLIST_FROM_EMAIL")?.trim();
    const replyTo = Deno.env.get("WAITLIST_REPLY_TO")?.trim() || "hello@fudnme.now";
    const siteUrl = Deno.env.get("WAITLIST_SITE_URL")?.trim() || "https://fudnme.now";

    if (!resendApiKey || !from) {
      console.error("Waitlist email secrets are not configured");
      return json({
        message: "You’re on the list, but email confirmation is not configured yet.",
        ok: false,
      }, 503);
    }

    let emailResponse: Response;
    try {
      emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `waitlist-confirmation/${signup.id}`,
        },
        body: JSON.stringify({
          from,
          headers: {
            "List-Unsubscribe": `<mailto:${replyTo}?subject=Unsubscribe>`,
          },
          html: confirmationHtml(signup.role, siteUrl),
          reply_to: replyTo,
          subject: "You’re on the fudnME waitlist",
          text: confirmationText(signup.role, siteUrl),
          to: [email],
        }),
      });
    } catch (error) {
      console.error("Waitlist email request failed", {
        name: error instanceof Error ? error.name : "UnknownError",
      });
      return json({
        message: "You’re on the list, but the confirmation email could not be sent. Please try once more.",
        ok: false,
      }, 502);
    }

    const emailResult = await emailResponse.json().catch(() => ({})) as {
      id?: unknown;
      name?: unknown;
    };

    if (!emailResponse.ok || typeof emailResult.id !== "string") {
      console.error("Waitlist email provider rejected request", {
        providerError: typeof emailResult.name === "string" ? emailResult.name : "unknown",
        status: emailResponse.status,
      });
      return json({
        message: "You’re on the list, but the confirmation email could not be sent. Please try once more.",
        ok: false,
      }, 502);
    }

    const { error: updateError } = await ctx.supabaseAdmin
      .from("waitlist_signups")
      .update({
        confirmation_email_id: emailResult.id,
        confirmation_sent_at: new Date().toISOString(),
      })
      .eq("id", signup.id);

    if (updateError) {
      // Resend's idempotency key prevents a normal retry from duplicating the email.
      console.error("Waitlist email status update failed", { code: updateError.code });
    }

    return json({ alreadyJoined, emailSent: true, ok: true });
  }),
};
