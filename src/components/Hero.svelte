<script>
  
  // const clickHandler = (e) => {
  //   console.log(e.target);
  //   e.target.style.textAlign = 'left';
  //   e.target.style.flexDirection = 'row';
  // }
</script>

<div class="background">

</div>

<div class="hero-container">

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="content" >
    <div class="hero-left">
      <h1><span>A</span> <span>C</span>UBED <span>D</span>ESIGN</h1>
      <p>We're aiming to tackle the braille literacy crisis by making it easier for blind individuals to acquire screen readers.</p>
    </div>
    <div class="hero-right">
      <iframe src="https://www.youtube.com/embed/1rPE22she0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
  .background {
    background: url("https://raw.githubusercontent.com/Croixed/acubed-home/main/public/assets/pixabay-royalty-free-printer-2.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    /* background-color: hsla(282 78% 8% / 0.4);  */
    background-color: #0009;

    background-blend-mode: darken;
    height: 850px;
    width: 100vw;
    z-index: -1;

    position: fixed;
    transform: scaleX(-1); /* flips image */
  }

  .hero-container {
    height: 750px;
    width: 1100px;
    position: relative;

    margin: 0 auto;
    margin-top: 96px;

    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    /* backdrop-filter: blur(10px);
    background-color: #0003; */
    border-radius: 10px;
    gap: 12px;

    height: 40%;

    padding: 22px;
  }

  iframe {
    width: 550px;
    aspect-ratio: 16/9;

  }
  

  h1 {
    font-size: 4em;
  }

  span {
    font-size: 1.16em;
  }

  p {
    font-size: 1.8em;
    margin: 18px;
    line-height: 108%;
    
  }

  .hero-left {
    align-self: start;
  }
</style>