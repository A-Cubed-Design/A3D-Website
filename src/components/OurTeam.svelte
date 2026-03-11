<script>
  import Team from './Team.svelte';
  import { reveal } from "../lib/animations.js";
</script>

<div class="exec-team-component" id="ourteam">
  <Team />
</div>

<div class="other-teams">
  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Market Validation Team</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #1</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #2</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #3</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #4</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Electrical Engineering Team</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #1</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #2</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #3</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #4</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Software Engineering Team</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #1</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #2</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #3</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #4</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Mechanical Engineering Team</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #1</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #2</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Past Team Members</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #1</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #2</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #3</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="https://picsum.photos/300/300" alt="">
          <h3>Team Member #4</h3>
        </div>
      </div>
    </div>
  </div>

  <div class="team-group" use:reveal={{ stagger: 100, staggerSelector: '.card' }}>
    <div class="team-title-section">
      <h2 class="team-label">Generation USA Interns</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <picture>
            <source srcset="/assets/abisha-thomas.webp" type="image/webp">
            <img class="profile-pic" src="/assets/abisha-thomas.png" alt="Abisha Thomas">
          </picture>
          <h3>Abisha Thomas</h3>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="/assets/giuseppe-cespedes.jpg" alt="Giuseppe Cespedes">
          <h3>Giuseppe Cespedes</h3>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .exec-team-component {
    padding-top: calc(var(--header-height) + var(--space-xl));
  }

  .other-teams {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 var(--space-lg) var(--section-gap);
    width: 90%;
  }

  .team-group {
    margin-bottom: var(--space-2xl);
  }

  .team-title-section {
    text-align: center;
    margin-bottom: var(--space-xl);
  }

  .team-label {
    font-family: var(--font-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
  }

  .card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-border-subtle);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--border-radius-lg);
    width: 220px;
    box-shadow: var(--shadow-inset-glass);
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
    padding: var(--space-lg) var(--space-md);
  }

  .profile-pic {
    width: 140px;
    height: 140px;
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

  h2 {
    font-size: var(--font-size-2xl);
    margin: var(--space-md) 0;
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--space-md);
    text-align: center;
  }

  @media (max-width: 768px) {
    .team-label {
      font-size: var(--font-size-xl);
    }
  }
</style>
