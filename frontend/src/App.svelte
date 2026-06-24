<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Projects from './routes/Projects.svelte';
  import JoinUs from './routes/JoinUs.svelte';
  import Careers from './routes/Careers.svelte';
  import Events from './routes/Events.svelte';
  import Founders from './routes/Founders.svelte';

  export let url = '';
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<Router {url}>
  <nav class={isMenuOpen ? 'menu-open' : ''}>
    <div class="logo">
      <Link to="/">MIK HUB</Link>
      <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
        <span class="hamburger"></span>
      </button>
    </div>
    <div class="nav-links">
      <Link to="/" on:click={() => isMenuOpen = false}>Home</Link>
      <Link to="/about" on:click={() => isMenuOpen = false}>About</Link>
      <Link to="/projects" on:click={() => isMenuOpen = false}>Projects</Link>
      <Link to="/join-us" on:click={() => isMenuOpen = false}>Join Us</Link>
      <Link to="/careers" on:click={() => isMenuOpen = false}>Careers</Link>
      <Link to="/events" on:click={() => isMenuOpen = false}>Events</Link>
      <Link to="/founders" on:click={() => isMenuOpen = false}>Founders</Link>
    </div>
  </nav>

  <main>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/projects" component={Projects} />
    <Route path="/join-us" component={JoinUs} />
    <Route path="/careers" component={Careers} />
    <Route path="/events" component={Events} />
    <Route path="/founders" component={Founders} />
  </main>
</Router>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 10;
  }

  .logo :global(a) {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger {
    display: block;
    position: relative;
    width: 24px;
    height: 2px;
    background-color: #333;
    transition: all 0.3s ease-in-out;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #333;
    transition: all 0.3s ease-in-out;
  }

  .hamburger::before {
    transform: translateY(-8px);
  }

  .hamburger::after {
    transform: translateY(8px);
  }

  .menu-open .hamburger {
    background-color: transparent;
  }

  .menu-open .hamburger::before {
    transform: rotate(45deg);
  }

  .menu-open .hamburger::after {
    transform: rotate(-45deg);
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-links :global(a) {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-links :global(a:hover) {
    color: #6366f1;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background-color: white;
      padding: 1rem 2rem;
      gap: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      z-index: 5;
    }

    .menu-open .nav-links {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
</style>