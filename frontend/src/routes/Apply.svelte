<script>
  let formData = {
    name: '',
    email: '',
    country: '',
    studentId: '',
    program: '',
    interests: [],
    motivation: ''
  };

  const interestOptions = [
    'Community Events',
    'International Projects',
    'Cultural Exchange',
    'Career Development',
    'Language Learning',
    'Environmental Initiatives',
    'Technology & Innovation',
    'Sports & Wellness'
  ];

  let submitted = false;
  let submitting = false;

  function toggleInterest(interest) {
    if (formData.interests.includes(interest)) {
      formData.interests = formData.interests.filter(i => i !== interest);
    } else {
      formData.interests = [...formData.interests, interest];
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    submitting = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    submitted = true;
    submitting = false;
  }

  const benefits = [
    { icon: '🌍', title: 'Global Network', description: 'Connect with students from 15+ countries and build lifelong international friendships.' },
    { icon: '🚀', title: 'Career Boost', description: 'Access exclusive job fairs, mentorship programs, and career development workshops.' },
    { icon: '🎭', title: 'Cultural Experiences', description: 'Participate in festivals, exchange programs, and cross-cultural learning events.' },
    { icon: '💡', title: 'Leadership Opportunities', description: 'Take on organizing roles and develop real-world project management skills.' }
  ];
</script>

<div class="join-us">
  <section class="hero">
    <h1>Join MIK HUB</h1>
    <p class="subtitle">Become Part of Our Global Student Community</p>
  </section>

  <section class="benefits-section">
    <h2>Why Join Us?</h2>
    <div class="benefits-grid">
      {#each benefits as benefit}
        <div class="benefit-card">
          <div class="benefit-icon">{benefit.icon}</div>
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="form-section">
    <h2>Membership Application</h2>

    {#if submitted}
      <div class="success-box">
        <div class="success-icon">✅</div>
        <h3>Application Received!</h3>
        <p>Thank you for applying, <strong>{formData.name}</strong>! We'll review your application and get back to you at <strong>{formData.email}</strong> within 3–5 business days.</p>
        <button class="cta-button" on:click={() => { submitted = false; formData = { name: '', email: '', country: '', studentId: '', program: '', interests: [], motivation: '' }; }}>
          Submit Another Application
        </button>
      </div>
    {:else}
      <form class="application-form" on:submit={handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input id="name" type="text" bind:value={formData.name} placeholder="Your full name" required />
          </div>
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input id="email" type="email" bind:value={formData.email} placeholder="student@university.edu" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="country">Country of Origin *</label>
            <input id="country" type="text" bind:value={formData.country} placeholder="e.g. Bangladesh" required />
          </div>
          <div class="form-group">
            <label for="studentId">Student ID</label>
            <input id="studentId" type="text" bind:value={formData.studentId} placeholder="Optional" />
          </div>
        </div>

        <div class="form-group">
          <label for="program">Degree Program *</label>
          <input id="program" type="text" bind:value={formData.program} placeholder="e.g. BSc Computer Science" required />
        </div>

        <div class="form-group">
          <label>Areas of Interest</label>
          <div class="interests-grid">
            {#each interestOptions as interest}
              <button
                type="button"
                class="interest-chip {formData.interests.includes(interest) ? 'selected' : ''}"
                on:click={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            {/each}
          </div>
        </div>

        <div class="form-group">
          <label for="motivation">Why Do You Want to Join? *</label>
          <textarea
            id="motivation"
            bind:value={formData.motivation}
            placeholder="Tell us what motivates you to join MIK HUB and what you hope to contribute..."
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-button" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Application →'}
        </button>
      </form>
    {/if}
  </section>
</div>

<style>
  .join-us {
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

  .benefits-section {
    padding: 4rem 2rem;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
  }

  .benefit-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease;
  }

  .benefit-card:hover {
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .benefit-card h3 {
    color: #6366f1;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .benefit-card p {
    color: #6b7280;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  /* Form Section */
  .form-section {
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 1rem;
    margin: 0 2rem 2rem;
  }

  .application-form {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }

  input,
  textarea {
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    background: white;
    transition: border-color 0.2s ease;
    outline: none;
    color: #1f2937;
  }

  input:focus,
  textarea:focus {
    border-color: #6366f1;
  }

  textarea {
    resize: vertical;
  }

  .interests-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.25rem;
  }

  .interest-chip {
    padding: 0.4rem 0.9rem;
    border: 2px solid #e5e7eb;
    border-radius: 999px;
    background: white;
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .interest-chip:hover {
    border-color: #a5b4fc;
    color: #6366f1;
  }

  .interest-chip.selected {
    background-color: #6366f1;
    border-color: #6366f1;
    color: white;
  }

  .submit-button {
    padding: 1rem 2rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    align-self: center;
    min-width: 220px;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Success State */
  .success-box {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
    background: white;
    border-radius: 1rem;
    padding: 3rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .success-box h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .success-box p {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 0.875rem 1.75rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .cta-button:hover {
    background-color: #4f46e5;
  }

  @media (max-width: 992px) {
    .hero { padding: 3rem 1rem; }
    h1 { font-size: 2.5rem; }
    .subtitle { font-size: 1.3rem; }
  }

  @media (max-width: 768px) {
    .hero { padding: 2.5rem 1rem; border-radius: 0 0 1.5rem 1.5rem; }
    h1 { font-size: 2rem; }
    .subtitle { font-size: 1.2rem; }
    .benefits-section { padding: 3rem 1.5rem; }
    .form-section { margin: 0 1rem 1.5rem; padding: 3rem 1.5rem; }
    .form-row { grid-template-columns: 1fr; gap: 1.25rem; }
  }

  @media (max-width: 576px) {
    .hero { padding: 2rem 1rem; border-radius: 0 0 1rem 1rem; }
    h1 { font-size: 1.75rem; }
    .subtitle { font-size: 1.1rem; }
    .benefits-section { padding: 2rem 1rem; }
    .benefits-grid { grid-template-columns: 1fr; }
    .form-section { margin: 0 0.5rem 1rem; padding: 2rem 1rem; }
  }
</style>
