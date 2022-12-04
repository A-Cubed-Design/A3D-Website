<script>
  import Header from "./components/Header.svelte";
  import Nav from "./components/Nav.svelte";
  import TabBody from "./components/TabBody.svelte";
  import Admin from "./components/Admin.svelte";
  import Login from "./components/Login.svelte";
  import Footer from "./components/Footer.svelte";
  import Mobile from "./components/Mobile.svelte";

  

  import { loggedInStore, emailStore } from "./stores.js";

  const testHandler = () => {
    console.log($emailStore);
  }


  let mobileUser = false;
  // if (navigator.maxTouchPoints > 0) {
  //   mobileUser = true;
  // }

  const detectMobile = () => {
    if (window.matchMedia('(min-width: 998px)').matches) {
      console.log(window.innerWidth);
      mobileUser = false
    } else {
      console.log(`Detected small width: ${window.innerWidth}`);
      mobileUser = true
    }
  }

  detectMobile();
  


</script>

<main>
  <Header/>

  

  {#if $loggedInStore && $emailStore === 'admin@email.com' || $loggedInStore && $emailStore === 'garrett@acubed.design'}
    <Admin />
  {:else if mobileUser}
    <Mobile/>
  {:else if $loggedInStore}
    <Nav/>
    <TabBody/>
  {:else}
    <Login/>
  {/if}

    <!-- {#if $loggedInStore}
    <Nav/>
    <TabBody/>
  {:else }
    <Login/>
  {/if} -->


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