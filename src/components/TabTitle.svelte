<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  $: activeIndex = $quoteStore.findIndex(quote => quote.$id === $activeStore);
  $: bodyTitle = $activeStore != -1 ? $quoteStore[activeIndex].title : "Summary";
  // "summary" never displays because I'm not using it in the markup when the summary comp loads
  let editing = false;

  
  // I doubt this is the best way to set edit to false on tab change
  $: if (activeIndex != -1) editing = false;

  const handleEdit = () => editing = !editing;

  // I bet this would be simpler if I used a label instead of a button
  const onEnter = (e) => {if (e.key === "Enter") editing = false}

  // could probably just do this in the markup
  const blurHandler = () => {editing = false}
</script>

<h2>
  {#if !editing}
    {bodyTitle}
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input on:blur={blurHandler} on:keypress={onEnter} id="title" type="text" bind:value={$quoteStore[activeIndex].title} autofocus>
  {/if}
  <button class="edit-button" on:click={handleEdit}>edit</button>
  <!-- <label for="title" class="edit-button" on:click={handleEdit}>edit</label> -->
</h2>

<style>
  /* this should be a div intead of an h2? */
  h2 {
    position: relative;
    margin: 0 auto;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }

  input {
    width: 260px;
    font-size: 26px;
    background-color: var(--my-gray);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 4px;
    text-align: center;
    border: 4px solid hsl(282 98% 29%);;
  }

  .edit-button {
    position: absolute;
    right: -52px;
    background-color: transparent;
    color: white;
    border: 3px solid white;
    border-radius: 8px;
    font-size: 18px;
    padding: 0 4px;
  }

  .edit-button:hover {
    background-color: white;
    color: rgb(var(--primary));
  }
</style>