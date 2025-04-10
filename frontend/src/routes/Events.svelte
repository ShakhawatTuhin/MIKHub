<script>
  import { onMount } from 'svelte';

  let events = [];

  onMount(async () => {
    try {
      const response = await fetch('/api/events');
      events = await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  });

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="events">
  <section class="hero">
    <h1>Events</h1>
    <p class="subtitle">Join Our International Community Events</p>
  </section>

  <section class="events-section">
    <h2>Upcoming Events</h2>
    <div class="events-grid">
      {#each events as event}
        <div class="event-card">
          <div class="event-date">
            <span class="date">{formatDate(event.date)}</span>
          </div>
          <div class="event-content">
            <h3>{event.title}</h3>
            <p class="location">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              {event.location}
            </p>
            <p class="description">{event.description}</p>
            <div class="event-actions">
              <button class="register-button">Register Now</button>
              <button class="details-button">View Details</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="calendar-section">
    <h2>Event Calendar</h2>
    <div class="calendar-content">
      <p>Stay updated with our event schedule. Subscribe to our calendar to never miss an opportunity!</p>
      <button class="calendar-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
        </svg>
        Subscribe to Calendar
      </button>
    </div>
  </section>

  <section class="propose-section">
    <h2>Propose an Event</h2>
    <div class="propose-content">
      <p>Have an idea for an international student event? We'd love to hear from you!</p>
      <a href="/join-us" class="propose-button">Submit Event Proposal</a>
    </div>
  </section>
</div>

<style>
  .events {
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

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .event-card {
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .event-card:hover {
    transform: translateY(-5px);
  }

  .event-date {
    background-color: #6366f1;
    color: white;
    padding: 1rem;
    text-align: center;
  }

  .date {
    font-weight: 500;
  }

  .event-content {
    padding: 1.5rem;
  }

  .location {
    display: flex;
    align-items: center;
    color: #6b7280;
    margin: 0.5rem 0;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }

  .description {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }

  .event-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .register-button,
  .details-button,
  .calendar-button,
  .propose-button {
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
    text-decoration: none;
  }

  .register-button {
    background-color: #6366f1;
    color: white;
  }

  .details-button {
    background-color: #f3f4f6;
    color: #6366f1;
  }

  .register-button:hover {
    background-color: #4f46e5;
  }

  .details-button:hover {
    background-color: #e5e7eb;
  }

  .calendar-section,
  .propose-section {
    text-align: center;
    background-color: #f9fafb;
    border-radius: 1rem;
    margin: 2rem 0;
  }

  .calendar-content,
  .propose-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .calendar-button,
  .propose-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #6366f1;
    color: white;
    padding: 1rem 2rem;
    margin-top: 1.5rem;
  }

  .calendar-button:hover,
  .propose-button:hover {
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
    
    .events-grid {
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

    .events-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .event-actions {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .calendar-content,
    .propose-content {
      padding: 0 1rem;
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
    
    .event-card {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .event-content {
      padding: 1.25rem;
    }
    
    .register-button,
    .details-button,
    .calendar-button,
    .propose-button {
      padding: 0.6rem;
    }
    
    .calendar-button,
    .propose-button {
      padding: 0.75rem 1.5rem;
    }
  }
</style>