<div class="container bg-braille">
    <h2 class="md text-center my-2 shadow">
        Our Partners
    </h2>
    <div class="container flex">
        <div>
            <img class="logo-image" src="/assets/osu-logo.png" alt="osu keenen center for entrepreneurship logo">
        </div>
        <div>
            <img class="logo-image" src="/assets/gen-usa-logo.svg" alt="generation usa logo">
        </div>
        <div>
            <img class="logo-image" src="/assets/see3d-logo.png" alt="see3d logo">
        </div>
        <div>
            <img class="logo-image" src="/assets/innovation-studio-logo.svg" alt="innovation studio logo">
        </div>
        <div>
            <img src="/assets/school-for-the-blind-logo.png" alt="ohio state school for the blind logo">
        </div>
    </div>
</div>

<style>
.container {
    /* background-color: #292929; */
    margin: 0 auto;
    padding: 75px 0;
    width: 100%;
    
}

.bg-braille {
    background-image: url('/assets/unsplash-royalty-free-braille.jpg');
    box-shadow: inset 0 0 0 1000vw rgba(174, 51, 219, 0.35);
    background-position: 0 10%;
    background-size: cover;
    border-top: 3px solid rgba(84, 31, 103, .90);
    border-bottom: 3px solid rgba(84, 31, 103, .90);
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.text-center {
    align-items: center;
}

.md {
    font-size: 3.5em;
}

.my-2 {
    margin: 1.5rem auto;
    line-height: 1em;
}

.shadow {
    text-shadow: 1px 4px #292929;
}

.logo-image {
    width: 230px;
}

@media (max-width: 870px) {
    .text-center {
        font-size: 2em;
    }
}

@media (max-width: 1200px) {
    .container {
      flex-wrap: wrap;
      justify-content: center;
    }

    .logo-image {
        margin: 1.5em 0;
    }

    .text-center {
        max-width: 400px;
    }
  }
</style>