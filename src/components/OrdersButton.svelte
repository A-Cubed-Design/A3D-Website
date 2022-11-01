<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  $: activeIndex = $quoteStore.findIndex(quote => quote.id === $activeStore);

  const handleOrdersClick = () => {
    $activeStore = -2; // this is getting worse
  }


</script>

<button on:click={handleOrdersClick}>
  Past Orders
</button>

<style>
  button {
    color: white;
    background-color: transparent;

    border: 3px solid white;
    border-radius: 8px;
    font-size: 1.4em;
    right: 22px;
    padding: 8px;
    z-index: 2;
    transition: background-color 0.5s, color 0.6s;


    margin-right: 2rem;
  }

  button:hover {
    background-color: white;
    color: rgb(var(--primary));
  }

  button:disabled {
    background-color: transparent;
    color: #888;
    border: #777 3px solid;
  }
</style>