<script>
  import { onMount, onDestroy } from 'svelte';
  import CarouselControls from './CarouselControls.svelte';

  // slides: [{ image, eyebrow?, date?, title, description }]
  export let slides = [];
  export let fallbackImage = null;
  export let interval = 6000;

  let current = 0;
  let timer;
  let touchX = null;

  $: if (current >= slides.length) current = 0;

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => { if (!document.hidden) go(1, false); }, interval);
  }

  function go(step, manual = true) {
    if (slides.length < 2) return;
    current = (current + step + slides.length) % slides.length;
    if (manual) restart();
  }

  function select(i) {
    current = i;
    restart();
  }

  function onKey(e) {
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  }

  function onTouchEnd(e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  }

  onMount(restart);
  onDestroy(() => clearInterval(timer));

  $: slide = slides[current];
</script>

<svelte:window on:keydown={onKey} />

<section
  class="hero"
  on:touchstart={(e) => (touchX = e.touches[0].clientX)}
  on:touchend={onTouchEnd}
>
  <div class="bg-stack">
    {#each slides as s, i (i)}
      <div
        class="bg"
        class:visible={i === current}
        style={(s.image || fallbackImage) ? `background-image: url(${s.image || fallbackImage})` : ''}
      ></div>
    {/each}
    {#if !slides.length && fallbackImage}
      <div class="bg visible" style={`background-image: url(${fallbackImage})`}></div>
    {/if}
    <div class="shade"></div>
  </div>

  <slot />

  <div class="hero-content">
    {#if slide}
      <p class="eyebrow">{slide.eyebrow || 'ONGOING AT MIK-HUB'}</p>
      {#if slide.date}<div class="date-pill">{slide.date}</div>{/if}
      {#if slide.title}<h1>{slide.title}</h1>{/if}
      {#if slide.description}<p class="description">{slide.description}</p>{/if}
      {#if slides.length > 1}
        <CarouselControls
          {current}
          total={slides.length}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onSelect={select}
        />
      {/if}
    {:else}
      <p class="eyebrow">MIK-HUB</p>
      <h1>Build. Learn. Launch.</h1>
    {/if}
  </div>
</section>

<style>
  .bg-stack { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 1s ease; }
  .bg.visible { opacity: 1; }
  .shade { position: absolute; inset: 0; background: linear-gradient(rgba(2,22,41,.45), rgba(2,22,41,.85)); }
  .hero-content { position: relative; z-index: 1; }

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