# Shared UI Components

## Brand
- Path: `src/components/Brand.tsx`
- Purpose: Exact fun(d)ME wordmark with compact variant.
- Props: `compact?: boolean`

```tsx
type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={compact ? "brand brand--compact" : "brand"} aria-label="fund me">
      <span aria-hidden="true">
        fun<span className="brand__hinge">(d)</span>ME
      </span>
    </span>
  );
}
```

## Icons
- Path: `src/components/Icons.tsx`
- Purpose: Inline arrow, menu, close, share, and check icons.
- Props: `size?: number`

```tsx
type IconProps = {
  size?: number;
};

export function ArrowIcon({ size = 18 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ size = 18 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.7 10.7 6.6-4.2M8.7 13.3l6.6 4.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 22 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

## WaitlistForm
- Path: `src/components/WaitlistForm.tsx`
- Purpose: Email, custom role picker, consent, validation, and local success state.
- Props: `onNotice(message: string)`

```tsx
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { ArrowIcon, CheckIcon } from "./Icons";

type WaitlistEntry = {
  email: string;
  role: string;
  joinedAt: string;
};

type WaitlistFormProps = {
  onNotice: (message: string) => void;
};

const roleOptions = [
  { value: "both", label: "Creator + supporter" },
  { value: "creator", label: "Creator" },
  { value: "supporter", label: "Supporter" },
];

export function WaitlistForm({ onNotice }: WaitlistFormProps) {
  const [entries, setEntries] = usePersistentState<WaitlistEntry[]>("fundme-waitlist", []);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("both");
  const [roleOpen, setRoleOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
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

  function chooseRole(nextRole: string) {
    setRole(nextRole);
    setRoleOpen(false);
    roleTriggerRef.current?.focus();
  }

  function submit(event: FormEvent) {
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
    if (!entries.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) {
      setEntries([...entries, { email, role, joinedAt: new Date().toISOString() }]);
    }
    setComplete(true);
    onNotice("You’re on the preview waitlist.");
  }

  if (complete) {
    return (
      <div className="waitlist-success" role="status">
        <span className="waitlist-success__icon"><CheckIcon size={22} /></span>
        <div>
          <strong>You’re in.</strong>
          <p>We saved your place on this device. No payment account was created.</p>
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
          aria-describedby={error ? "waitlist-error" : undefined}
        />
        <div className="role-select" ref={rolePickerRef}>
          <span className="sr-only" id="waitlist-role-label">I want to join as</span>
          <button
            className={roleOpen ? "role-select__trigger is-open" : "role-select__trigger"}
            id="waitlist-role"
            ref={roleTriggerRef}
            type="button"
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
        <button className="button button--dark" type="submit">
          Keep me posted <ArrowIcon />
        </button>
      </div>
      <label className="consent-line">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>I agree to receive launch updates and can unsubscribe anytime.</span>
      </label>
      {error ? <p className="form-error" id="waitlist-error">{error}</p> : null}
    </form>
  );
}
```

## usePersistentState
- Path: `src/hooks/usePersistentState.ts`
- Purpose: Local persistence used by the waitlist.

```tsx
import { useEffect, useState } from "react";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

