<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";
  import Input from "./Input.svelte";
  import SelectType from "./SelectType.svelte";
  import Summary from "./Summary.svelte";
  import TabTitle from "./TabTitle.svelte";
  import NoTab from "./NoTab.svelte";
  import OrdersView from "./OrdersView.svelte";

  $: activeIndex = $quoteStore.findIndex(quote => quote.$id === $activeStore);
  $: activeQuote = $quoteStore[activeIndex];

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this tab?")) {
      // remove the tab
      $quoteStore = $quoteStore.filter(quote => quote.$id !== $activeStore); 
      // if there are no tabs remaining, set active to -1
      if ($quoteStore.length === 0) $activeStore = -1;
      // if the just deleted tab was 0, set active to 0
      else if (activeIndex === 0) $activeStore = $quoteStore[0].$id;
      // if the just deleted tab was not 0, set active to the tab before it
      else $activeStore = $quoteStore[activeIndex - 1].$id;
    }
  }

</script>

<!-- this is a bit messy, I can probably abstract/clean it up -->
<div class="body-container">
  <!-- && is checking if (last tab deleted) vs (order submitted and set to -2) -->
  {#if $quoteStore.length === 0 && $activeStore !== -2}
    <NoTab />
  {:else if $activeStore === -1}
    <Summary />
  {:else if $activeStore === -2}
    <OrdersView />
  {:else}
    <TabTitle />
    <button id="delete" on:click={handleDelete}>delete</button>
    {#if !activeQuote.type}
      <SelectType />
    {:else}
      <p class="type">Type: { activeQuote.type }</p>
      <Input />
    {/if}
  {/if}
</div>

<style>

  .type {
    font-size: 1.4em;
    position: absolute;
  }

  .body-container {
    position: relative;
    /* background: linear-gradient(90deg, hsla(280 60% 24% / 0.35) 9%, hsla(280 70% 20% / 0.45) 90%); */
    background: linear-gradient(108deg, hsla(282 98% 29% / 1) 45%, hsla(280 94% 30% / 0.1) 45%);
    /* background-color:hsla(280 98% 30% / 0.2); */
    box-shadow: #0005 0 5px 16px;

    width: 900px;
    margin: 24px;
    padding: 20px;
    border-radius: 12px;
    

    flex-grow: 1;
    align-self: center;

    display: flex;
    flex-direction: column;

    min-height: 71vh;
  }

  #delete {
    position: absolute;
    right: 20px;
    background-color: #d13535cb;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px;
    font-size: 1.2em;
  }
</style>