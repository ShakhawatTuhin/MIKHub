<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './routes/Home.svelte';
  import Activities from './routes/Activities.svelte';
  import Projects from './routes/Projects.svelte';
  import About from './routes/About.svelte';
  import FAQ from './routes/FAQ.svelte';
  import Apply from './routes/Apply.svelte';
</script>

<Navbar />
<main class="app-main">
  <section id="home">       <Home />       </section>
  <section id="activities"> <Activities /> </section>
  <section id="projects">   <Projects />   </section> 
  <section id="about">      <About />      </section> 
  <section id="faq">        <FAQ />        </section> 
  <section id="apply">      <Apply />      </section> 
</main>
<Footer />