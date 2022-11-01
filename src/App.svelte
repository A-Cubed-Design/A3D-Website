<script>
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import TabBody from "./components/TabBody.svelte";
  import Footer from "./components/Footer.svelte";

  import Login from "./components/Login.svelte";

  import { loggedInStore } from "./stores.js";


  // let loggedIn = false;

  // const handleMessage = (event) => {
  //   console.log(event.detail, "event detail");
  //   loggedIn = true;
  // }
</script>

<main>
  <Header/>

  
  {#if $loggedInStore}
    <Nav/>
    <TabBody/>
  {:else }
    <Login />
  {/if}

  <Footer/>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    overflow-x: hidden;
  }

</style>