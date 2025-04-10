<script>
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  let status = {
    submitting: false,
    success: false,
    error: null
  };

  async function handleSubmit() {
    status.submitting = true;
    status.error = null;

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      status.success = true;
      formData = { name: '', email: '', message: '' };
    } catch (error) {
      status.error = 'Failed to submit form. Please try again.';
    } finally {
      status.submitting = false;
    }
  }
</script>

<div class="join-us">
  <section class="hero">
    <h1>Join MIK HUB</h1>
    <p class="subtitle">Be Part of Our International Community</p>
  </section>

  <section class="form-section">
    <div class="form-container">
      <h2>Get in Touch</h2>
      {#if status.success}
        <div class="success-message">
          <h3>Thank you for your interest!</h3>
          <p>We've received your message and will get back to you soon.</p>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              placeholder="Enter your name"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              placeholder="Tell us about your interests and how you'd like to get involved"
              rows="5"
            ></textarea>
          </div>

          {#if status.error}
            <div class="error-message">{status.error}</div>
          {/if}

          <button type="submit" disabled={status.submitting}>
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      {/if}
    </div>

    <div class="info-section">
      <h2>Why Join Us?</h2>
      <div class="benefits">
        <div class="benefit-item">
          <h3>Global Network</h3>
          <p>Connect with students from around the world and build lasting relationships.</p>
        </div>
        <div class="benefit-item">
          <h3>Professional Growth</h3>
          <p>Access exclusive opportunities for internships and career development.</p>
        </div>
        <div class="benefit-item">
          <h3>Cultural Exchange</h3>
          <p>Share your culture and learn from others in our diverse community.</p>
        </div>
      </div>
    </div>
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

  .form-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .form-container {
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4b5563;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }

  button {
    width: 100%;
    padding: 1rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #4f46e5;
  }

  button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .error-message {
    color: #ef4444;
    margin-bottom: 1rem;
    text-align: center;
  }

  .success-message {
    text-align: center;
    padding: 2rem;
  }

  .success-message h3 {
    color: #10b981;
    margin-bottom: 1rem;
  }

  .info-section {
    padding: 2rem;
  }

  .benefits {
    display: grid;
    gap: 2rem;
  }

  .benefit-item {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .benefit-item h3 {
    color: #6366f1;
    margin-bottom: 0.5rem;
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
    
    .form-section {
      gap: 3rem;
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

    .form-section {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 3rem 1.5rem;
    }
    
    .benefits-grid {
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
    
    .form-section {
      padding: 2rem 1rem;
    }
    
    .form-container {
      padding: 1.5rem;
    }
    
    .benefit-item {
      padding: 1rem;
    }
    
    .submit-button {
      padding: 0.75rem 1.5rem;
    }
  }
</style>