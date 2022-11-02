<script>
  import SummaryButton from "./SummaryButton.svelte";
  import LogOutButton from "./LogOutButton.svelte";
  import { loggedInStore, emailStore } from "../stores.js";
  import OrdersButton from "./OrdersButton.svelte";


</script>

<header>
  <img src="./assets/ACubedLogo.png" alt="A Cubed Design Logo">
  <h1>Quoting Tool</h1>
  <div class="accent-block" aria-hidden="true"></div>
  <div class="accent-block-2" aria-hidden="true"></div>
  
  <LogOutButton />
  {#if $emailStore === "admin@email.com"}
  <p>.</p>
  {:else}
    <SummaryButton />
    <OrdersButton />
  {/if}

</header>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

  header {
    background-color: hsl(282 98% 29%); 
    width: 100vw;

    display: flex;
    align-items: center;
    position: relative;

    overflow: hidden;
    font-family: poppins, sans-serif;
  }

  header {
    height: 96px;
  }

  img {
    height: 160%;
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

</style>