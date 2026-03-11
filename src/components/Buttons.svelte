<script>
    import {activeView} from '../stores';
    import {config} from '../lib/config.js';
    import { reveal } from "../lib/animations.js";

    function formHandler() {
      $activeView = 'ourTeam';
    }

    function formHandlerContactForm(e) {
        e.preventDefault();
        $activeView = 'form';
    }
</script>

<section class="values-section" use:reveal>
  <div class="section-inner">
    <h2>Values Assessment</h2>
    <p>At A Cubed Design, we are always collecting feedback from the blindness community. If you'd like to provide input on our device, choose the appropriate link below, based on whether you are a braille user or an instructor.</p>
    <div class="button-row">
      <a class="btn btn-outline" href={config.forms.brailleUsers}>Braille Users</a>
      <a class="btn btn-outline" href={config.forms.teachers}>Teachers / AT Instructors</a>
    </div>
  </div>
</section>

<section class="cta-section" use:reveal>
  <div class="section-inner">
    <h2>Get Involved</h2>
    <p>Interested in getting involved and learning more?</p>
    <div class="button-row">
      <a class="btn btn-primary" href="/" on:click={formHandlerContactForm}>Contact Us</a>
    </div>
  </div>
</section>

<style>
  .values-section {
    padding: var(--section-gap) 0;
    background:
      linear-gradient(135deg, hsla(272, 72%, 30%, 0.15) 0%, transparent 60%);
    border-top: 1px solid var(--color-border-purple);
    border-bottom: 1px solid var(--color-border-purple);
  }

  .cta-section {
    padding: var(--section-gap) 0;
    background: var(--color-surface-1);
  }

  .section-inner {
    max-width: var(--content-max-width);
    margin: 0 auto;
    text-align: center;
    padding: 0 var(--space-lg);
  }

  h2 {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-md);
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    max-width: 700px;
    margin: 0 auto var(--space-xl);
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: var(--space-lg);
    flex-wrap: wrap;
  }

  .btn {
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    padding: 14px 32px;
    border-radius: var(--border-radius-md);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    position: relative;
    overflow: hidden;
    transition:
      transform var(--duration-fast) var(--ease-out-expo),
      box-shadow var(--duration-normal) var(--ease-out-cubic),
      border-color var(--duration-normal) var(--ease-out-cubic),
      background var(--duration-normal) var(--ease-out-cubic);
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-outline {
    color: var(--color-accent);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--color-border-default);
  }

  .btn-outline:hover {
    transform: translateY(-1px);
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-glow-sm);
    color: var(--color-text-primary);
    background: rgba(255, 255, 255, 0.06);
  }

  .btn-primary {
    color: #fff;
    background: var(--color-primary);
    border: 1px solid var(--color-primary-light);
    box-shadow: var(--shadow-glow-sm);
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-glow-md);
    color: #fff;
    background: var(--color-primary-light);
  }

  @media (max-width: 480px) {
    h2 {
      font-size: var(--font-size-2xl);
    }

    p {
      font-size: var(--font-size-base);
    }

    .btn {
      min-width: 0;
      width: 100%;
    }

    .button-row {
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
    }
  }
</style>
