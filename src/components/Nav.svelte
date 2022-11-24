<script>
  import { ID } from "appwrite";
  import { v4 as uuidv4 } from "uuid";
  import { quoteStore } from "../stores";
  import { currentIdStore } from "../stores";
  import { activeStore } from "../stores";
  import Tab from "./Tab.svelte";

  const handleNewTabClick = () => {
    quoteStore.update((current) => {
      return [...current, quoteFactory()]
    })
    activeStore.set($quoteStore.at(-1).$id)
  }

  // I feel like this should be in a seperate file like storesLogic.js?
  const quoteFactory = () => {
    const newQuote = {
      title: `New Tab`,
      $id: uuidv4(),

      type: null,
      material: '',

      quantity: 0,
      height: 0,
      width: 0,
      depth: 0,

      description: '',
      requirements: '',
      url: '',
      address: '',
      status: 0,
    }
    return newQuote;
  }

  $: console.log('the active tab is: ' + $activeStore)
</script>

<nav>
  {#each $quoteStore as quote (quote.$id)}
    <Tab {quote} />
  {/each}
  <button on:click={handleNewTabClick}>+</button>
</nav>


<style>
  nav {
    height: 56px;
    
    background-color: var(--my-dark-gray);

    display: flex;
    align-items: flex-end;
  }

  button {
    height: 84%;
    background: none;
    border: none;
    color: white;
    font-size: 2.1em;
    font-weight: bold;
    padding: 0px 6px;
  }
</style>