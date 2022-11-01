<script>
  export let quote;
  import { activeStore } from "../stores";

  const handleTabClick = () => $activeStore = quote.$id;
</script>

<button on:click={handleTabClick} class:active={$activeStore === quote.$id}>
  {quote.title}
</button>

<style>
  button {
    background-color: transparent;
    border: 2px solid var(--my-gray);
    color: white;
    height: 84%;
    font-size: 1.2em;
    border-bottom: none;
    margin: 0 4px;
    padding: 0 14px;
    border-radius: 12px 12px 0 0;
  }

  .active{
    background-color: var(--my-gray);
    position: relative;
  } 

  /* I didn't write the CSS below here */
  .active:before,
  .active:after {
    content: "";
    position: absolute;

    height: 10px;
    width: 20px;

    bottom: 0;
  }

  .active:after {
    right: -20px;

    border-radius: 0 0 0 10px;
    box-shadow: -10px 0 0 0 var(--my-gray);
  }

  .active:before {
    left: -20px;

    border-radius: 0 0 10px 0;
    box-shadow: 10px 0 0 0 var(--my-gray);
  }
</style>