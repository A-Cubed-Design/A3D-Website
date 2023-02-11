<div class="background"></div>

<div class="contact" id="contact">
  <h1>Get Involved</h1>
  <p>Want to get involved? Want to provide feedback?</p>
  <p>Fill out the form below to get in contact with us.</p>
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfynGDAGn5yMX5LjyVCN98s9Cmx1M3hItnamqN4jmdYEgdavA/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" class="ui-droppable" title="Google Form">Loading…</iframe>
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
  .contact {
    padding: 175px 0 80px;
  }

  h1 {
    font-size: 3.5em;
    line-height: 1em;
    padding: 0 auto;
    margin-bottom: .3em;
  }

  p {
    font-size: 1.5em;
    line-height: 2em;
    padding: 0 auto;
  }

  iframe {
    margin-top: 1em;
  }

  
  
  @media (max-width: 450px) {
    h1 {
      font-size: 2em;
    }

    p {
      font-size: .9em;
    }
  }

  @media (min-width: 900px) {
    iframe[src*="google.com/forms"] {
      width: 900px !important;
    }
  }

  iframe[src*="google.com/forms"] {
      margin-top: 40px !important;
      border-radius: 20px;
    }
</style>