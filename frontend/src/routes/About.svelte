<script>
  const missionPoints = [
    {
      title: 'Our Mission',
      description: 'To create an inclusive environment that empowers international students to thrive academically and professionally.'
    },
    {
      title: 'Our Vision',
      description: 'To be the leading platform for international student engagement, fostering cross-cultural collaboration and innovation.'
    },
    {
      title: 'Our Values',
      description: 'Diversity, Innovation, Collaboration, Excellence, and Global Perspective'
    }
  ];

  const stats = [
    { number: '500+', label: 'International Students' },
    { number: '50+', label: 'Countries Represented' },
    { number: '100+', label: 'Successfully Completed Projects' },
    { number: '30+', label: 'Partner Organizations' }
  ];
</script>

<div class="about">
  <section class="hero">
    <h1>About MIK HUB</h1>
    <p class="subtitle">Empowering International Students for Success</p>
  </section>

  <section class="mission">
    <div class="mission-grid">
      {#each missionPoints as point}
        <div class="mission-card">
          <h2>{point.title}</h2>
          <p>{point.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="impact">
    <h2>Our Impact</h2>
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-card">
          <h3>{stat.number}</h3>
          <p>{stat.label}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="join-section">
    <h2>Be Part of Our Community</h2>
    <p>Join us in creating a vibrant international student community where ideas flourish and connections thrive.</p>
    <a href="/join-us" class="cta-button">Join MIK HUB</a>
  </section>
</div>

<style>
  .about {
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

  .mission {
    padding: 4rem 2rem;
    background-color: white;
    margin: 2rem 0;
    border-radius: 1rem;
  }

  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .mission-card {
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    transition: transform 0.3s ease;
  }

  .mission-card:hover {
    transform: translateY(-5px);
  }

  .mission-card h2 {
    color: #6366f1;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .impact {
    padding: 4rem 2rem;
    text-align: center;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .stat-card {
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .stat-card h3 {
    font-size: 2.5rem;
    color: #6366f1;
    margin-bottom: 0.5rem;
  }

  .join-section {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    margin: 2rem 0;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    margin-top: 2rem;
    background-color: #6366f1;
    color: white;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: bold;
    transition: transform 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    background-color: #4f46e5;
  }

  @media (max-width: 992px) {
    .hero {
      padding: 3rem 1rem;
    }
    
    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
    }
    
    .mission-grid,
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 2.5rem 1rem;
      border-radius: 0 0 1.5rem 1.5rem;
    }
    
    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .mission-grid,
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .mission, .impact, .team, .join-section {
      padding: 3rem 1.5rem;
    }
  }
  
  @media (max-width: 576px) {
    .hero {
      padding: 2rem 1rem;
      border-radius: 0 0 1rem 1rem;
    }
    
    h1 {
      font-size: 1.75rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
    
    .mission, .impact, .team, .join-section {
      padding: 2rem 1rem;
      margin: 1rem 0;
    }
    
    .mission-card, .stat-card {
      padding: 1.5rem;
    }
    
    .cta-button {
      padding: 0.75rem 1.5rem;
    }
  }
</style>