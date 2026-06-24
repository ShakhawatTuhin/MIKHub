<script>
  const openings = [
    {
      title: 'Community Outreach Coordinator',
      type: 'Volunteer',
      commitment: '5–8 hrs/week',
      department: 'Community',
      description: 'Help plan and execute outreach programs to welcome new international students and connect them with existing members.',
      requirements: ['Strong communication skills', 'Empathy and cultural sensitivity', 'Organizational ability']
    },
    {
      title: 'Social Media Manager',
      type: 'Part-Time',
      commitment: '10 hrs/week',
      department: 'Marketing',
      description: 'Create engaging content and manage MIK HUB\'s social media presence across Instagram, LinkedIn, and Facebook.',
      requirements: ['Content creation experience', 'Graphic design basics', 'Fluent English writing']
    },
    {
      title: 'Events & Logistics Assistant',
      type: 'Volunteer',
      commitment: '6–10 hrs/week',
      department: 'Events',
      description: 'Assist the events team in coordinating venues, vendors, and volunteers for community events and cultural festivals.',
      requirements: ['Detail-oriented mindset', 'Teamwork skills', 'Availability on weekends']
    },
    {
      title: 'Web & Tech Developer',
      type: 'Part-Time',
      commitment: '8–12 hrs/week',
      department: 'Technology',
      description: 'Maintain and improve the MIK HUB website and internal tools. Work with the tech team on exciting digital projects.',
      requirements: ['JavaScript / React / Svelte experience', 'GitHub proficiency', 'Self-motivated learner']
    },
    {
      title: 'Grant & Partnership Writer',
      type: 'Volunteer',
      commitment: '4–6 hrs/week',
      department: 'Strategy',
      description: 'Research funding opportunities and draft grant proposals and partnership letters to support MIK HUB programs.',
      requirements: ['Excellent writing skills', 'Research ability', 'Attention to deadlines']
    },
    {
      title: 'Peer Support Mentor',
      type: 'Volunteer',
      commitment: '3–5 hrs/week',
      department: 'Wellbeing',
      description: 'Offer guidance and support to newly arrived international students, helping them navigate campus life and settle in.',
      requirements: ['Patience and empathy', 'Lived experience as international student', 'Reliability']
    }
  ];

  const typeColors = {
    'Volunteer': '#10b981',
    'Part-Time': '#6366f1'
  };

  const deptIcons = {
    Community: '🌍',
    Marketing: '📣',
    Events: '🎉',
    Technology: '💻',
    Strategy: '📋',
    Wellbeing: '💚'
  };

  const perks = [
    { icon: '📜', title: 'Official Certificate', description: 'Receive a verified MIK HUB involvement certificate for your portfolio.' },
    { icon: '🤝', title: 'Mentorship Access', description: 'Get matched with an experienced mentor in your area of interest.' },
    { icon: '🌐', title: 'Global Network', description: 'Build connections across cultures that last beyond graduation.' },
    { icon: '🏆', title: 'Recognition Awards', description: 'Outstanding contributors are recognized at our annual ceremony.' }
  ];
</script>

<div class="careers">
  <section class="hero">
    <h1>Careers & Volunteering</h1>
    <p class="subtitle">Grow With Us — Make a Global Impact</p>
  </section>

  <section class="perks-section">
    <h2>What You Gain</h2>
    <div class="perks-grid">
      {#each perks as perk}
        <div class="perk-card">
          <div class="perk-icon">{perk.icon}</div>
          <h3>{perk.title}</h3>
          <p>{perk.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="openings-section">
    <h2>Current Openings</h2>
    <div class="openings-list">
      {#each openings as job}
        <div class="job-card">
          <div class="job-header">
            <div class="job-meta">
              <span class="dept-icon">{deptIcons[job.department]}</span>
              <span class="dept-label">{job.department}</span>
            </div>
            <div class="job-badges">
              <span class="type-badge" style="background-color: {typeColors[job.type]}">{job.type}</span>
              <span class="commitment-badge">⏱ {job.commitment}</span>
            </div>
          </div>
          <div class="job-body">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <div class="requirements">
              <strong>Requirements:</strong>
              <ul>
                {#each job.requirements as req}
                  <li>{req}</li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="job-footer">
            <a href="/join-us" class="apply-button">Apply Now →</a>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="cta-section">
    <h2>Don't See the Right Fit?</h2>
    <p>We're always looking for passionate people. Send us an open application and tell us how you'd like to contribute.</p>
    <a href="/join-us" class="cta-button">Get in Touch</a>
  </section>
</div>

<style>
  .careers {
    min-height: calc(100vh - 80px);
  }

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

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
    font-size: 2rem;
  }

  /* Perks */
  .perks-section {
    padding: 4rem 2rem;
  }

  .perks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
  }

  .perk-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease;
  }

  .perk-card:hover {
    transform: translateY(-5px);
  }

  .perk-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .perk-card h3 {
    color: #6366f1;
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
  }

  .perk-card p {
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  /* Openings */
  .openings-section {
    padding: 4rem 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    margin: 0 2rem 2rem;
  }

  .openings-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
  }

  .job-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .job-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.12);
  }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-bottom: 1px solid #e5e7eb;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .job-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dept-icon {
    font-size: 1.1rem;
  }

  .dept-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
  }

  .job-badges {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .type-badge {
    font-size: 0.7rem;
    font-weight: 700;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    letter-spacing: 0.03em;
  }

  .commitment-badge {
    font-size: 0.75rem;
    color: #6b7280;
    background: #e5e7eb;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }

  .job-body {
    padding: 1.5rem;
    flex: 1;
  }

  .job-body h3 {
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  .job-body p {
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .requirements strong {
    font-size: 0.85rem;
    color: #374151;
  }

  .requirements ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
  }

  .requirements li {
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }

  .job-footer {
    padding: 1rem 1.5rem 1.5rem;
  }

  .apply-button {
    display: inline-block;
    padding: 0.65rem 1.5rem;
    background-color: #6366f1;
    color: white;
    border-radius: 2rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .apply-button:hover {
    background-color: #4f46e5;
    transform: translateY(-1px);
  }

  /* CTA */
  .cta-section {
    text-align: center;
    padding: 4rem 2rem;
    margin: 0 2rem 2rem;
    background: #f8f9fa;
    border-radius: 1rem;
  }

  .cta-section p {
    color: #6b7280;
    font-size: 1.05rem;
    max-width: 560px;
    margin: 0 auto 2rem;
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

  @media (max-width: 992px) {
    .hero { padding: 3rem 1rem; }
    h1 { font-size: 2.5rem; }
    .subtitle { font-size: 1.3rem; }
    .openings-list { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .hero { padding: 2.5rem 1rem; border-radius: 0 0 1.5rem 1.5rem; }
    h1 { font-size: 2rem; }
    .subtitle { font-size: 1.2rem; }
    .perks-section { padding: 3rem 1.5rem; }
    .openings-section { margin: 0 1rem 1.5rem; padding: 3rem 1.5rem; }
    .openings-list { grid-template-columns: 1fr; }
    .cta-section { margin: 0 1rem 1.5rem; padding: 3rem 1.5rem; }
  }

  @media (max-width: 576px) {
    .hero { padding: 2rem 1rem; border-radius: 0 0 1rem 1rem; }
    h1 { font-size: 1.75rem; }
    .subtitle { font-size: 1.1rem; }
    .perks-section { padding: 2rem 1rem; }
    .perks-grid { grid-template-columns: 1fr; }
    .openings-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
    .cta-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
  }
</style>
