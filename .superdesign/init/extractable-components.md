# Extractable Components

No shared layout component is currently separated from `src/App.tsx`, so layout extraction should be skipped for this single-page sync.

## Brand
- Source: `src/components/Brand.tsx`
- Category: basic
- Description: Exact mixed-case fun(d)ME wordmark.
- Extractable props: `compact` (boolean, default false)
- Hardcoded: wordmark text, coral hinge span, accessibility label

## WaitlistForm
- Source: `src/components/WaitlistForm.tsx`
- Category: basic
- Description: Waitlist conversion form with custom role listbox and consent.
- Extractable props: none useful for design; `onNotice` is behavioral only
- Hardcoded: labels, three role choices, button copy, checkbox copy, local confirmation

## Icons
- Source: `src/components/Icons.tsx`
- Category: basic
- Description: Inline brand-consistent stroke icons.
- Extractable props: `size`
- Hardcoded: SVG paths

