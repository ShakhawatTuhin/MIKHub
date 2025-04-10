<script>
  const careerOpportunities = [
    {
      title: 'Student Ambassador Program',
      type: 'Part-time',
      description: 'Represent MIK HUB and help organize international student events.',
      requirements: ['Currently enrolled student', 'Strong communication skills', 'Leadership experience']
    },
    {
      title: 'Research Assistant',
      type: 'Project-based',
      description: 'Assist in international education research projects.',
      requirements: ['Research experience', 'Data analysis skills', 'Academic writing ability']
    },
    {
      title: 'Content Creator',
      type: 'Flexible',
      description: 'Create engaging content for our international student community.',
      requirements: ['Creative skills', 'Social media knowledge', 'Content writing experience']
    }
  ];

  const resources = [
    {
      title: 'Resume Workshop',
      date: '2024-02-15',
      description: 'Learn how to create an impressive international resume'
    },
    {
      title: 'Interview Skills Training',
      date: '2024-03-01',
      description: 'Master the art of job interviews in a global context'
    },
    {
      title: 'Career Networking Event',
      date: '2024-03-15',
      description: 'Connect with potential employers and industry professionals'
    }
  ];
</script>

<div class="careers">
  <section class="hero">
    <h1>Careers</h1>
    <p class="subtitle">Launch Your International Career Journey</p>
  </section>

  <section class="opportunities">
    <h2>Current Opportunities</h2>
    <div class="opportunities-grid">
      {#each careerOpportunities as opportunity}
        <div class="opportunity-card">
          <div class="card-header">
            <h3>{opportunity.title}</h3>
            <span class="type-badge">{opportunity.type}</span>
          </div>
          <p class="description">{opportunity.description}</p>
          <div class="requirements">
            <h4>Requirements:</h4>
            <ul>
              {#each opportunity.requirements as requirement}
                <li>{requirement}</li>
              {/each}
            </ul>
          </div>
          <button class="apply-button">Apply Now</button>
        </div>
      {/each}
    </div>
  </section>

  <section class="resources">
    <h2>Career Resources</h2>
    <div class="resources-grid">
      {#each resources as resource}
        <div class="resource-card">
          <h3>{resource.title}</h3>
          <p class="date">Date: {new Date(resource.date).toLocaleDateString()}</p>
          <p>{resource.description}</p>
          <button class="register-button">Register</button>
        </div>
      {/each}
    </div>
  </section>

  <section class="career-support">
    <h2>Career Support</h2>
    <div class="support-content">
      <p>Need guidance in your career journey? Our career advisors are here to help you succeed in the global job market.</p>
      <a href="/join-us" class="contact-button">Contact Career Advisor</a>
    </div>
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

  section {
    padding: 4rem 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
  }

  .opportunities-grid,
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .opportunity-card,
  .resource-card {
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .opportunity-card:hover,
  .resource-card:hover {
    transform: translateY(-5px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .type-badge {
    background-color: #f3f4f6;
    color: #6366f1;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
  }

  .description {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }

  .requirements {
    margin-bottom: 1.5rem;
  }

  .requirements h4 {
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .requirements ul {
    list-style-type: none;
    padding-left: 0;
  }

  .requirements li {
    color: #6b7280;
    margin-bottom: 0.25rem;
    padding-left: 1.5rem;
    position: relative;
  }

  .requirements li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6366f1;
  }

  .apply-button,
  .register-button,
  .contact-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .apply-button,
  .contact-button {
    background-color: #6366f1;
    color: white;
  }

  .register-button {
    background-color: #f3f4f6;
    color: #6366f1;
  }

  .apply-button:hover,
  .contact-button:hover {
    background-color: #4f46e5;
  }

  .register-button:hover {
    background-color: #e5e7eb;
  }

  .resource-card .date {
    color: #6366f1;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .career-support {
    text-align: center;
    background-color: #f9fafb;
    border-radius: 1rem;
    margin: 2rem 0;
  }

  .support-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .support-content p {
    margin-bottom: 2rem;
    color: #4b5563;
  }

  .contact-button {
    display: inline-block;
    text-decoration: none;
    padding: 1rem 2rem;
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
    
    .opportunities-grid,
    .resources-grid {
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

    .opportunities-grid,
    .resources-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .card-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .type-badge {
      margin-top: 0.5rem;
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
    
    .opportunity-card,
    .resource-card {
      padding: 1.5rem;
    }
    
    .apply-button,
    .register-button,
    .contact-button {
      padding: 0.75rem;
    }
  }
</style>