<script>
  import { reveal } from "../lib/animations.js";
</script>

<section class="team-section" id="team" use:reveal={{ stagger: 150, staggerSelector: '.card' }}>
  <div class="section-header">
    <h2 class="section-title">Executive Team</h2>
  </div>
  <div class="cards">
    <div class="card">
      <div class="card-content">
        <picture>
          <source srcset="/assets/Garrett.webp" type="image/webp">
          <img class="profile-pic" src="/assets/Garrett.png" alt="Professional Headshot of Garrett Carder">
        </picture>
        <h3>Garrett Carder</h3>
        <div class="job-title"><p>CEO & Chief Engineer</p></div>
        <p class="card-body-text">Graduating in 2023 from OSU with a Bachelor's in Computer Science, Garrett leads A Cubed Design's Business Development & Engineering Development</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/garrettcarder317/" class="social-btn" aria-label="garrett carder's linkedin page"><i class="fab fa-linkedin"></i></a>
          <a href="https://garrettcarder.com/" class="social-btn" aria-label="garrett carder's website"><i class="fas fa-globe"></i></a>
          <a href="mailto:garrett@acubed.design" class="social-btn" aria-label="garrett carder's email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <picture>
          <source srcset="/assets/Caroline.webp" type="image/webp">
          <img class="profile-pic" src="/assets/Caroline.png" alt="Professional Headshot of Caroline Karbowski">
        </picture>
        <h3>Caroline Karbowski</h3>
        <div class="job-title"><p>Chief Community Officer</p></div>
        <p class="card-body-text">Graduate in 2022 of OSU with a Bachelor's in Biology, Caroline backs A Cubed Design with a Robust Community and Deep Knowledge of Blindness Accessibility</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/caroline-karbowski-4a4073178/" class="social-btn" aria-label="caroline karbowski's linkedin page"><i class="fab fa-linkedin"></i></a>
          <a href="https://see3d.org/" class="social-btn" aria-label="see3d website"><i class="fas fa-globe"></i></a>
          <a href="mailto:caroline@acubed.design" class="social-btn" aria-label="caroline karbowski's email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <img class="profile-pic" src="/assets/Enan-new.png" alt="Professional Headshot of Enan Srivastava">
        <h3>Enan Srivastava</h3>
        <div class="job-title"><p>Chief Operations Officer</p></div>
        <p class="card-body-text">Graduate in 2022 of OSU with a Bachelor's in Economics, Enan is the driving force behind A Cubed Design's Strategy and Operations.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/enan-srivastava/" class="social-btn" aria-label="enan srivastava's linkedin page"><i class="fab fa-linkedin"></i></a>
          <a href="https://enan.rocks/" class="social-btn" aria-label="enan srivastava's website"><i class="fas fa-globe"></i></a>
          <a href="mailto:enan@acubed.design" class="social-btn" aria-label="enan srivastava's email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <img class="profile-pic" src="/assets/LauraKramer.jpeg" alt="Professional Headshot of Laura Kramer">
        <h3>Laura Kramer</h3>
        <div class="job-title"><p>ME Lead & Principal Investigator</p></div>
        <p class="card-body-text">Laura leads A Cubed Design's Mechanical Engineering efforts and serves as Principal Investigator, driving the hardware development of our braille devices.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/laurahkramer/" class="social-btn" aria-label="laura kramer's linkedin page"><i class="fab fa-linkedin"></i></a>
          <a href="mailto:laura@acubed.design" class="social-btn" aria-label="laura kramer's email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .team-section {
    padding: var(--section-gap) 0;
    max-width: var(--content-max-width);
    margin: 0 auto;
    width: 90%;
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .section-title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
    align-items: stretch;
  }

  .card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border-subtle);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-inset-glass);
    display: flex;
    transition:
      transform var(--duration-normal) var(--ease-out-expo),
      border-color var(--duration-normal) var(--ease-out-cubic),
      box-shadow var(--duration-normal) var(--ease-out-cubic);
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--color-border-purple);
    box-shadow: var(--shadow-glow-sm), var(--shadow-inset-glass);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-xl) var(--space-sm);
    flex: 1;
  }

  .profile-pic {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid var(--color-border-default);
    transition:
      border-color var(--duration-normal) var(--ease-out-cubic),
      box-shadow var(--duration-normal) var(--ease-out-cubic);
  }

  .card:hover .profile-pic {
    border-color: var(--color-primary-light);
    box-shadow: 0 0 20px hsla(272, 72%, 50%, 0.2);
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin: var(--space-md) 0 var(--space-sm);
    text-align: center;
    min-height: 2.6em;
    display: flex;
    align-items: center;
  }

  .job-title {
    padding: 6px 16px;
    border-radius: var(--border-radius-sm);
    background: var(--color-primary-gradient-alt);
    transform: skewX(var(--skew-angle));
    min-height: 2.8em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .job-title p {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-caps);
    transform: skewX(calc(var(--skew-angle) * -1));
    margin: 0;
    text-align: center;
    line-height: var(--line-height-snug);
  }

  .card-body-text {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary);
    text-align: center;
    margin: var(--space-sm) 0;
    flex: 1;
  }

  p {
    margin: 0;
  }

  .social-links {
    display: flex;
    gap: var(--space-sm);
    margin-top: auto;
    padding-top: var(--space-sm);
  }

  .social-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius-sm);
    color: var(--color-text-link);
    transition:
      background var(--duration-fast) var(--ease-out-cubic),
      transform var(--duration-fast) var(--ease-out-expo);
  }

  .social-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.1);
    color: var(--color-text-link);
  }

  .social-btn i {
    font-size: 1.125rem;
  }

  a:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      max-width: 600px;
      margin: 0 auto;
      gap: var(--space-md);
    }
  }

  @media (max-width: 600px) {
    .cards {
      grid-template-columns: 1fr;
      max-width: 340px;
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: var(--font-size-2xl);
    }
  }
</style>
