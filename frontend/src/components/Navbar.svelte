<script>
  import {onMount} from 'svelte';
  import { Link } from 'svelte-routing';
  import logo from '/logo.jpeg';

  let menuOpen = false;
  let scrolled = false;

  const toggleMenu = () => (menuOpen = !menuOpen);
  const closeMenu = () => (menuOpen = false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class="navbar" class:scrolled={scrolled}>
  <div class="navbar__top-bar"></div>

<div class="navbar__inner container">
  <div class="navbar__logo">
    <Link to="/" class="navbar__logo" on:click={closeMenu}>
      <img src={logo} alt="MIK-HUB" />
    </Link>
  </div>

    <nav class="navbar__links" class:open={menuOpen}>
      <Link to="/activities" on:click={closeMenu}>Activities</Link>
      <Link to="/projects"   on:click={closeMenu}>Projects</Link>
      <Link to="/about"      on:click={closeMenu}>About</Link>
      <Link to="/faq"        on:click={closeMenu}>FAQ</Link>
      <Link to="/apply" class="btn btn-primary navbar__cta" on:click={closeMenu}>
        Apply Now
      </Link>
    </nav>

    <button
      class="navbar__burger"
      class:open={menuOpen}
      on:click={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<style>
  /* ── Shell ───────────────────────────────── */
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 100;

  background: transparent;

  box-shadow: none;

  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease,
    box-shadow 0.3s ease;
  }

  .navbar.scrolled {
  background: rgba(255,255,255,0.9);

  backdrop-filter: blur(12px);

  box-shadow:
    0 2px 10px rgba(0,0,0,0.08);
  }

  /* ── Purple top strip ────────────────────── */
  .navbar__top-bar {
    height:     3px;
    background: var(--color-nav-border);
  }

  /* ── Inner row ───────────────────────────── */
  .navbar__inner {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    height:          var(--navbar-height);
  }

  /* ── Logo ────────────────────────────────── */
  .navbar__logo :global(img){
    height:     40px;
    width:      auto;
    display:    block;
  }

  /* ── Nav links ───────────────────────────── */
  .navbar__links {
    display:     flex;
    align-items: center;
    gap:         var(--space-8);
  }

  .navbar__links :global(a) {
    font-size:   var(--text-sm);
    font-weight: var(--font-medium);
    color:       white;
    transition:  color 0.3s ease;
  }

  .navbar.scrolled .navbar__links :global(a) {
  color: #111827;
  }

  /* ── CTA button ──────────────────────────── */
  .navbar__links :global(.navbar__cta) {
    background-color: var(--color-accent);
    color:            var(--color-white);
    padding:          var(--space-2) var(--space-5);
    border-radius:    var(--radius-full);
    font-weight:      var(--font-bold);
    font-size:        var(--text-sm);
    letter-spacing:   0.04em;
    text-transform:   uppercase;
    transition:       background-color var(--transition-fast),
                      transform var(--transition-fast);
  }

  .navbar__links :global(.navbar__cta:hover) {
    background-color: var(--color-accent-dark);
    color:            var(--color-white);
    transform:        translateY(-1px);
  }

  /* ── Burger button ───────────────────────── */
  .navbar__burger {
    display:        none;
    flex-direction: column;
    justify-content: center;
    gap:            5px;
    width:          32px;
    height:         32px;
    padding:        0;
    background:     none;
    border:         none;
    cursor:         pointer;
  }

  .navbar__burger span {
    display:          block;
    width:            100%;
    height:           2px;
    background-color: var(--color-text-primary);
    border-radius:    2px;
    transition:       transform var(--transition-normal),
                      opacity   var(--transition-normal);
  }

  /* Burger → X animation */
  .navbar__burger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .navbar__burger.open span:nth-child(2) {
    opacity: 0;
  }
  .navbar__burger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Mobile ──────────────────────────────── */
  @media (max-width: 768px) {
    .navbar__burger {
      display: flex;
    }

    .navbar__links {
      position:         absolute;
      top:              calc(var(--navbar-height) + 3px); /* +3px for top-bar */
      left:             0;
      right:            0;
      flex-direction:   column;
      align-items:      flex-start;
      gap:              0;
      background:       var(--color-nav-bg);
      box-shadow:       var(--shadow-md);
      padding:          var(--space-4) var(--space-6);
      transform:        translateY(-8px);
      opacity:          0;
      visibility:       hidden;
      transition:       transform var(--transition-normal),
                        opacity   var(--transition-normal),
                        visibility var(--transition-normal);
    }

    .navbar__links.open {
      transform:  translateY(0);
      opacity:    1;
      visibility: visible;
    }

    .navbar__links :global(a) {
      width:      100%;
      padding:    var(--space-3) 0;
      border-bottom: 1px solid var(--color-border);
      font-size:  var(--text-base);
    }

    .navbar__links :global(.navbar__cta) {
      margin-top:    var(--space-3);
      border-bottom: none;
      width:         auto;
      align-self:    flex-start;
    }
  }
</style>