<script>
  let faqs = [
    {
      question: 'Who can join MIK-HUB?',
      answer: 'Any student enrolled at the University of Pécs (MIK faculty) can join — regardless of year or program. We welcome first-years through PhD students.',
      open: false
    },
    {
      question: 'Do internship projects offer credit or stipend?',
      answer: 'Projects are currently unpaid and not credit-bearing by default, but we work with faculty to explore recognition options each semester. The primary value is hands-on experience and a portfolio project.',
      open: false
    },
    {
      question: 'How do I apply?',
      answer: 'Scroll down to the Apply section on this page and fill out the application form. We review applications on a rolling basis and get back to you within a week.',
      open: false
    },
    {
      question: 'How much time commitment is expected?',
      answer: 'It depends on the project. Most internship tracks ask for 6–10 hours per week. Activities like workshops or build weekends are one-off commitments.',
      open: false
    },
    {
      question: 'Can I propose my own project or activity?',
      answer: 'Absolutely — we encourage it. Use the Apply form to tell us your idea. The best proposals get resources, mentorship, and a team assigned to them.',
      open: false
    }
  ];

  function toggle(i) {
    faqs = faqs.map((f, idx) =>
      idx === i ? { ...f, open: !f.open } : { ...f, open: false }
    );
  }
</script>

<section class="faq section">
  <div class="container faq__inner">
    <div class="faq__header">
      <span class="label">Good to know</span>
      <h2 class="faq__title">Frequently asked questions</h2>
    </div>

    <ul class="faq__list">
      {#each faqs as item, i}
        <li class="faq__item" class:open={item.open}>
          <button class="faq__question" on:click={() => toggle(i)} aria-expanded={item.open}>
            <span>{item.question}</span>
            <span class="faq__chevron">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>

          {#if item.open}
            <div class="faq__answer">
              <p>{item.answer}</p>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .faq {
    background: var(--color-bg);
  }

  .faq__inner {
    max-width: 720px;
  }

  .faq__header {
    text-align:    center;
    margin-bottom: var(--space-12);
  }

  .faq__title {
    font-size:   var(--text-4xl);
    font-weight: var(--font-extrabold);
    color:       var(--color-text-primary);
    margin-top:  var(--space-3);
    line-height: var(--leading-tight);
  }

  /* ── List ───────────────────────────────── */
  .faq__list {
    display:        flex;
    flex-direction: column;
    gap:            var(--space-3);
  }

  .faq__item {
    background:    var(--color-surface);
    border:        1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow:      hidden;
    transition:    box-shadow var(--transition-fast);
  }

  .faq__item.open {
    box-shadow: var(--shadow-md);
  }

  /* ── Question row ───────────────────────── */
  .faq__question {
    width:           100%;
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    gap:             var(--space-4);
    padding:         var(--space-5) var(--space-6);
    background:      none;
    border:          none;
    cursor:          pointer;
    text-align:      left;
    font-size:       var(--text-base);
    font-weight:     var(--font-semibold);
    color:           var(--color-text-primary);
    transition:      color var(--transition-fast);
  }

  .faq__question:hover {
    color: var(--color-accent);
  }

  .faq__item.open .faq__question {
    color: var(--color-text-primary);
  }

  /* Chevron rotates when open */
  .faq__chevron {
    flex-shrink: 0;
    color:       var(--color-text-muted);
    transition:  transform var(--transition-normal);
  }

  .faq__item.open .faq__chevron {
    transform: rotate(180deg);
    color: var(--color-accent);
  }

  /* ── Answer ─────────────────────────────── */
  .faq__answer {
    padding: 0 var(--space-6) var(--space-5);
    border-top: 1px solid var(--color-border);
  }

  .faq__answer p {
    font-size:   var(--text-sm);
    color:       var(--color-text-secondary);
    line-height: var(--leading-normal);
    padding-top: var(--space-4);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 768px) {
    .faq__title { font-size: var(--text-3xl); }
    .faq__question { padding: var(--space-4) var(--space-5); }
    .faq__answer   { padding: 0 var(--space-5) var(--space-4); }
  }

  @media (max-width: 576px) {
    .faq__title { font-size: var(--text-2xl); }
  }
</style>