<script>
  import {config} from '../lib/config.js';
  import { reveal } from "../lib/animations.js";
</script>

<section class="contact" id="contact" use:reveal>
  <span class="eyebrow">Reach Out</span>
  <h1>Get Involved</h1>
  <p>Want to get involved? Want to provide feedback?</p>
  <p>Fill out the form below to get in contact with us.</p>
  <iframe src={config.forms.contact} width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" class="ui-droppable" title="A Cubed Design contact form">Loading...</iframe>
</section>

<style>
  .contact {
    padding: calc(var(--header-height) + var(--space-2xl)) var(--space-lg) var(--section-gap);
    max-width: var(--content-max-width);
    margin: 0 auto;
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

  h1 {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    margin-bottom: var(--space-sm);
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }

  iframe {
    margin-top: var(--space-xl);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-subtle);
  }

  @media (max-width: 480px) {
    h1 {
      font-size: var(--font-size-2xl);
    }

    p {
      font-size: var(--font-size-base);
    }
  }

  @media (min-width: 1024px) {
    iframe {
      width: 900px;
    }
  }
</style>
