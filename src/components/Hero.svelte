<script>
  import { onMount } from "svelte";
  import { reveal } from "../lib/animations.js";
  import Typewriter from 'typewriter-effect/dist/core';

  let braille = '\u2820\u2801\u2800\u2820\u2809\u2825\u2803\u282B\u2800\u2820\u2819\u2811\u280E\u280A\u281B\u281D'
  let showVideo = false;
  let typewriterReady = false;

  onMount(() => {
    let heroTitle = document.getElementById('main-title');

    let typewriter = new Typewriter(heroTitle, {
      loop: true
    });

    typewriterReady = true;

    typewriter.typeString('A Cubed Design')
      .pauseFor(3500)
      .deleteAll(100)
      .typeString(braille)
      .pauseFor(1500)
      .deleteAll(100)
      .pauseFor(1500)
      .start();
  })

  function loadVideo() {
    showVideo = true;
  }
</script>

<section class="hero-section">
  <div class="gradient-mesh" aria-hidden="true"></div>
  <div class="hero-container" use:reveal={{ stagger: 200, staggerSelector: '.reveal-item' }}>
    <div class="hero-left">
      <span class="eyebrow reveal-item">Braille Reimagined</span>
      <h1 id="main-title" class="reveal-item">{typewriterReady ? '' : 'A Cubed Design'}</h1>
      <p class="subtitle reveal-item">Tackling the braille literacy crisis by making it easier for blind individuals to acquire braille displays</p>
    </div>
    <div class="hero-right reveal-item">
      {#if showVideo}
        <iframe
          src="https://www.youtube.com/embed/1rPE22she0Y?autoplay=1"
          title="A Cubed Design introduction video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <button class="video-placeholder" on:click={loadVideo} aria-label="Play A Cubed Design introduction video">
          <img
            src="https://img.youtube.com/vi/1rPE22she0Y/hqdefault.jpg"
            alt="A Cubed Design video thumbnail"
            loading="lazy"
          />
          <div class="play-button" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
              <path d="M45 24 27 14v20" fill="white"/>
            </svg>
          </div>
        </button>
      {/if}
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    overflow: hidden;
    padding: calc(var(--header-height) + 60px) 0 var(--section-gap);
  }

  .gradient-mesh {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 40%, hsla(272, 72%, 30%, 0.25) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 20%, hsla(272, 60%, 25%, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse 50% 80% at 50% 90%, hsla(272, 50%, 20%, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .hero-container {
    position: relative;
    z-index: 1;
    width: 90%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .hero-left {
    text-align: left;
  }

  .eyebrow {
    display: inline-block;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-caps);
    color: var(--color-primary-light);
    padding-left: var(--space-sm);
    border-left: 3px solid var(--color-primary-light);
    margin-bottom: var(--space-md);
  }

  #main-title {
    min-height: 1.2em;
  }

  h1 {
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-md);
  }

  .subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    max-width: 520px;
  }

  .hero-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-card);
  }

  .video-placeholder {
    position: relative;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
    display: block;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: var(--transition-shadow), var(--transition-transform);
  }

  .video-placeholder:hover {
    box-shadow: var(--shadow-glow-md);
    transform: translateY(-2px);
  }

  .video-placeholder img {
    width: 100%;
    display: block;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.85;
    transition: opacity var(--duration-fast) var(--ease-out-cubic);
  }

  .video-placeholder:hover .play-button {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      text-align: center;
    }

    .hero-left {
      text-align: center;
    }

    .eyebrow {
      border-left: none;
      padding-left: 0;
      border-bottom: 2px solid var(--color-primary-light);
      padding-bottom: 4px;
    }

    .subtitle {
      max-width: 100%;
      font-size: var(--font-size-lg);
    }

    h1 {
      font-size: var(--font-size-3xl);
    }
  }
</style>
