<script>
  import { onMount } from 'svelte';

  let projects = {
    available: [],
    upcoming: []
  };

  onMount(async () => {
    try {
      const response = await fetch('/api/projects');
      projects = await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  });
</script>

<div class="projects">
  <section class="hero">
    <h1>Projects</h1>
    <p class="subtitle">Explore and Join Exciting International Projects</p>
  </section>

  <section class="available-projects">
    <h2>Available Projects</h2>
    {#if projects.available.length > 0}
      <div class="project-grid">
        {#each projects.available as project}
          <div class="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button class="apply-button">Apply Now</button>
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <p>No projects are currently available. Check back soon for new opportunities!</p>
      </div>
    {/if}
  </section>

  <section class="upcoming-projects">
    <h2>Upcoming Projects</h2>
    <div class="project-grid">
      {#each projects.upcoming as project}
        <div class="project-card upcoming">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p class="start-date">Starting: {new Date(project.start_date).toLocaleDateString()}</p>
          <button class="notify-button">Get Notified</button>
        </div>
      {/each}
    </div>
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

  section {
    padding: 4rem 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
  }

  .project-card h3 {
    color: #6366f1;
    margin-bottom: 1rem;
  }

  .project-card p {
    margin-bottom: 1.5rem;
    color: #4b5563;
  }

  .start-date {
    color: #6366f1;
    font-weight: 500;
  }

  .apply-button,
  .notify-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .apply-button {
    background-color: #6366f1;
    color: white;
  }

  .apply-button:hover {
    background-color: #4f46e5;
  }

  .notify-button {
    background-color: #f3f4f6;
    color: #6366f1;
  }

  .notify-button:hover {
    background-color: #e5e7eb;
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    background-color: #f9fafb;
    border-radius: 1rem;
    color: #6b7280;
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
    
    .project-grid {
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

    section {
      padding: 2rem 1rem;
    }

    .project-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
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
    
    .project-card {
      padding: 1.5rem;
    }
    
    .apply-button,
    .notify-button {
      padding: 0.6rem;
    }
  }
</style>