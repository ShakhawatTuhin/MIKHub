<script>
  import { onMount } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  import HeroCarousel from '../components/HeroCarousel.svelte';
  import IntroBar from '../components/IntroBar.svelte';
  import { api, settings, img } from '../lib/api.js';

  let activities = [];

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  onMount(async () => {
    try {
      let list = await api('/activities?featured=1');
      if (!list.length) list = (await api('/activities?status=upcoming')).slice(0, 5);
      activities = list.map((a) => ({ ...a, date: fmt(a.date) }));
    } catch {}
  });
</script>

<div class="homepage">
  <HeroCarousel {activities} image={img($settings.hero_image)}>
    <Navbar />
  </HeroCarousel>

  <IntroBar />
</div>