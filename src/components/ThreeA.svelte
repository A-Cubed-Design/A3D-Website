

<div class="a-container">

  <h2 class="three-a-title">Three A's of A Cubed Design</h2>
  <div class="cards">
    <div class="card">
      <h3 class="card-header">Accessible</h3>
      <img class="card-image" src="/assets/braille2.png" alt="hand reading a braille book">
      <p class="card-text">We value accessibility first and foremost. We aim to provide a product, which will be easily usable and well documented.</p>
    </div>
    <div class="card">
      <h3 class="card-header">Affordable</h3>
      <img class="card-image" src="/assets/money2.png" alt="two hands holding a coin">
      <p class="card-text">Our braille display is slated to become the most easily obtainable product on the market.</p>
    </div>
    <div class="card">
      <h3 class="card-header">Accelerated</h3>
      <img class="card-image" src="/assets/rocket2.png" alt="a flying rocket ship">
      <p class="card-text">We aim to accelerate the way blind individuals interface with their environment by adding plug and play features to our device.</p>
    </div>
  </div>

</div>


<style>
  .a-container {
    padding: 100px;
    box-sizing: border-box;
    max-width: 2000px;
  }

  .cards {
    display: flex;
  }
  
  .card {
    margin: 2em;
  }

  .three-a-title {
    margin-top: 2em;
    font-size: 3.5em;
  }
  
  h3 {
    font-size: 2em;
    font-weight: bold;
    margin: 1.5em auto;
  }

  .card-image {
    width: 200px;
  }

  .card-text {
    margin: 1.2em auto;
    line-height: 1.2em;
    font-size: 1.3em;
  }

  @media (max-width: 870px) {
    .three-a-title {
      font-size: 2em;
      width: 175px;
      margin: 0 auto;
    }

    .card-header {
      font-size: 1.4em;
    }

    .card-text {
      font-size: 1.2em;
    }
  }

  @media (max-width: 1270px) {
    .cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

</style>