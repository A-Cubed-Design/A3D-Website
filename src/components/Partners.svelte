<script>
  import { reveal } from "../lib/animations.js";
</script>

<section class="partners-section" use:reveal={{ stagger: 80, staggerSelector: '.logo-item' }}>
  <h2 class="section-title">Our Partners</h2>
  <div class="logos">
    <div class="logo-item">
      <img class="logo-image" src="/assets/osu-logo.png" alt="osu keenen center for entrepreneurship logo">
    </div>
    <div class="logo-item">
      <img class="logo-image" src="/assets/gen-usa-logo.svg" alt="generation usa logo">
    </div>
    <div class="logo-item">
      <img class="logo-image" src="/assets/see3d-logo.png" alt="see3d logo">
    </div>
    <div class="logo-item">
      <img class="logo-image" src="/assets/innovation-studio-logo.svg" alt="innovation studio logo">
    </div>
    <div class="logo-item">
      <img class="logo-image logo-color" src="/assets/school-for-the-blind-logo.png" alt="ohio state school for the blind logo">
    </div>
    <div class="logo-item">
      <img class="logo-image logo-color" src="/assets/nsf-logo.png" alt="National Science Foundation logo">
    </div>
    <div class="logo-item">
      <img class="logo-image logo-color" src="/assets/sea-change-logo.png" alt="AAAS SEA Change logo">
    </div>
  </div>
</section>

<style>
  .partners-section {
    padding: var(--section-gap) 0;
    background: var(--color-surface-1);
    border-top: 1px solid var(--color-border-subtle);
  }

  .section-title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2xl);
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--space-lg);
  }

  .logo-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-image {
    width: 150px;
    filter: brightness(0) invert(1);
    opacity: 0.5;
    transition:
      opacity var(--duration-normal) var(--ease-out-cubic),
      filter var(--duration-normal) var(--ease-out-cubic);
  }

  .logo-image:hover {
    opacity: 1;
    filter: none;
  }

  .logo-color {
    filter: grayscale(1) brightness(0.8);
    opacity: 0.6;
  }

  .logo-color:hover {
    filter: none;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: var(--font-size-2xl);
    }

    .logos {
      gap: var(--space-xl);
    }

    .logo-image {
      width: 120px;
    }
  }
</style>
