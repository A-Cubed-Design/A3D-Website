<script>
  import { onMount } from "svelte";
  import Typewriter from 'typewriter-effect/dist/core';
  import br from 'braille';
 
  let braille = '\u2820\u2801\u2800\u2820\u2809\u2825\u2803\u282B\u2800\u2820\u2819\u2811\u280E\u280A\u281B\u281D'
  //let braille = br.toBraille('A Cubed Design');

  onMount(()=> {
  let heroTitle = document.getElementById('main-title');

  let typewriter = new Typewriter(heroTitle, {
      loop: true
  });
  
  typewriter.typeString('A Cubed Design')
      .pauseFor(3500)
      .deleteAll(100)
      .typeString(braille)
      .pauseFor(1500)
      .deleteAll(100)
      .pauseFor(1500)
      // .typeString('A Cubed Design')
      // .callFunction((state) => {
      //    // turn off animation
      //    state.elements.cursor.style.animation = 'none'
      //    // hide cursor
      //    state.elements.cursor.style.display = 'none'
      // })
      .start();
    })
</script>

<div class="background">

</div>

<div class="hero-container">


  <div class="content" >
    <div class="hero-left">
      <h1 id="main-title">A Cubed Design</h1>
      <p>Tackling the braille literacy crisis by making it easier for blind individuals to acquire braille displays</p>
    </div>
    <div class="hero-right">
      <iframe src="https://www.youtube.com/embed/1rPE22she0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

  .hero-container {
    width: 85%;
    position: relative;
    
    margin: 112px auto 10px;
    padding-top: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  iframe {
    margin: 80px auto;
    width: 50%;
    aspect-ratio: 16/9;
  }
  
  h1 {
    font-size: 4em;
  }

  p {
    font-size: 1.8em;
    margin: 18px;
    line-height: 108%;

  }

  .hero-left {
    align-self: start;
  }

  @media (max-width: 900px) {
    iframe {
      width: 400px;
    }

    .hero-container {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 870px) {
    #main-title {
      font-size: 2em;
    }

    h1 {
      margin: 0 auto;
      width: 300px;
      text-align: center;
    }

    p {
      font-size: 1.2em;
    }
  }

  @media (max-width: 400px) {
    iframe {
      width: 300px;
    }
  }
</style>