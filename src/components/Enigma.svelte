<script>
  import { reveal } from "../lib/animations.js";
</script>

<section class="enigma-section" use:reveal>
  <div class="enigma">
    <div class="enigma-image-col">
      <img class="enigma-img" src="./assets/enigma-lighter.png" alt="3D model of braille display device">
    </div>
    <div class="enigma-text">
      <span class="eyebrow">Our Flagship Product</span>
      <p class="title">Enigma Reader</p>
      <div class="sub-text">The enigma braille reader is our signature device, which aims to be affordable and provide an expandable ecosystem for people who are blind to be able to plug and play new functionality into their braille device.</div>
    </div>
  </div>
</section>

<style>
  .enigma-section {
    padding: 0 0 var(--section-gap);
  }

  .enigma {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: var(--space-xl);
    width: 90%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    background: var(--color-primary-gradient);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-purple);
    padding: var(--space-xl);
    overflow: visible;
  }

  .enigma-image-col {
    position: relative;
  }

  .enigma-img {
    width: 110%;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
    margin-left: -5%;
  }

  .eyebrow {
    display: inline-block;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-caps);
    color: var(--color-primary-lightest);
    margin-bottom: var(--space-sm);
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-md);
  }

  .enigma-text {
    text-align: left;
  }

  .sub-text {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
  }

  @media (max-width: 768px) {
    .enigma {
      grid-template-columns: 1fr;
      text-align: center;
      padding: var(--space-lg);
    }

    .enigma-text {
      text-align: center;
    }

    .enigma-img {
      width: 100%;
      margin-left: 0;
    }

    .title {
      font-size: var(--font-size-2xl);
    }

    .sub-text {
      font-size: var(--font-size-base);
    }
  }
</style>
