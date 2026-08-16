import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { joinWaitlist, type WaitlistRole } from "../lib/waitlist";
import { ArrowIcon, CheckIcon } from "./Icons";

type WaitlistFormProps = {
  onNotice: (message: string) => void;
};

const roleOptions: Array<{ value: WaitlistRole; label: string }> = [
  { value: "both", label: "Creator + supporter" },
  { value: "creator", label: "Creator" },
  { value: "supporter", label: "Supporter" },
];

export function WaitlistForm({ onNotice }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole>("both");
  const [roleOpen, setRoleOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const rolePickerRef = useRef<HTMLDivElement>(null);
  const roleTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeRolePicker(event: PointerEvent) {
      if (!rolePickerRef.current?.contains(event.target as Node)) setRoleOpen(false);
    }

    window.addEventListener("pointerdown", closeRolePicker);
    return () => window.removeEventListener("pointerdown", closeRolePicker);
  }, []);

  function handleRoleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setRoleOpen(true);
    }
    if (event.key === "Escape") {
      setRoleOpen(false);
    }
  }

  function chooseRole(nextRole: WaitlistRole) {
    setRole(nextRole);
    setRoleOpen(false);
    roleTriggerRef.current?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please agree to receive launch updates.");
      return;
    }

    if (website) {
      setComplete(true);
      return;
    }

    setSubmitting(true);
    try {
      await joinWaitlist({ email, role });
      setComplete(true);
      onNotice("You’re on the waitlist.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not save your signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (complete) {
    return (
      <div className="waitlist-success" role="status">
        <span className="waitlist-success__icon"><CheckIcon size={22} /></span>
        <div>
          <strong>You’re in.</strong>
          <p>You’re on the list. We’ll email when there is something worth showing you.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={submit} noValidate>
      <div className="waitlist-form__row">
        <label className="sr-only" htmlFor="waitlist-email">Email address</label>
        <input
          className="waitlist-email"
          id="waitlist-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          aria-describedby={error ? "waitlist-error" : undefined}
        />
        <label className="waitlist-honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
        <div className="role-select" ref={rolePickerRef}>
          <span className="sr-only" id="waitlist-role-label">I want to join as</span>
          <button
            className={roleOpen ? "role-select__trigger is-open" : "role-select__trigger"}
            id="waitlist-role"
            ref={roleTriggerRef}
            type="button"
            disabled={submitting}
            aria-haspopup="listbox"
            aria-expanded={roleOpen}
            aria-labelledby="waitlist-role-label waitlist-role-value"
            onClick={() => setRoleOpen((open) => !open)}
            onKeyDown={handleRoleKeyDown}
          >
            <span id="waitlist-role-value">{roleOptions.find((option) => option.value === role)?.label}</span>
            <svg className="role-select__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.75 6.25 8 10.25l4.25-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {roleOpen ? (
            <div className="role-select__menu" role="listbox" aria-labelledby="waitlist-role-label">
              {roleOptions.map((option) => (
                <button
                  className={option.value === role ? "role-select__option is-selected" : "role-select__option"}
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === role}
                  onClick={() => chooseRole(option.value)}
                >
                  <span>{option.label}</span>
                  <span className="role-select__check" aria-hidden="true">{option.value === role ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button className="button button--dark" type="submit" disabled={submitting}>
          {submitting ? "Joining..." : "Keep me posted"} <ArrowIcon />
        </button>
      </div>
      <label className="consent-line">
        <input type="checkbox" checked={consent} disabled={submitting} onChange={(event) => setConsent(event.target.checked)} />
        <span>I agree to receive launch updates and can unsubscribe anytime.</span>
      </label>
      {error ? <p className="form-error" id="waitlist-error">{error}</p> : null}
    </form>
  );
}
