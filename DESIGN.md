# fudnME — Pre-launch Website Design System

Status: working V1 direction  
Surface: responsive marketing and waitlist website  
Design sources: Designly art direction + Superdesign high-contrast editorial foundation  
Brand: `fudnME`
Domain: `fudnme.now`

## 1. Product and page scope

fudnME is a social micro-gifting experiment. An adult will be able to make a public ask with a target. Other people will be able to give exactly one dollar to that ask, once, with a maximum of ten supported asks per week.

This V1 is an advertisement for the future product, not the product itself. Its only interactive product action is joining the waitlist. It must not contain:

- An ask feed or fictional users
- Sample fundraising totals or social proof
- An ask-creation form
- Payment, pledge, or non-binding support actions
- Fake countdowns, activity, or urgency

No real money moves on this website. Payment-provider approval, identity verification, moderation, refund/payout policy, and the production backend are still pre-launch work.

## 2. Primary communication job

Within three seconds, a visitor should understand:

> Make one public ask. Let enough strangers give it one dollar each.

The single conversion goal is **Join the waitlist**. “See how it works” is a supporting in-page navigation action, not a competing conversion.

## 3. Audience

- Internet-native adults, initially 18–34
- People with a specific goal or delightfully unnecessary dream
- Curious people who enjoy low-stakes collective participation
- Visitors arriving from short-form video, social posts, or word of mouth
- Skeptical visitors who need immediate clarity that payments are not live

## 4. Brand position and voice

fudnME is:

- Clear before clever
- Playful without becoming a meme template
- Internet-native without forced slang
- Bold without generic startup spectacle
- Warm without charity sentimentality
- Honest about what is not live

Approved voice examples:

- “What if the internet gave you $1—one stranger at a time?”
- “A dollar is tiny. A crowd isn’t.”
- “One person. One dollar. Ten choices a week.”
- “Be early to something strange.”

Avoid “change the world,” charity framing, guaranteed-income language, excessive exclamation points, or any use of “win,” “invest,” “return,” or “tax-deductible.”

## 5. Visual concept: The Power of One

The visual system expresses a single small unit becoming meaningful through repetition. The main devices are:

- One oversized `$1` object
- The outlined background word `ONE`
- Sequential editorial numbers: 01, 02, 03, 04
- A linear sharing-loop diagram
- The equation “one person × enough strangers”
- Strong rules and repeated typographic units

Every decorative device must explain the concept. Repetition cannot be used merely as filler.

## 6. Brand signature

- Visible wordmark is exactly `fudnME`.
- `fu` and `ME` use warm ink; the transposed `dn` uses signal coral.
- The transposed `dn` is the identity hinge: “fund me,” slightly out of order.
- Preserve the exact casing. Never use `FUDNME`, `Fudnme`, or `fudnme` for the product name.
- Screen-reader label is “fund me.”
- `fudnme.now` is a quiet, lowercase secondary signature.

## 7. Color system

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F3F0E8` | Warm primary canvas |
| `--paper-strong` | `#FFFDF7` | Light contrast surface and fields |
| `--ink` | `#171714` | Text, rules, dark section |
| `--ink-soft` | `#5D5B54` | Secondary copy |
| `--line` | `#CBC6B9` | Dividers and quiet borders |
| `--signal` | `#FF5C45` | Primary CTA and `$1` focal point |
| `--signal-dark` | `#C73525` | Pressed/secondary emphasis |
| `--mint` | `#BDE3D3` | Optimistic supporting surface |
| `--danger` | `#B42318` | Form errors only |

Coral is a signal, not wallpaper. Off-white dominates. Mint supports the concept without competing with the CTA. No purple/blue SaaS gradients, glassmorphism, glow stacks, or decorative 3D coins.

## 8. Typography

Display: **Clash Display**, 600–700  
Functional text: **Satoshi**, 400–700  
Fallbacks: `Arial Black`, `Arial`

- Hero: `clamp(4.1rem, 8.3vw, 8.25rem)`, tight 0.88 line-height
- Section title: `clamp(3rem, 5.7vw, 5.8rem)`
- Body large: 1.12–1.35rem, 1.5 line-height
- Body: 1rem, 1.55–1.65 line-height
- Metadata: 0.76rem, uppercase, 0.11em tracking

The hero headline is the only dominant event in the first viewport. Body measure stays below 65 characters where possible.

## 9. Grid, spacing, and surfaces

