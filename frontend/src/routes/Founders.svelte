<script>
  const founders = [
    {
      name: 'Shakhawat Tuhin',
      role: 'Co-Founder & Student Lead',
      initials: 'ST',
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
      photo: null, // Set to image path when available, e.g. '/images/shakhawat.jpg'
      quote: "MIK HUB was born from a simple belief — that international students deserve a space where they truly belong. We're building that space together.",
      message: "When I first arrived as an international student, I felt the gap — the longing for community, guidance, and a sense of home away from home. That feeling became the blueprint for MIK HUB. Every event we run, every student we connect, every opportunity we create — it all comes back to that mission. I'm incredibly proud of what we've built and even more excited about where we're going.",
      socials: {
        email: 'shakhawat@mikhub.org',
        linkedin: '#'
      }
    },
    {
      name: 'Professor [Name]',
      role: 'Academic Advisor & Co-Founder',
      initials: 'PR',
      gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
      photo: null,
      quote: "Education transcends borders. MIK HUB is proof that when students from different corners of the world unite with purpose, extraordinary things happen.",
      message: "Supporting MIK HUB has been one of the most rewarding experiences of my academic career. These students carry with them not just textbooks, but entire cultures, languages, and ways of seeing the world. MIK HUB gives that richness a platform — and watching it grow has reaffirmed my faith in the transformative power of community-led initiatives.",
      socials: {
        email: 'professor@mikhub.org',
        linkedin: '#'
      }
    }
  ];

  const milestones = [
    { year: '2023', event: 'MIK HUB founded by a small group of passionate international students' },
    { year: '2023', event: 'First cultural exchange event held with 40+ attendees' },
    { year: '2024', event: 'Reached 120+ active members across 15+ countries' },
    { year: '2024', event: 'Launched the Global Career Fair and Mentorship Program' },
    { year: '2025', event: 'Expanded to 8+ partner organizations internationally' }
  ];
</script>

