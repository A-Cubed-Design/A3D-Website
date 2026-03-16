<script>
  import ContactPage from './pages/ContactPage.svelte';
  import TeamPage from './pages/TeamPage.svelte';
  import IndexPage from './pages/IndexPage.svelte';

  import {activeView} from './stores';

  const viewNames = {
    main: 'Home',
    form: 'Contact',
    ourTeam: 'Our Team',
  };

  let announceText = '';

  $: {
    const name = viewNames[$activeView] || 'Home';
    document.title = `A Cubed Design - ${name}`;
    announceText = `Navigated to ${name} page`;
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
  {#if $activeView === 'main'}
    <IndexPage />
  {/if}

  {#if $activeView === 'form'}
    <ContactPage />
  {/if}

  {#if $activeView === 'ourTeam'}
    <TeamPage />
  {/if}
</main>

<div aria-live="polite" class="sr-only">{announceText}</div>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }
</style>
