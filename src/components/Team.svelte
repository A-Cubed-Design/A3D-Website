

<div class="a-container" id="team">
  <div>
    <div class="exec-team-heading">
      <img class="logo-image" src="/assets/ACubedLogo.png" alt="A Cubed Design logo">
      <h2 class="section-title">Executive Team</h2>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="/assets/Garrett.png" alt="Professional Headshot of Garrett Carder">
          <h3>Garrett Carder</h3>
          <div class="job-title"><p>CEO & Chief Engineer</p></div>
          <p class="card-body-text">Graduating in 2023 from OSU with a Bachelor's in Computer Science, Garrett leads A Cubed Design's Business Development & Engineering Development</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/garrettcarder317/" aria-label="garrett carder's linkedin page"><i class="fa fa-linkedin"></i></a>
            <a href="https://garrettcarder.com/" aria-label="garrett carder's website"><i class="fa fa-globe"></i></a>
            <a href="mailto:garrett@acubed.design" aria-label="garrett carder's email"><i class="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="/assets/Caroline.png" alt="Professional Headshot of Caroline Karbowski">
          <h3>Caroline Karbowski</h3>
          <div class="job-title"><p>Chief Community Officer</p></div>
          <p class="card-body-text">Graduate in 2022 of OSU with a Bachelor's in Biology, Caroline backs A Cubed Design with a Robust Community and Deep Knowledge of Blindness Accessibility</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/caroline-karbowski-4a4073178/" aria-label="caroline karbowski's linkedin page"><i class="fa fa-linkedin"></i></a>
            <a href="https://see3d.org/" aria-label="see3d website"><i class="fa fa-globe"></i></a>
            <a href="mailto:caroline@acubed.design" aria-label="caroline karbowski's email"><i class="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <img class="profile-pic" src="/assets/Enan.png" alt="Professional Headshot of Enan Srivastava">
          <h3>Enan Srivastava</h3>
          <div class="job-title"><p>Chief Operations Officer</p></div>
          <p class="card-body-text">Graduate in 2022 of OSU with a Bachelor's in Economics, Enan is the driving force behind A Cubed Design's Strategy and Operations.</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/enan-srivastava/" aria-label="enan srivastava's linkedin page"><i class="fa fa-linkedin"></i></a>
            <a href="https://enan.rocks/" aria-label="enan srivastava's website"><i class="fa fa-globe"></i></a>
            <a href="mailto:enan@acubed.design" aria-label="enan srivastava's email"><i class="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .a-container {
    background-color: rgba(41, 41, 41, .8);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 75px;
  }

  .exec-team-heading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cards {
    display: flex;
    justify-content: center;
    gap: 4em;
    height: auto;
    grid-template-columns: repeat(3, 1fr);
  }
  
  .card {
    border-radius: 20px;
    width: 360px;
    margin-bottom: 40px;
    font-size: 2em;
    display: flex;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    flex: 1;
  }

  .card-body-text {
    width: 80%;
    text-align: center;
    font-size: .5em;
  }

  .section-title {
    font-size: 3.5em;
  }

  .profile-pic {
    width: 75%;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.87);
  }

  h3 {
    font-size: .75em;
    margin: 1em 0;
  }

  .logo-image {
    width: 120px;
    padding: 0 1em;
  }

  .job-title {
    padding: 0px 30px;
    width: 60%;
    border-radius: 5px;
    /* background-color: hsl(282 98% 29%); */
    background: linear-gradient(108deg, #670192cc 23%, #56037c 73%, #480368cc 96%);
    transform: skewX(-17deg);
  }

  .job-title p {
    font-size: .45em;
    transform: skewX(17deg);
    margin: 0;
  }

  p {
    margin: 1.5em 0;
    font-size: 1em;
    flex: 1;
  }

  .social-links {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  
  .fa {
    color: #9EB7E5;
  }

  a:hover {
    cursor: pointer;
  }

  @media (max-width: 870px) {
    .section-title {
        font-size: 2em;
    }
  }

  @media (max-width: 1200px) {
    .exec-team-heading {
      flex-wrap: wrap;
      margin-bottom: 2em;
    }

    .cards {
      flex-wrap: wrap;
      justify-content: center;
      gap: 2em;
    }
  }
</style>