<script>
  import CarouselControls from './CarouselControls.svelte';

  export let activities = [];

  let current = 0;

  function next() {
    current = (current + 1) % activities.length;
  }

  function previous() {
    current =
      (current - 1 + activities.length) %
      activities.length;
  }
</script>

<section class="hero">

  <slot />

  <div class="hero-content">
    <p class="eyebrow">ONGOING AT MIK-HUB</p>

    <div class="date-pill">
      {activities[current].date}
    </div>

    <h1>{activities[current].title}</h1>

    <p class="description">
      {activities[current].description}
    </p>

    <CarouselControls
      {current}
      total={activities.length}
      onPrev={previous}
      onNext={next}
    />
  </div>

</section>

<style>
  .hero {
    min-height: 100vh;
    background: #021629;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: var(--navbar-height);
  }

  .hero-content {
    margin-top: auto;
    max-width: 700px;
    padding-left: 12rem;
    padding-bottom: 8rem;
  }

  .eyebrow {
    color: #17b8ff;
    font-size: .9rem;
    font-weight: 700;
    letter-spacing: .3em;
    text-transform: uppercase;
  }

  .date-pill {
    display: inline-flex;
    margin-top: 1rem;
    padding: .75rem 1.25rem;
    border-radius: 999px;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.15);
    color: white;
  }

  h1 {
    color: white;
    font-size: clamp(3rem,8vw,6rem);
    line-height: 1;
    font-weight: 800;
    margin: 1.5rem 0;
  }

  .description {
    color: rgba(255,255,255,.8);
    font-size: 1.25rem;
  }

  @media (max-width:768px) {
    .hero-content {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 4rem;
    }
  }
</style>