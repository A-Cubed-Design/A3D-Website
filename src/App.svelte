<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Footer2 from './components/Footer2.svelte';
  import Hero from './components/Hero.svelte';
  import ThreeA from './components/ThreeA.svelte';
  import Enigma from './components/Enigma.svelte';
  import Team from './components/Team.svelte';
  import OurTeam from './components/OurTeam.svelte';
  import Buttons from './components/Buttons.svelte';
  import Partners from './components/Partners.svelte'
  import Contact from './components/Contact.svelte';

  import {activeView} from './stores';

</script>

<main>
  {#if $activeView === 'main'}
  <Header />
  <Hero />
  <Enigma />
  <ThreeA />
  <Partners />
  <Team />
  <Buttons />
  <Footer2 />
  {/if}

  {#if $activeView === 'form'}
  <Header />
  <Contact />
  <Footer2 />
  {/if}

  {#if $activeView === 'ourTeam'}
  <Header />
  <OurTeam />
  <Footer2 />
  {/if}

</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    overflow-x: hidden;
  }
</style>
