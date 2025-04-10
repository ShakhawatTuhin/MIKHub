<script>
  import { onMount } from 'svelte';

  let features = [
    {
      title: 'International Community',
      description: 'Connect with students from around the world'
    },
    {
      title: 'Exciting Projects',
      description: 'Participate in innovative international projects'
    },
    {
      title: 'Career Growth',
      description: 'Access exclusive career opportunities and guidance'
    }
  ];
</script>

<div class="home">
  <section class="hero">
    <h1>Welcome to MIK HUB</h1>
    <p class="subtitle">Your Gateway to International Student Engagement</p>
    <a href="/join-us" class="cta-button">Join Our Community</a>
  </section>

  <section class="features">
    <h2>What We Offer</h2>
    <div class="feature-grid">
      {#each features as feature}
        <div class="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="upcoming">
    <h2>Upcoming Events</h2>
    <div class="event-preview">
      <h3>Welcome Session 2024</h3>
      <p>Join us for an exciting welcome session where you can meet fellow international students and learn about upcoming opportunities.</p>
      <a href="/events" class="link-button">View All Events</a>
    </div>
  </section>
</div>

<style>
  .home {
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
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: white;
    color: #6366f1;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: bold;
    transition: transform 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
  }

  .features {
    padding: 4rem 2rem;
    background-color: white;
    margin: 2rem 0;
    border-radius: 1rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 1rem;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-card h3 {
    color: #6366f1;
    margin-bottom: 1rem;
  }

  .upcoming {
    padding: 4rem 2rem;
    background-color: white;
    border-radius: 1rem;
  }

  .event-preview {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .link-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    color: #6366f1;
    text-decoration: none;
    border: 2px solid #6366f1;
    border-radius: 1rem;
    transition: all 0.3s ease;
  }

  .link-button:hover {
    background-color: #6366f1;
    color: white;
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
      margin-bottom: 1.5rem;
    }

    .feature-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .features, .upcoming {
      padding: 3rem 1.5rem;
      margin: 1.5rem 0;
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
      margin-bottom: 1.25rem;
    }
    
    .cta-button {
      padding: 0.75rem 1.5rem;
    }
    
    .features, .upcoming {
      padding: 2rem 1rem;
      margin: 1rem 0;
    }
    
    .feature-card {
      padding: 1.5rem;
    }
  }
</style>