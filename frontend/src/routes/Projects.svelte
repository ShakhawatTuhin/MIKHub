<script>
  let activeFilter = 'All';
  let filters = ['All'];

  let projects = [
  {
    title: 'Campus Events Platform',
    description: 'Build a full-stack platform to manage and discover campus events.',
    tags: ['React', 'FastAPI', 'MongoDB'],
    duration_weeks: 8,
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
  },
  {
    title: 'AI Study Buddy',
    description: 'Create an AI assistant that helps students summarize notes and quiz themselves.',
    tags: ['Python', 'LLM', 'NLP'],
    duration_weeks: 10,
    image_url: null
  },
  {
    title: 'Sustainability Dashboard',
    description: 'Visualize the campus carbon footprint with live data dashboards.',
    tags: ['Data Viz', 'React'],
    duration_weeks: 6,
    image_url: null
  }
];
let loading = false;
let error = false;
  $: filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p =>
        (Array.isArray(p.tags) && p.tags.includes(activeFilter)) ||
        p.category === activeFilter
      );

  function getInitials(title = '') {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }
</script>

<!-- ── Hero ─────────────────────────────────────── -->
<section class="prj-hero">
  <div class="container prj-hero__inner">
    <span class="label">Get hands-on</span>
    <h1 class="prj-hero__title">Internship projects</h1>
    <p class="prj-hero__sub">
      Real projects, real mentorship. Pick a track and ship something you're proud of.
    </p>
  </div>
</section>

