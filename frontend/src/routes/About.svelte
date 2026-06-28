<script>
  const values = ['Curiosity', 'Collaboration', 'Craftsmanship', 'Impact'];

  const pillars = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
      title: 'Mission',
      description: 'To empower students with real-world skills through hands-on projects and a collaborative community.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      title: 'Vision',
      description: 'To be the launchpad where every student turns curiosity into a thriving career.'
    }
  ];
</script>

<section class="about">
  <div class="about__inner container">

    <!-- Left column -->
    <div class="about__left">
      <span class="label">About MIK-HUB</span>
      <h2 class="about__heading">A community where ideas become careers.</h2>
      <p class="about__body">
        We bring together curious students, hands-on projects, and mentors who
        care — so that learning never stays theoretical.
      </p>

      <div class="about__pillars">
        {#each pillars as p}
          <div class="pillar">
            <div class="pillar__icon">
              {@html p.icon}
            </div>
            <div class="pillar__text">
              <h3 class="pillar__title">{p.title}</h3>
              <p class="pillar__desc">{p.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right column — values card -->
    <div class="about__right">
      <div class="values-card">
        <div class="values-card__header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>Our values</span>
        </div>
        <p class="values-card__sub">The principles behind everything we build.</p>

        <ul class="values-list">
          {#each values as v}
            <li class="values-list__item">
              <span class="values-list__check">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              {v}
            </li>
          {/each}
        </ul>
      </div>
    </div>

  </div>
</section>

<style>
  /* ── Section shell ──────────────────────── */
  .about {
    background: var(--color-primary);
    padding: var(--space-20) var(--space-8);
  }

  .about__inner {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: var(--space-16);
    align-items: center;
  }

  /* ── Left ───────────────────────────────── */
  .about__heading {
    font-size:   var(--text-4xl);
    font-weight: var(--font-extrabold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
    margin-top:  var(--space-3);
    max-width:   480px;
  }

  .about__body {
    font-size:  var(--text-base);
    color:      #94a3b8;
    margin-top: var(--space-4);
    max-width:  460px;
    line-height: var(--leading-normal);
  }

  /* ── Pillars (Mission / Vision) ─────────── */
  .about__pillars {
    display:        flex;
    flex-direction: column;
    gap:            var(--space-6);
    margin-top:     var(--space-10);
  }

  .pillar {
    display: flex;
    gap:     var(--space-4);
    align-items: flex-start;
  }

  .pillar__icon {
    flex-shrink: 0;
    width:       48px;
    height:      48px;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-accent), #0097a7);
    display:         flex;
    align-items:     center;
    justify-content: center;
    color: var(--color-white);
  }

  .pillar__title {
    font-size:   var(--text-base);
    font-weight: var(--font-bold);
    color:       var(--color-white);
    margin-bottom: var(--space-1);
  }

  .pillar__desc {
    font-size:  var(--text-sm);
    color:      #94a3b8;
    line-height: var(--leading-normal);
  }

  /* ── Values card ────────────────────────── */
  .values-card {
    background:    rgba(255, 255, 255, 0.05);
    border:        1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    padding:       var(--space-8);
    backdrop-filter: blur(8px);
  }

  .values-card__header {
    display:     flex;
    align-items: center;
    gap:         var(--space-2);
    font-size:   var(--text-lg);
    font-weight: var(--font-bold);
    color:       var(--color-white);
  }

  .values-card__header svg {
    color: var(--color-accent);
  }

  .values-card__sub {
    font-size:  var(--text-sm);
    color:      #94a3b8;
    margin-top: var(--space-2);
  }

  .values-list {
    display:        flex;
    flex-direction: column;
    gap:            0;
    margin-top:     var(--space-6);
  }

  .values-list__item {
    display:     flex;
    align-items: center;
    gap:         var(--space-3);
    font-size:   var(--text-base);
    font-weight: var(--font-medium);
    color:       var(--color-white);
    padding:     var(--space-4) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .values-list__item:last-child {
    border-bottom: none;
  }

  .values-list__check {
    width:           28px;
    height:          28px;
    border-radius:   50%;
    background:      rgba(0, 188, 212, 0.15);
    border:          1px solid rgba(0, 188, 212, 0.3);
    display:         flex;
    align-items:     center;
    justify-content: center;
    flex-shrink:     0;
    color:           var(--color-accent);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 1024px) {
    .about__inner {
      grid-template-columns: 1fr 360px;
      gap: var(--space-10);
    }
  }

  @media (max-width: 768px) {
    .about {
      padding: var(--space-16) var(--space-6);
    }

    .about__inner {
      grid-template-columns: 1fr;
    }

    .about__heading {
      font-size: var(--text-3xl);
      max-width: 100%;
    }

    .about__body {
      max-width: 100%;
    }
  }

  @media (max-width: 576px) {
    .about {
      padding: var(--space-12) var(--space-4);
    }

    .about__heading { font-size: var(--text-2xl); }
    .pillar__icon   { width: 40px; height: 40px; }
  }
</style>