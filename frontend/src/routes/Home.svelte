<script>
  import Navbar from '../components/Navbar.svelte';
  import HeroCarousel from '../components/HeroCarousel.svelte';
  import IntroBar from '../components/IntroBar.svelte';

  const activities = [
    {
      title: 'TEST_Activity',
      description: 'TEST desc',
      date: 'Jul 1, 2026'
    },
    {
      title: 'Hackathon 2026',
      description: 'Build projects with students across Europe.',
      date: 'Aug 12, 2026'
    },
    {
      title: 'Startup Challenge',
      description: 'Pitch ideas and compete for prizes.',
      date: 'Sep 4, 2026'
    }
  ];
</script>

<div class="homepage">
  <HeroCarousel {activities}>
    <Navbar />
  </HeroCarousel>

  <IntroBar />
</div>