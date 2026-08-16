# Page Dependency Trees

## / (Pre-launch landing page)
Entry: `src/main.tsx`

Dependencies:
- `src/App.tsx`
  - `src/components/Brand.tsx`
  - `src/components/Icons.tsx`
  - `src/components/WaitlistForm.tsx`
    - `src/hooks/usePersistentState.ts`
    - `src/components/Icons.tsx`
- `src/styles.css`

The real render branch is the complete return value in `src/App.tsx`. There is no alternate route or feature flag. Responsive branches are controlled entirely through CSS media queries, except the accessible mobile navigation toggle and waitlist control states.

