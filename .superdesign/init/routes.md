# Routes

This is a Vite React single-page application without a routing library.

| URL | Entry | Layout |
| --- | --- | --- |
| `/` | `src/main.tsx` → `src/App.tsx` | Complete marketing page in `App` |
| `/#idea` | In-page anchor | Premise section |
| `/#how` | In-page anchor | How-it-works section |
| `/#rules` | In-page anchor | Rules section |
| `/#waitlist` | In-page anchor | Waitlist section |

## Entry source

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

