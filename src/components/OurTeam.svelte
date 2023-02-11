<script>
  import Team from './Team.svelte';
</script>

<div class="background"></div>
<div class="exec-team-component" id="ourteam">
  <Team />
</div>
<div class="a-container">
    <div>
      <div class="team-title-section">
        <h2 class="team-label">Market Validation Team</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #1</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #2</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #3</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #4</h3>
          </div>
        </div>
      </div>
      <!-- Electrical Engineering Team -->
      <div class="team-title-section">
        <h2 class="team-label">Electrical Engineering Team</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #1</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #2</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #3</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #4</h3>
          </div>
        </div>
      </div>
      <!-- Software Engineering Team -->
      <div class="team-title-section">
        <h2 class="team-label">Software Engineering Team</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #1</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #2</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #3</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #4</h3>
          </div>
        </div>
      </div>
      <!-- Mechanical Engineering Team -->
      <div class="team-title-section">
        <h2 class="team-label">Mechanical Engineering Team</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #1</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #2</h3>
          </div>
        </div>
      </div>
      <!-- Past Team Members -->
      <div class="team-title-section">
        <h2 class="team-label">Past Team Members</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #1</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #2</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #3</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="https://picsum.photos/300/300" alt="team member name">
            <h3>Team Member #4</h3>
          </div>
        </div>
      </div>
      <!-- Generation USA Interns -->
      <div class="team-title-section">
        <h2 class="team-label">Generation USA Interns</h2>
      </div>
      <div class="cards">
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="/assets/abisha-thomas.png" alt="team member name">
            <h3>Abisha Thomas</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <img class="profile-pic" src="/assets/giuseppe-cespedes.jpg" alt="team member name">
            <h3>Giuseppe Céspedes</h3>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
    .background {
        background: url("/assets/pixabay-royalty-free-printer-2.jpg") no-repeat;
        background-size: cover;
        background-position: center;
        background-color: rgba(41, 41, 41, .9);

        background-blend-mode: darken;
        height: 100%;
        width: 100vw;
        z-index: -1;

        position: fixed;
        transform: scaleX(-1); /* flips image */
    }

    .exec-team-component {
      margin-top: 5em;
      margin-bottom: -2em;
    }

    .a-container {
      background-color: rgba(41, 41, 41, .8);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      /* padding-top: 175px; */
    }
  
    .team-title-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3em;
    }
  
    .cards {
      display: flex;
      justify-content: center;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 6em;
    }
    
    .card {
      border-radius: 20px;
      width: 260px;
      font-size: 2em;
      display: flex;
    }
  
    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
  
    .team-label {
      font-size: 3.5em;
    }
  
    .profile-pic {
      width: 70%;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.87);
    }
  
    h2 {
      font-size: 1.5rem;
      margin: 1.5rem 0;
    }

    h3 {
      font-size: 1rem;
      margin: 1.2rem 0;
    }
  
    @media (max-width: 870px) {
      .team-label {
          font-size: 2em;
      }
    }
  
    @media (max-width: 1200px) {
      .team-title-section {
        flex-wrap: wrap;
      }

      .team-label {
        line-height: 1.3em;
      }
  
      .cards {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
</style>