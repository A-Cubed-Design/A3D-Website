<script>
  import { reveal } from "../lib/animations.js";
</script>

<section class="section" use:reveal={{ stagger: 120, staggerSelector: '.card' }}>
  <div class="section-header">
    <span class="eyebrow">Our Foundation</span>
    <h2 class="section-title">Three A's of A Cubed Design</h2>
  </div>
  <div class="cards">
    <div class="card">
      <img class="card-icon" src="/assets/braille2.png" alt="hand reading a braille book">
      <h3 class="card-header">Accessible</h3>
      <p class="card-text">We value accessibility first and foremost. We aim to provide a product, which will be easily usable and well documented.</p>
    </div>
    <div class="card middle">
      <img class="card-icon" src="/assets/money2.png" alt="two hands holding a coin">
      <h3 class="card-header">Affordable</h3>
      <p class="card-text">Our braille display is slated to become the most easily obtainable product on the market.</p>
    </div>
    <div class="card">
      <img class="card-icon" src="/assets/rocket2.png" alt="a flying rocket ship">
      <h3 class="card-header">Accelerated</h3>
      <p class="card-text">We aim to accelerate the way blind individuals interface with their environment by adding plug and play features to our device.</p>
    </div>
  </div>
</section>

<style>
  .section {
    padding: var(--section-gap) 0;
    max-width: var(--content-max-width);
    margin: 0 auto;
    width: 90%;
  }

  .section-header {
    text-align: left;
    margin-bottom: var(--space-2xl);
  }

  .eyebrow {
    display: inline-block;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-caps);
    color: var(--color-primary-light);
    margin-bottom: var(--space-sm);
  }

  .section-title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border-subtle);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xl) var(--space-lg);
    text-align: center;
    transition:
      transform var(--duration-normal) var(--ease-out-expo),
      border-color var(--duration-normal) var(--ease-out-cubic),
      box-shadow var(--duration-normal) var(--ease-out-cubic);
    box-shadow: var(--shadow-inset-glass);
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-purple);
    box-shadow: var(--shadow-glow-sm), var(--shadow-inset-glass);
  }

  .card.middle {
    transform: scale(1.04);
    border-color: var(--color-border-purple);
  }

  .card.middle:hover {
    transform: scale(1.04) translateY(-4px);
  }

  .card-icon {
    width: 72px;
    height: 72px;
    object-fit: contain;
    margin-bottom: var(--space-md);
  }

  .card-header {
    font-family: var(--font-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-sm);
  }

  .card-text {
    font-size: var(--font-size-base);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
  }

  @media (max-width: 768px) {
    .cards {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .section-header {
      text-align: center;
    }

    .section-title {
      font-size: var(--font-size-2xl);
    }

    .card.middle {
      transform: none;
    }

    .card.middle:hover {
      transform: translateY(-4px);
    }
  }
</style>
