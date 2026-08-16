# Shared Layout

## App
- Path: `src/App.tsx`
- Purpose: Complete single-page pre-launch layout including sticky header, hero, premise, how-it-works, sharing loop, rules, waitlist, and footer.

```tsx
import { useEffect, useState } from "react";
import { Brand } from "./components/Brand";
import { ArrowIcon, CloseIcon, MenuIcon } from "./components/Icons";
import { WaitlistForm } from "./components/WaitlistForm";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    function closeMenu(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="page-shell site-header__inner">
          <a className="brand-link" href="#top" aria-label="fun(d)ME home">
            <Brand />
            <span>fun.me</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#idea">The idea</a>
            <a href="#how">How it works</a>
            <a href="#rules">The rules</a>
          </nav>
          <a className="button button--primary site-header__cta" href="#waitlist">
            Join the waitlist <ArrowIcon />
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        {mobileOpen ? (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            <a href="#idea" onClick={() => setMobileOpen(false)}>The idea</a>
            <a href="#how" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="#rules" onClick={() => setMobileOpen(false)}>The rules</a>
            <a href="#waitlist" onClick={() => setMobileOpen(false)}>Join the waitlist <ArrowIcon /></a>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero section" aria-labelledby="hero-title">
          <div className="hero__echo" aria-hidden="true">ONE</div>
          <div className="page-shell hero__grid">
            <div className="hero__copy">
              <span className="section-kicker">A social $1 experiment · Coming soon</span>
              <h1 id="hero-title">What if the internet gave you <em>$1</em>, one stranger at a time?</h1>
              <p>
                Post what you want and set a goal. Anyone can chip in $1. Get enough
                people behind it and the small stuff starts to add up.
              </p>
              <div className="hero__actions">
                <a className="button button--primary button--large" href="#waitlist">Get early access <ArrowIcon /></a>
                <a className="button button--secondary button--large" href="#how">See how it works</a>
              </div>
              <div className="trust-line" aria-label="Core product rules">
                <span>One person</span><span>One dollar</span><span>Ten choices a week</span>
              </div>
            </div>

            <aside className="hero-object" aria-label="The fun(d)ME idea in one equation">
              <div className="hero-object__topline"><span>The whole idea</span><span>01 / 01</span></div>
              <div className="hero-object__dollar" aria-hidden="true">$1</div>
              <div className="hero-object__equation"><span>one person</span><b>×</b><span>enough strangers</span></div>
              <p>= something worth doing</p>
              <div className="hero-object__footer"><Brand compact /><span>Not live yet</span></div>
            </aside>
          </div>
        </section>

        <section className="idea section" id="idea" aria-labelledby="idea-title">
          <div className="page-shell idea__grid">
            <div>
              <span className="section-kicker">The premise</span>
              <h2 className="section-title" id="idea-title">A dollar is tiny.<br />A crowd isn’t.</h2>
            </div>
            <div className="idea__copy">
              <p className="idea__lead">You ask for something. People give it a dollar or keep scrolling.</p>
              <p>
                Set a goal, explain what it is for, and share the link. Each person can give
                $1 to an ask once, with up to ten picks a week. Big donors cannot take over.
              </p>
              <p className="idea__note">Some asks will be serious. Some will be ridiculous. Both are welcome.</p>
            </div>
          </div>
          <div className="statement-track" aria-hidden="true">
            <span>$1 FROM ME</span><i>+</i><span>$1 FROM YOU</span><i>+</i><span>$1 FROM THEM</span>
          </div>
        </section>

        <section className="how section" id="how" aria-labelledby="how-title">
          <div className="page-shell">
            <div className="section-heading-row">
              <div>
                <span className="section-kicker">When we launch</span>
                <h2 className="section-title section-title--light" id="how-title">Three moves.<br />That’s the product.</h2>
              </div>
              <p>Make the page. Share the link. See if people care enough to throw in a dollar.</p>
            </div>
            <ol className="steps">
              <li><span>01</span><div><h3>Make one clear ask.</h3><p>Say what you want and how much it costs. Keep it honest and easy to understand.</p></div></li>
              <li><span>02</span><div><h3>Put it in front of people.</h3><p>Send the link to your friends, your followers, or anywhere it might catch on.</p></div></li>
              <li><span>03</span><div><h3>Let the crowd decide.</h3><p>People can give $1 once. If enough people like the idea, those dollars add up.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="loop section" aria-labelledby="loop-title">
          <div className="page-shell">
            <span className="section-kicker">Built to travel</span>
            <div className="loop__heading">
              <h2 className="section-title" id="loop-title">The ask is<br />the invitation.</h2>
              <p>Someone sees your ask, gives $1, and sends it to somebody else. That is how it moves.</p>
            </div>
            <div className="loop-diagram" aria-label="The fun(d)ME sharing loop">
              <div><span>01</span><strong>Make the ask</strong></div><b aria-hidden="true">→</b>
              <div><span>02</span><strong>Share the link</strong></div><b aria-hidden="true">→</b>
              <div><span>03</span><strong>Get a $1 yes</strong></div><b aria-hidden="true">→</b>
              <div><span>04</span><strong>Reach someone new</strong></div>
            </div>
          </div>
        </section>

        <section className="rules section" id="rules" aria-labelledby="rules-title">
          <div className="page-shell rules__grid">
            <div className="rules__intro">
              <span className="section-kicker">The non-negotiables</span>
              <h2 className="section-title" id="rules-title">Simple enough<br />to trust.</h2>
              <p>The joke only works if nobody has to guess what they are signing up for.</p>
            </div>
            <div className="rules-list">
              <article><span>01</span><div><h3>Exactly one dollar.</h3><p>Each person can give $1 to an ask once. That is the limit.</p></div></article>
              <article><span>02</span><div><h3>Ten choices each week.</h3><p>You can support up to ten asks a week. Pick the ones you actually like.</p></div></article>
              <article><span>03</span><div><h3>No strings attached.</h3><p>No products, rewards, equity, interest, prizes, tax receipts, or chances to win.</p></div></article>
              <article><span>04</span><div><h3>Nothing is live yet.</h3><p>This is only a waitlist. Payments open after provider approval, identity checks, moderation, and payout rules are ready.</p></div></article>
            </div>
          </div>
        </section>

        <section className="waitlist section" id="waitlist" aria-labelledby="waitlist-title">
          <div className="page-shell waitlist__inner">
            <span className="waitlist__mark" aria-hidden="true">$1</span>
            <span className="section-kicker">Get there before the crowd</span>
            <h2 className="section-title" id="waitlist-title">Be early to<br />something strange.</h2>
            <p>Got something you would ask for? Want to give out a few dollars? Join the waitlist and we’ll let you know when it is ready.</p>
            <WaitlistForm onNotice={setToast} />
            <small>For now, this demo saves your signup on this device. It does not create a payment account.</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell site-footer__main">
          <div><Brand /><p>Ask for something. See if the internet gives it a dollar.</p></div>
          <div><strong>Read</strong><a href="#idea">The idea</a><a href="#how">How it works</a><a href="#rules">The rules</a></div>
          <div><strong>Contact</strong><a href="mailto:hello@fun.me">hello@fun.me</a><a href="#waitlist">Join the waitlist</a></div>
        </div>
        <div className="page-shell site-footer__bottom">
          <span>© {new Date().getFullYear()} fun(d)ME</span><span>Pre-launch · No real money accepted</span><span>fun.me</span>
        </div>
      </footer>

      {toast ? <div className="toast" role="status" aria-live="polite">{toast}</div> : null}
    </>
  );
}

export default App;
```

