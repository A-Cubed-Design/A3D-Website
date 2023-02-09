<script>
import {activeView} from '../stores';

function formHandler() {
  $activeView = 'form';
}

function mainHandler() {
  $activeView = 'main';
}


</script>

<header>
  <a href="/" on:click={mainHandler}>
    <img src="/assets/ACubedD-White-Transparent.png" alt="A Cubed Design Logo">
  </a>
  <div class="links">
    <a href="/" on:click={mainHandler}>About</a>
    <a href="#team" on:click={mainHandler}>Team</a>
    <a href="#contact" on:click={formHandler}>Contact</a>
  </div>
  <div class="accent-block" aria-hidden="true"></div>
  <div class="accent-block-2" aria-hidden="true"></div>
  
</header>

<style>
  header {
    background-color: hsl(282 98% 29%); 
    width: 100vw;

    display: flex;
    align-items: center;
    position: fixed;

    overflow: hidden;

    z-index: 2;

    box-shadow: rgba(0, 0, 0, 0.37) 0px 6px 12px;
  }

  header {
    height: 96px;
  }

  img {
    width: 275px;
    padding: 0 10px;
  }

  .accent-block {
    position: absolute;
    height: 330%;
    width: 30%;
    background-color: hsl(281 96% 25%);
    right: -10px;

    transform: rotate(17deg);
  }

  .accent-block-2 {
    position: absolute;
    height: 250%;
    width: 15%;
    background-color: hsl(281 94% 21%);
    margin-left: auto;
    right: -10px;

    transform: rotate(17deg);
  }

  .links {
    display: flex;
    gap: 20px;
    margin-left: auto;
    padding: 0 30px;
    z-index: 3;
  }

  @media (max-width: 950px) {
    header {
      flex-direction: column;
      padding: 1em 0;
      margin: 0 auto;
    }

    .links {
      margin: .25rem;
    }

    .links a {
      font-size: 1.25rem;
    }

    .accent-block,
    .accent-block-2 {
      display: none;
    }
  }

  a {
    color: hsl(282 98% 96%);
    text-decoration: none;
    font-size: 1.7rem;
    font-weight: 600;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: hsl(282 98% 49% / 0.8);
  }



</style>