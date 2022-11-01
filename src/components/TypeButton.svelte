<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  export let type;

  const handleTypeClick = () => {
    // there has to be a better way to do this
    let activeIndex = $quoteStore.findIndex(quote => quote.$id === $activeStore);
    $quoteStore[activeIndex].type = type.name;
  };
</script>

<button on:click={handleTypeClick} style="background-image: url({type.imgUrl})">
  {type.name}
</button>

<style>
  button {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    background-color: rgba(0, 0, 0, 0.38);
    background-blend-mode: darken;

    width: 55%;
    height: 145px;
    
    border: none;
    border-radius: 8px;

    color: white;
    font-size: 32px;

    border: 7px solid hsl(282 98% 29%);
    
  }
</style>