- Maximum content width: 1440px
- Desktop: 12-column grid with purposeful 8/4 and 7/5 asymmetry
- Page gutter: `clamp(1rem, 4vw, 4.5rem)`
- Section space: `clamp(5rem, 10vw, 9rem)`
- Base spacing rhythm: 8, 12, 16, 24, 32, 48, 64, 96
- Borders: primarily 1px ink or neutral rules
- Main equation object: 18px radius and one hard mint offset shadow
- Pill shape is reserved for primary buttons and waitlist controls
- Use spacing and alignment before adding a container

Mobile uses one column and 16px gutters. Minimum interactive target is 44×44px. Nothing may create horizontal scroll at 320px.

## 10. Page architecture

### Navigation

- Wordmark + `fudnme.now`
- Links: The idea, How it works, The rules
- Single CTA: Join the waitlist
- Sticky, lightly translucent warm background
- Keyboard-accessible mobile menu with Escape support

### Hero

Headline:

> What if the internet gave you $1—one stranger at a time?

Supporting copy explains the public ask and one-dollar-per-person mechanic. Primary action is “Get early access”; secondary action scrolls to the explanation.

The supporting visual is an abstract product equation—not a fictional ask:

> one person × enough strangers = something worth doing

It is explicitly labeled “Not live yet.”

### Premise

Large statement: “A dollar is tiny. A crowd isn’t.” A compact editorial explanation introduces the ten-dollar weekly allocation and anti-whale rule. A horizontal `$1 FROM ME + $1 FROM YOU + $1 FROM THEM` band reinforces accumulation.

### How it works

Future-tense, numbered explanation:

1. Make one clear ask.
2. Put it in front of people.
3. Let the crowd decide.

No generic icon cards and no functional product controls.

### Sharing loop

A conceptual diagram communicates the viral mechanic:

> Make the ask → Share the link → Get a $1 yes → Reach someone new

The diagram is explanatory only and contains no fabricated activity.

### Rules and trust

State plainly:

- Exactly one dollar per person, once per ask
- Ten supported asks per person each week
- No goods, rewards, investments, loans, raffles, tax receipts, or prizes
- No payments are live; approval, verification, moderation, and payout rules come first

### Waitlist

- Email address
- Intended role: creator, supporter, or both
- Explicit marketing-consent checkbox
- Clear validation and accessible success state
- Signup is written to Supabase with duplicate-safe email handling
- Anonymous visitors may insert but cannot read, update, or delete waitlist rows
- Repeated signups are handled as success without granting public read access

### Footer

- Short product statement
- Anchor navigation
- Contact email
- “Pre-launch · No real money accepted” status

## 11. Interaction and motion

- Primary hover: `translateY(-2px)`, 180ms
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Anchor scrolling may be smooth
- Mobile menu toggles with keyboard-accessible semantics
- Waitlist errors use `aria-describedby`; success and toast use polite live regions
- No autoplay marquees, bounce, parallax, cursor trails, or continuous logo motion
- Under `prefers-reduced-motion: reduce`, remove transforms and smooth scrolling

## 12. Anti-slop vetoes

Reject the design if it introduces:

- Fake asks, users, totals, testimonials, or launch countdowns
- Equal-emphasis feature-card grids
- Purple-to-blue gradients or glass cards
- Floating spheres, coins, cubes, blobs, or ribbons
- Dashboard previews for a product that is not available
- Multiple competing conversion CTAs
- Tiny labels everywhere or excessive pills
- Arbitrary rotations, serif italics, grain, or stacked effects
- Copy implying fundraising or payments are currently active

## 13. Accessibility and responsive requirements

- Semantic header, nav, main, sections, and footer
- One H1 and logical heading order
- WCAG AA body contrast and visible keyboard focus
- Labels remain available to assistive technology
- Mobile navigation has an accessible name and expanded state
- Layout checks at 320px, 390px, 768px, 1024px, and 1440px
- Content remains usable at 200% zoom
- Reduced-motion preference is honored

## 14. Release gates

The V1 passes only when:

- The premise is understandable in one second from the hero.
- The only conversion path is the waitlist.
- No ask browsing, ask creation, contribution, or pledge UI remains.
- No invented demand or financial activity appears.
- The brand still feels distinctive with the wordmark removed.
- Hierarchy survives grayscale and thumbnail tests.
- Mobile has no overflow, clipping, or inaccessible control.
- Typecheck and production build pass with no console errors.
