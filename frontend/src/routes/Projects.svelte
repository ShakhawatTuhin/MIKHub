<script>
  const projects = [
    {
      title: 'Cross-Cultural Exchange Program',
      category: 'Community',
      status: 'Active',
      description: 'A semester-long initiative pairing international students with local mentors to share cultural experiences and build lasting connections.',
      tags: ['Mentorship', 'Culture', 'Networking']
    },
    {
      title: 'Global Innovation Hackathon',
      category: 'Technology',
      status: 'Upcoming',
      description: 'A 48-hour hackathon where international students collaborate on solutions to global challenges, judged by industry professionals.',
      tags: ['Innovation', 'Tech', 'Collaboration']
    },
    {
      title: 'International Cuisine Festival',
      category: 'Culture',
      status: 'Completed',
      description: 'An annual celebration showcasing dishes and culinary traditions from 15+ countries, bringing together the entire student community.',
      tags: ['Food', 'Culture', 'Community']
    },
    {
      title: 'Language Learning Circles',
      category: 'Education',
      status: 'Active',
      description: 'Weekly peer-led sessions where students teach and learn languages from one another, building multilingual skills across campus.',
      tags: ['Language', 'Education', 'Peer-Learning']
    },
    {
      title: 'Global Career Fair',
      category: 'Career',
      status: 'Upcoming',
      description: 'Connecting international students with multinational companies and NGOs actively seeking diverse global talent.',
      tags: ['Career', 'Networking', 'Professional']
    },
    {
      title: 'Sustainability Action Project',
      category: 'Environment',
      status: 'Active',
      description: 'A student-led environmental initiative combining global perspectives to develop campus sustainability strategies.',
      tags: ['Sustainability', 'Environment', 'Leadership']
    }
  ];

  const statusColors = {
    Active: '#10b981',
    Upcoming: '#6366f1',
    Completed: '#9ca3af'
  };

  const categoryIcons = {
    Community: '🌍',
    Technology: '💻',
    Culture: '🎭',
    Education: '📚',
    Career: '💼',
    Environment: '🌿'
  };
</script>

<div class="projects">
  <section class="hero">
    <h1>Our Projects</h1>
    <p class="subtitle">Initiatives Shaping the International Student Experience</p>
  </section>

  <section class="projects-section">
    <h2>Explore What We're Building</h2>
    <div class="projects-grid">
      {#each projects as project}
        <div class="project-card">
          <div class="card-header">
            <span class="category-icon">{categoryIcons[project.category]}</span>
            <span class="category-label">{project.category}</span>
            <span class="status-badge" style="background-color: {statusColors[project.status]}">
              {project.status}
            </span>
          </div>
          <div class="card-body">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div class="card-footer">
            <div class="tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
            <button class="learn-more">Learn More →</button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="propose-section">
    <h2>Have a Project Idea?</h2>
    <p>We welcome proposals from students who want to make a difference. Your idea could become our next big initiative.</p>
    <a href="/join-us" class="cta-button">Propose a Project</a>
  </section>
</div>

<style>
  .projects {
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

  .projects-section {
    padding: 4rem 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
    font-size: 2rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.15);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.25rem 1.5rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e5e7eb;
  }

  .category-icon {
    font-size: 1.25rem;
  }

  .category-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    flex: 1;
  }

  .status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    letter-spacing: 0.03em;
  }

  .card-body {
    padding: 1.5rem;
    flex: 1;
  }

  .card-body h3 {
    font-size: 1.125rem;
    color: #1f2937;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  .card-body p {
    color: #6b7280;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .card-footer {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    font-size: 0.75rem;
    background-color: #ede9fe;
    color: #6366f1;
    padding: 0.25rem 0.6rem;
    border-radius: 0.375rem;
    font-weight: 500;
  }

  .learn-more {
    background: none;
    border: none;
    color: #6366f1;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0;
    text-align: left;
    transition: color 0.2s ease;
  }

  .learn-more:hover {
    color: #4f46e5;
  }

  .propose-section {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    margin: 0 2rem 2rem;
  }

  .propose-section p {
    color: #6b7280;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #6366f1;
    color: white;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: bold;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    background-color: #4f46e5;
  }

  @media (max-width: 992px) {
    .hero { padding: 3rem 1rem; }
    h1 { font-size: 2.5rem; }
    .subtitle { font-size: 1.3rem; }
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .hero { padding: 2.5rem 1rem; border-radius: 0 0 1.5rem 1.5rem; }
    h1 { font-size: 2rem; }
    .subtitle { font-size: 1.2rem; }
    .projects-section { padding: 3rem 1.5rem; }
    .projects-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .propose-section { margin: 0 1rem 1.5rem; padding: 3rem 1.5rem; }
  }

  @media (max-width: 576px) {
    .hero { padding: 2rem 1rem; border-radius: 0 0 1rem 1rem; }
    h1 { font-size: 1.75rem; }
    .subtitle { font-size: 1.1rem; }
    .projects-section { padding: 2rem 1rem; }
    .propose-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
  }
</style>
