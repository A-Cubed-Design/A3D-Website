<script>
import { onMount } from 'svelte';
import {activeView} from '../stores';

let scrolled = false;

function formHandler() {
  $activeView = 'form';
}

function mainHandler(e) {
  e.preventDefault();
  $activeView = 'main';
}

function teamHandler(e) {
  e.preventDefault();
  if ($activeView !== 'main') {
    $activeView = 'main';
    setTimeout(() => {
      const el = document.getElementById('team');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    const el = document.getElementById('team');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

function contactHandler(e) {
  e.preventDefault();
  $activeView = 'form';
}

onMount(() => {
  const onScroll = () => {
    scrolled = window.scrollY > 20;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
});
</script>

<header class:scrolled>
  <a href="/" on:click={mainHandler} class="logo-link">
    <img src="/assets/ACubedD-White-Transparent.png" alt="A Cubed Design Logo">
  </a>
  <nav aria-label="Main navigation" class="links">
    <a href="/" on:click={mainHandler} class:active={$activeView === 'main'} aria-current={$activeView === 'main' ? 'page' : undefined}>About</a>
    <a href="#team" on:click={teamHandler}>Team</a>
    <a href="#contact" on:click={contactHandler} class:active={$activeView === 'form'} aria-current={$activeView === 'form' ? 'page' : undefined}>Contact</a>
  </nav>
</header>

<style>
  header {
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 10;
    height: var(--header-height);
    border-bottom: 1px solid var(--color-border-subtle);
    transition: box-shadow var(--duration-normal) var(--ease-out-cubic);
  }

  header.scrolled {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }

  .logo-link {
    display: flex;
    align-items: center;
  }

  img {
    width: 180px;
    padding: 0 var(--space-md);
  }

  .links {
    display: flex;
    gap: var(--space-lg);
    margin-left: auto;
    padding: 0 var(--space-xl);
    z-index: 3;
  }

  .links a {
    color: var(--color-text-primary);
    text-decoration: none;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding-bottom: 4px;
    position: relative;
    transition: var(--transition-color);
  }

  .links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary-light);
    transition: width var(--duration-normal) var(--ease-out-expo);
  }

  .links a:hover::after,
  .links a.active::after {
    width: 100%;
  }

  .links a:hover {
    color: var(--color-primary-light);
  }

  @media (max-width: 768px) {
    header {
      flex-direction: column;
      height: auto;
      padding: var(--space-sm) 0;
      gap: var(--space-xs);
    }

    img {
      width: 140px;
    }

    .links {
      margin-left: 0;
      padding: 0 var(--space-sm);
      gap: var(--space-md);
    }

    .links a {
      font-size: var(--font-size-sm);
    }
  }
</style>
