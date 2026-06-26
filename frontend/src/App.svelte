<script>
  import { Router, Route } from 'svelte-routing';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Home from './routes/Home.svelte';
  import Activities from './routes/Activities.svelte';
  import Projects from './routes/Projects.svelte';
  import About from './routes/About.svelte';
  import FAQ from './routes/FAQ.svelte';
  import Apply from './routes/Apply.svelte';

  export let url = '';
</script>

<Router {url}>
  <Navbar />
  <main class="app-main">
    <Route path="/"           component={Home}       />
    <Route path="/activities" component={Activities} />
    <Route path="/projects"   component={Projects}   />
    <Route path="/about"      component={About}      />
    <Route path="/faq"        component={FAQ}        />
    <Route path="/apply"      component={Apply}      />
  </main>
  <Footer />
</Router>