<!-- ── Filter bar ────────────────────────────────── -->
{#if !loading && !error && filters.length > 1}
  <div class="prj-filters container">
    {#each filters as f}
      <button
        class="prj-filter"
        class:active={activeFilter === f}
        on:click={() => activeFilter = f}
      >
        {f}
      </button>
    {/each}
  </div>
{/if}

<!-- ── Grid ──────────────────────────────────────── -->
<section class="prj-grid-section section container">
  {#if loading}
    <div class="prj-state">
      <div class="prj-spinner"></div>
      <p>Loading projects…</p>
    </div>

  {:else if error}
    <div class="prj-state">
      <p class="prj-state__icon">⚠</p>
      <p>Couldn't load projects. Try refreshing.</p>
    </div>

  {:else if filtered.length === 0}
    <div class="prj-state">
      <p class="prj-state__icon">🔍</p>
      <p>No projects match that filter.</p>
    </div>

  {:else}
    <div class="prj-grid">
      {#each filtered as prj}
        <article class="prj-card">
          <!-- Top accent bar using gradient from design system -->
          <div class="prj-card__accent"></div>

          <!-- Image or initials fallback -->
          {#if prj.image_url}
            <div class="prj-card__media">
              <img src={prj.image_url} alt={prj.title} loading="lazy" />
            </div>
          {:else}
            <div class="prj-card__media prj-card__media--fallback">
              <span>{getInitials(prj.title)}</span>
            </div>
          {/if}

          <div class="prj-card__body">
            <!-- Header row -->
            <div class="prj-card__meta">
              {#if prj.category}
                <span class="prj-card__category">{prj.category}</span>
              {/if}
              {#if prj.status}
                <span class="prj-card__status prj-card__status--{prj.status.toLowerCase().replace(' ', '-')}">
                  {prj.status}
                </span>
              {/if}
            </div>

            <h3 class="prj-card__title">{prj.title}</h3>
            <p class="prj-card__desc">{prj.description}</p>

            <!-- Tags -->
            {#if prj.tags?.length}
              <div class="prj-card__tags">
                {#each prj.tags as tag}
                  <span class="prj-tag">{tag}</span>
                {/each}
              </div>
            {/if}

            <!-- Duration -->
            {#if prj.duration_weeks}
              <p class="prj-card__duration">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {prj.duration_weeks} weeks
              </p>
            {/if}
          </div>

          <div class="prj-card__footer">
            <a href="#apply" class="btn btn-outline prj-card__cta">Apply for this →</a>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<!-- ── CTA ───────────────────────────────────────── -->
<section class="prj-cta section">
  <div class="container prj-cta__inner">
    <div class="prj-cta__text">
      <h2>Have a project idea?</h2>
      <p>Pitch it to the club — the best ideas become next semester's projects.</p>
    </div>
    <a href="#apply" class="btn btn-primary">Propose a project</a>
  </div>
</section>

<style>
  /* ── Hero ───────────────────────────────── */
  .prj-hero {
    background: var(--color-primary);
    padding: var(--space-20) var(--space-8) var(--space-16);
  }

  .prj-hero__inner {
    max-width: 680px;
  }

  .prj-hero__title {
    font-size:   var(--text-5xl);
    font-weight: var(--font-extrabold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
    margin-top:  var(--space-3);
  }

  .prj-hero__sub {
    margin-top: var(--space-4);
    font-size:  var(--text-lg);
    color:      #94a3b8;
    max-width:  520px;
  }

  /* ── Filter bar ─────────────────────────── */
  .prj-filters {
    display:    flex;
    flex-wrap:  wrap;
    gap:        var(--space-2);
    padding-top:    var(--space-8);
    padding-bottom: var(--space-2);
  }

  .prj-filter {
    padding:       var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size:     var(--text-sm);
    font-weight:   var(--font-medium);
    border:        1px solid #1e3a5f;
    background:    transparent;
    color:         #94a3b8;
    cursor:        pointer;
    transition:    all var(--transition-fast);
  }

  .prj-filter:hover,
  .prj-filter.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-white);
  }

  /* ── Grid section ───────────────────────── */
  .prj-grid-section {
    padding-top:    var(--space-8);
    padding-bottom: var(--space-16);
  }

  .prj-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  /* ── Card ───────────────────────────────── */
  .prj-card {
    background:    #0d1b2e;
    border:        1px solid #1e3a5f;
    border-radius: var(--radius-lg);
    overflow:      hidden;
    display:       flex;
    flex-direction: column;
    transition:    transform var(--transition-normal),
                   box-shadow var(--transition-normal);
  }

  .prj-card:hover {
    transform:  translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 188, 212, 0.12);
  }

  /* Gradient top accent */
  .prj-card__accent {
    height:     3px;
    background: var(--gradient-card-top);
  }

  /* Media */
  .prj-card__media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .prj-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--transition-slow);
  }

  .prj-card:hover .prj-card__media img {
    transform: scale(1.04);
  }

  .prj-card__media--fallback {
    display:         flex;
    align-items:     center;
    justify-content: center;
    background: linear-gradient(135deg, #0d2a47, #1e3a5f);
  }

  .prj-card__media--fallback span {
    font-size:   var(--text-4xl);
    font-weight: var(--font-extrabold);
    color:       rgba(0, 188, 212, 0.3);
    letter-spacing: 0.05em;
  }

  /* Body */
  .prj-card__body {
    padding: var(--space-5);
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .prj-card__meta {
    display:     flex;
    align-items: center;
    gap:         var(--space-2);
    flex-wrap:   wrap;
  }

  .prj-card__category {
    font-size:     var(--text-xs);
    font-weight:   var(--font-bold);
    color:         #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .prj-card__status {
    font-size:     var(--text-xs);
    font-weight:   var(--font-bold);
    padding:       2px var(--space-3);
    border-radius: var(--radius-full);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .prj-card__status--active {
    background: rgba(0,188,212,0.15);
    color:      var(--color-accent);
    border:     1px solid rgba(0,188,212,0.25);
  }

  .prj-card__status--upcoming {
    background: rgba(16,185,129,0.12);
    color:      #10b981;
    border:     1px solid rgba(16,185,129,0.2);
  }

  .prj-card__status--completed {
    background: rgba(255,255,255,0.06);
    color:      #64748b;
    border:     1px solid rgba(255,255,255,0.1);
  }

  .prj-card__title {
    font-size:   var(--text-lg);
    font-weight: var(--font-bold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
  }

  .prj-card__desc {
    font-size:  var(--text-sm);
    color:      #94a3b8;
    line-height: var(--leading-normal);
    flex: 1;
  }

  /* Tags */
  .prj-card__tags {
    display:  flex;
    flex-wrap: wrap;
    gap:      var(--space-2);
  }

  .prj-tag {
    font-size:        var(--text-xs);
    font-weight:      var(--font-medium);
    padding:          2px var(--space-3);
    border-radius:    var(--radius-full);
    background-color: rgba(0,188,212,0.1);
    color:            var(--color-accent);
    border:           1px solid rgba(0,188,212,0.2);
  }

  /* Duration */
  .prj-card__duration {
    display:     flex;
    align-items: center;
    gap:         var(--space-2);
    font-size:   var(--text-xs);
    color:       #64748b;
  }

  /* Footer */
  .prj-card__footer {
    padding: 0 var(--space-5) var(--space-5);
  }

  .prj-card__cta {
    width:           100%;
    justify-content: center;
    border-color:    #1e3a5f;
    color:           var(--color-accent);
    font-size:       var(--text-sm);
  }

  .prj-card__cta:hover {
    border-color:     var(--color-accent);
    background-color: rgba(0,188,212,0.08);
  }

  /* ── States ─────────────────────────────── */
  .prj-state {
    text-align: center;
    padding:    var(--space-20) var(--space-8);
    color:      #64748b;
  }

  .prj-state__icon {
    font-size:     var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .prj-spinner {
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
  .prj-cta {
    background: #0d1b2e;
    border-top: 1px solid #1e3a5f;
  }

  .prj-cta__inner {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    gap:             var(--space-8);
    flex-wrap:       wrap;
  }

  .prj-cta__text h2 {
    font-size:   var(--text-2xl);
    font-weight: var(--font-bold);
    color:       var(--color-white);
  }

  .prj-cta__text p {
    font-size:  var(--text-base);
    color:      #94a3b8;
    margin-top: var(--space-1);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 1024px) {
    .prj-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .prj-hero__title { font-size: var(--text-4xl); }
    .prj-grid        { grid-template-columns: 1fr; }
    .prj-cta__inner  { flex-direction: column; align-items: flex-start; }
  }

  @media (max-width: 576px) {
    .prj-hero { padding: var(--space-16) var(--space-4) var(--space-12); }
    .prj-hero__title { font-size: var(--text-3xl); }
  }
</style>