<div class="founders">
  <section class="hero">
    <h1>Our Founding Members</h1>
    <p class="subtitle">The Visionaries Who Built MIK HUB From the Ground Up</p>
  </section>

  <section class="founders-section">
    <p class="section-intro">
      MIK HUB was born from a shared dream — to create a home for international students everywhere.
      Meet the people who turned that dream into reality.
    </p>

    <div class="founders-grid">
      {#each founders as founder}
        <article class="founder-card">
          <!-- Avatar / Photo -->
          <div class="avatar-wrapper">
            {#if founder.photo}
              <img src={founder.photo} alt={founder.name} class="avatar-photo" />
            {:else}
              <div class="avatar-initials" style="background: {founder.gradient}">
                {founder.initials}
              </div>
            {/if}
            <div class="avatar-ring" style="background: {founder.gradient}"></div>
          </div>

          <!-- Identity -->
          <div class="founder-identity">
            <h2>{founder.name}</h2>
            <span class="role-badge">{founder.role}</span>
          </div>

          <!-- Quote -->
          <blockquote class="founder-quote">
            <span class="quote-mark">"</span>
            {founder.quote}
            <span class="quote-mark">"</span>
          </blockquote>

          <!-- Message -->
          <div class="founder-message">
            <p>{founder.message}</p>
          </div>

          <!-- Socials -->
          <div class="founder-socials">
            <a href="mailto:{founder.socials.email}" class="social-link" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {founder.socials.email}
            </a>
            <a href={founder.socials.linkedin} class="social-link linkedin" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn Profile
            </a>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <!-- Timeline -->
  <section class="timeline-section">
    <h2>Our Journey</h2>
    <div class="timeline">
      {#each milestones as milestone, i}
        <div class="timeline-item {i % 2 === 0 ? 'left' : 'right'}">
          <div class="timeline-content">
            <span class="timeline-year">{milestone.year}</span>
            <p>{milestone.event}</p>
          </div>
          <div class="timeline-dot"></div>
        </div>
      {/each}
    </div>
  </section>

  <section class="cta-section">
    <h2>Be Part of the Story</h2>
    <p>MIK HUB grows stronger with every new member who joins. Add your chapter to our journey.</p>
    <a href="/join-us" class="cta-button">Join MIK HUB Today</a>
  </section>
</div>

<style>
  .founders {
    min-height: calc(100vh - 80px);
  }

  /* Hero */
  .hero {
    text-align: center;
    padding: 4rem 1rem;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: white;
    border-radius: 0 0 2rem 2rem;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
  }

  /* Founders Section */
  .founders-section {
    padding: 4rem 2rem;
  }

  .section-intro {
    text-align: center;
    color: #6b7280;
    font-size: 1.1rem;
    max-width: 680px;
    margin: 0 auto 3rem;
    line-height: 1.7;
  }

  .founders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 2.5rem;
  }

  /* Founder Card */
  .founder-card {
    background: white;
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .founder-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .founder-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(99, 102, 241, 0.18);
  }

  /* Avatar */
  .avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .avatar-ring {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    opacity: 0.25;
    z-index: 0;
  }

  .avatar-initials {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
  }

  .avatar-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 1;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  /* Identity */
  .founder-identity {
    text-align: center;
  }

  .founder-identity h2 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .role-badge {
    display: inline-block;
    background: linear-gradient(135deg, #ede9fe, #e0e7ff);
    color: #6366f1;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }

  /* Quote */
  .founder-quote {
    margin: 0;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(135deg, #f5f3ff, #ede9fe);
    border-radius: 1rem;
    text-align: center;
    font-size: 1rem;
    font-style: italic;
    color: #4b5563;
    line-height: 1.7;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-left: 4px solid #6366f1;
  }

  .quote-mark {
    font-size: 1.4rem;
    color: #a5b4fc;
    font-style: normal;
    font-weight: 900;
    line-height: 0;
    vertical-align: -0.3em;
  }

  /* Message */
  .founder-message {
    width: 100%;
  }

  .founder-message p {
    color: #6b7280;
    line-height: 1.8;
    font-size: 0.95rem;
    text-align: left;
  }

  /* Socials */
  .founder-socials {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #6b7280;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    background: #f9fafb;
  }

  .social-link:hover {
    background: #ede9fe;
    color: #6366f1;
  }

  .social-link.linkedin:hover {
    background: #dbeafe;
    color: #2563eb;
  }

  .social-link svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* Timeline */
  .timeline-section {
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 1rem;
    margin: 0 2rem 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
    font-size: 2rem;
  }

  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #6366f1, #a855f7);
    border-radius: 2px;
  }

  .timeline-item {
    display: flex;
    justify-content: flex-end;
    padding-right: calc(50% + 2rem);
    padding-bottom: 2rem;
    position: relative;
  }

  .timeline-item.right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: calc(50% + 2rem);
  }

  .timeline-dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0.25rem;
    width: 16px;
    height: 16px;
    background: #6366f1;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #c7d2fe;
    z-index: 1;
  }

  .timeline-content {
    background: white;
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
    max-width: 280px;
  }

  .timeline-year {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #6366f1;
    background: #ede9fe;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    margin-bottom: 0.5rem;
  }

  .timeline-content p {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  /* CTA */
  .cta-section {
    text-align: center;
    padding: 4rem 2rem;
    margin: 0 2rem 2rem;
  }

  .cta-section p {
    color: #6b7280;
    font-size: 1.05rem;
    max-width: 560px;
    margin: 1rem auto 2rem;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2.5rem;
    background-color: #6366f1;
    color: white;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .cta-button:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }

  /* Responsive */
  @media (max-width: 992px) {
    .hero { padding: 3rem 1rem; }
    h1 { font-size: 2.5rem; }
    .subtitle { font-size: 1.3rem; }
    .founders-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
  }

  @media (max-width: 768px) {
    .hero { padding: 2.5rem 1rem; border-radius: 0 0 1.5rem 1.5rem; }
    h1 { font-size: 2rem; }
    .subtitle { font-size: 1.2rem; }
    .founders-section { padding: 3rem 1.5rem; }
    .timeline-section { margin: 0 1rem 1.5rem; }
    .cta-section { margin: 0 1rem 1.5rem; }

    /* Stack timeline on mobile */
    .timeline::before { left: 1rem; }
    .timeline-item,
    .timeline-item.right {
      justify-content: flex-start;
      padding-left: 3rem;
      padding-right: 0;
    }
    .timeline-dot { left: 1rem; }
    .timeline-content { max-width: 100%; }
  }

  @media (max-width: 576px) {
    .hero { padding: 2rem 1rem; border-radius: 0 0 1rem 1rem; }
    h1 { font-size: 1.75rem; }
    .subtitle { font-size: 1.1rem; }
    .founders-section { padding: 2rem 1rem; }
    .founder-card { padding: 2rem 1.25rem; }
    .timeline-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
    .cta-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
  }
</style>
