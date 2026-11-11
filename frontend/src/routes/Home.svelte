<script>
  import { onMount } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  import HeroCarousel from '../components/HeroCarousel.svelte';
  import IntroBar from '../components/IntroBar.svelte';
  import { api, settings, img } from '../lib/api.js';

  let slides = [];

  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  onMount(async () => {
    try {
      // Admin-uploaded carousel images take priority.
      const uploaded = await api('/carousel');
      if (uploaded.length) {
        slides = uploaded.map((u) => ({
          image: img(u.image_url), eyebrow: 'MIK-HUB', title: u.title, description: u.description
        }));
        return;
      }
      // Otherwise fall back to featured / upcoming events.
      let list = await api('/activities?featured=1');
      if (!list.length) list = (await api('/activities?status=upcoming')).slice(0, 5);
      slides = list.map((a) => ({
        image: img(a.image_url), date: fmt(a.date), title: a.title, description: a.description
      }));
    } catch {}
  });
</script>

<div class="homepage">
  <HeroCarousel {slides} fallbackImage={img($settings.hero_image)}>
    <Navbar />
  </HeroCarousel>

  <IntroBar />
</div>