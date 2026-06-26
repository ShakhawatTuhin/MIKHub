<script>
  import { Link } from 'svelte-routing';
</script>

<footer class="footer">
  <div class="footer__inner container">

    <div class="footer__brand">
      <Link to="/">
        <img src="/logo.png" alt="MIK-HUB" class="footer__logo" />
      </Link>
      <p class="footer__tagline">Where students build, learn and launch their careers.</p>
    </div>

    <div class="footer__links">
      <div class="footer__col">
        <h4 class="footer__heading">Explore</h4>
        <ul>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Connect</h4>
        <ul>
          <li>
            <a href="mailto:hello@mikhub.com" class="footer__email">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              hello@mikhub.com
            </a>
          </li>
          <li>
            <Link to="/admin" class="footer__admin">Admin login</Link>
          </li>
        </ul>
      </div>
    </div>

  </div>

  <div class="footer__bottom container">
    <p>© {new Date().getFullYear()} MIK-HUB. All rights reserved.</p>
  </div>
</footer>

<style>
  /* ── Shell ───────────────────────────────── */
  .footer {
    background-color: var(--color-footer);
    color:            var(--color-text-inverse);
    margin-top:       auto;
  }

  /* ── Main row ────────────────────────────── */
  .footer__inner {
    display:         flex;
    justify-content: space-between;
    align-items:     flex-start;
    gap:             var(--space-12);
    padding-top:     var(--space-12);
    padding-bottom:  var(--space-8);
  }

  /* ── Brand column ────────────────────────── */
  .footer__brand {
    display:        flex;
    flex-direction: column;
    gap:            var(--space-4);
    max-width:      280px;
  }

  .footer__logo {
    height:    36px;
    width:     auto;
    display:   block;
  }

  .footer__tagline {
    font-size:  var(--text-sm);
    color:      var(--color-text-muted);
    line-height: var(--leading-normal);
  }

  /* ── Link columns ────────────────────────── */
  .footer__links {
    display: flex;
    gap:     var(--space-16);
  }

  .footer__col {
    display:        flex;
    flex-direction: column;
    gap:            var(--space-4);
  }

  .footer__heading {
    font-size:      var(--text-xs);
    font-weight:    var(--font-bold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color:          var(--color-text-muted);
  }

  .footer__col ul {
    display:        flex;
    flex-direction: column;
    gap:            var(--space-3);
  }

  .footer__col :global(a) {
    font-size:  var(--text-sm);
    color:      #cbd5e1;
    transition: color var(--transition-fast);
  }

  .footer__col :global(a:hover) {
    color: var(--color-white);
  }

  /* ── Email link ──────────────────────────── */
  .footer__email {
    display:     flex;
    align-items: center;
    gap:         var(--space-2);
  }

  /* ── Admin link ──────────────────────────── */
  .footer__admin {
    color: var(--color-text-muted) !important;
    font-size: var(--text-sm);
  }

  .footer__admin:hover {
    color: var(--color-white) !important;
  }

  /* ── Bottom bar ──────────────────────────── */
  .footer__bottom {
    padding-top:    var(--space-4);
    padding-bottom: var(--space-6);
    border-top:     1px solid var(--color-border-dark);
  }

  .footer__bottom p {
    font-size: var(--text-xs);
    color:     var(--color-text-muted);
  }

  /* ── Tablet ──────────────────────────────── */
  @media (max-width: 768px) {
    .footer__inner {
      flex-direction: column;
      gap:            var(--space-8);
    }

    .footer__brand {
      max-width: 100%;
    }

    .footer__links {
      gap: var(--space-10);
    }
  }

  /* ── Mobile ──────────────────────────────── */
  @media (max-width: 576px) {
    .footer__links {
      flex-direction: column;
      gap:            var(--space-8);
    }
  }
</style>