<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  // might not need these 2 lines
  $: activeIndex = $quoteStore.findIndex(quote => quote.id === $activeStore);

  const handleSummaryClick = () => {
    $activeStore = -1; // this probably isn't good
  }


  let myBool = false;
  // disable/enable the summary button based on the number of tabs
  // there might be a more direct way to do this
  $: if ($quoteStore.length === 0) {
    myBool = true;
  } else {
    myBool = false;
  }
</script>

<button disabled={myBool} on:click={handleSummaryClick}>
  Checkout
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