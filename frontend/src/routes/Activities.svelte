<script>

let activities = [
  {
    title: 'AI Build Weekend',
    description: 'Students teamed up to ship AI-powered mini apps in 48 hours.',
    date: '2026-06-14',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'
  },
  {
    title: 'Design Sprint Workshop',
    description: 'Hands-on product design sprint mentored by industry pros.',
    date: '2026-05-30',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },
  {
    title: 'TEST_Activity',
    description: 'TEST desc',
    date: '2026-07-01',
    image_url: null
  }
];
let loading = false;
let error = false;

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function getInitials(title = '') {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }
</script>

<!-- ── Hero ─────────────────────────────────────── -->
<section class="act-hero">
  <div class="container act-hero__inner">
    <span class="label">Ongoing at MIK-HUB</span>
    <h1 class="act-hero__title">What we're up to</h1>
    <p class="act-hero__sub">
      Workshops, build weekends and meetups happening across the club right now.
    </p>
  </div>
</section>

<!-- ── Grid ──────────────────────────────────────── -->
<section class="act-grid-section section container">
  {#if loading}
    <div class="act-state">
      <div class="act-spinner"></div>
      <p>Loading activities…</p>
    </div>

  {:else if error}
    <div class="act-state">
      <p class="act-state__icon">⚠</p>
      <p>Couldn't load activities. Try refreshing the page.</p>
    </div>

  {:else if activities.length === 0}
    <div class="act-state">
      <p class="act-state__icon">📅</p>
      <p>No activities yet — check back soon.</p>
    </div>

  {:else}
    <div class="act-grid">
      {#each activities as act}
        <article class="act-card">
          <!-- Image or fallback -->
          <div class="act-card__media">
            {#if act.image_url}
              <img src={act.image_url} alt={act.title} loading="lazy" />
            {:else}
              <div class="act-card__fallback">
                <span>{getInitials(act.title)}</span>
              </div>
            {/if}
            {#if act.status}
              <span class="act-card__badge act-card__badge--{act.status.toLowerCase()}">
                {act.status}
              </span>
            {/if}
          </div>

          <div class="act-card__body">
            {#if act.date}
              <p class="act-card__date">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8"  y1="2" x2="8"  y2="6"/>
                  <line x1="3"  y1="10" x2="21" y2="10"/>
                </svg>
                {formatDate(act.date)}
              </p>
            {/if}
            <h3 class="act-card__title">{act.title}</h3>
            <p class="act-card__desc">{act.description}</p>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<!-- ── Propose CTA ────────────────────────────────── -->
<section class="act-cta section">
  <div class="container act-cta__inner">
    <div class="act-cta__text">
      <h2>Have an idea for an activity?</h2>
      <p>Pitch it to the club — we'll help you run it.</p>
    </div>
    <a href="#apply" class="btn btn-primary">Propose an activity</a>
  </div>
</section>

<style>
  /* ── Hero ───────────────────────────────── */
  .act-hero {
    background: var(--color-primary);
    padding: var(--space-20) var(--space-8) var(--space-16);
  }

  .act-hero__inner {
    max-width: 680px;
  }

  .act-hero__title {
    font-size:   var(--text-5xl);
    font-weight: var(--font-extrabold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
    margin-top:  var(--space-3);
  }

  .act-hero__sub {
    margin-top: var(--space-4);
    font-size:  var(--text-lg);
    color:      #94a3b8;
    max-width:  520px;
  }

  /* ── Grid section ───────────────────────── */
  .act-grid-section {
    padding-top:    var(--space-16);
    padding-bottom: var(--space-16);
  }

  .act-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  /* ── Card ───────────────────────────────── */
  .act-card {
    background:    #0d1b2e;
    border:        1px solid #1e3a5f;
    border-radius: var(--radius-lg);
    overflow:      hidden;
    display:       flex;
    flex-direction: column;
    transition:    transform var(--transition-normal),
                   box-shadow var(--transition-normal);
  }

  .act-card:hover {
    transform:  translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 188, 212, 0.12);
  }

  /* Media area */
  .act-card__media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0a1628;
  }

  .act-card__media img {
    width:      100%;
    height:     100%;
    object-fit: cover;
    display:    block;
    transition: transform var(--transition-slow);
  }

  .act-card:hover .act-card__media img {
    transform: scale(1.04);
  }

  /* Fallback when no image */
  .act-card__fallback {
    width:           100%;
    height:          100%;
    display:         flex;
    align-items:     center;
    justify-content: center;
    background: linear-gradient(135deg, #0d2a47, #1e3a5f);
  }

  .act-card__fallback span {
    font-size:   var(--text-4xl);
    font-weight: var(--font-extrabold);
    color:       rgba(0, 188, 212, 0.35);
    letter-spacing: 0.05em;
  }

  /* Status badge */
  .act-card__badge {
    position:      absolute;
    top:           var(--space-3);
    right:         var(--space-3);
    font-size:     var(--text-xs);
    font-weight:   var(--font-bold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding:       2px var(--space-3);
    border-radius: var(--radius-full);
  }

  .act-card__badge--ongoing,
  .act-card__badge--active {
    background: rgba(0,188,212,0.18);
    color:      var(--color-accent);
    border:     1px solid rgba(0,188,212,0.3);
  }

  .act-card__badge--upcoming {
    background: rgba(16,185,129,0.15);
    color:      #10b981;
    border:     1px solid rgba(16,185,129,0.25);
  }

  .act-card__badge--completed {
    background: rgba(255,255,255,0.07);
    color:      #94a3b8;
    border:     1px solid rgba(255,255,255,0.12);
  }

  /* Body */
  .act-card__body {
    padding: var(--space-5) var(--space-5) var(--space-6);
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .act-card__date {
    display:     flex;
    align-items: center;
    gap:         var(--space-2);
    font-size:   var(--text-xs);
    color:       var(--color-accent);
    font-weight: var(--font-medium);
  }

  .act-card__title {
    font-size:   var(--text-lg);
    font-weight: var(--font-bold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
  }

  .act-card__desc {
    font-size:  var(--text-sm);
    color:      #94a3b8;
    line-height: var(--leading-normal);
    margin-top: var(--space-1);
  }

  /* ── States (loading / error / empty) ──── */
  .act-state {
    text-align: center;
    padding:    var(--space-20) var(--space-8);
    color:      #64748b;
  }

  .act-state__icon {
    font-size:     var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .act-spinner {
    width:  40px;
    height: 40px;
    border: 3px solid #1e3a5f;
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto var(--space-4);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── CTA strip ──────────────────────────── */
  .act-cta {
    background: #0d1b2e;
    border-top: 1px solid #1e3a5f;
  }

  .act-cta__inner {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    gap:             var(--space-8);
    flex-wrap:       wrap;
  }

  .act-cta__text h2 {
    font-size:   var(--text-2xl);
    font-weight: var(--font-bold);
    color:       var(--color-white);
  }

  .act-cta__text p {
    font-size:  var(--text-base);
    color:      #94a3b8;
    margin-top: var(--space-1);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 1024px) {
    .act-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .act-hero__title { font-size: var(--text-4xl); }
    .act-grid        { grid-template-columns: 1fr; }
    .act-cta__inner  { flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 576px) {
    .act-hero { padding: var(--space-16) var(--space-4) var(--space-12); }
    .act-hero__title { font-size: var(--text-3xl); }
  }
</style>