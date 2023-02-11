<script>
  import ContactPage from './pages/ContactPage.svelte';
  import TeamPage from './pages/TeamPage.svelte';
  import IndexPage from './pages/IndexPage.svelte';


  import {activeView} from './stores';

</script>

<main>
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

<style>

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    overflow-x: hidden;
  }
</style>
