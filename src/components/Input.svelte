<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  $: activeIndex = $quoteStore.findIndex(quote => quote.$id === $activeStore);
  $: type = $quoteStore[activeIndex].type;



</script>

<div class="inp-container">
  <!-- I can probably abstract this into a component and use it multiple times? also  more #fors -->
  <div class="inp">
    <label for="quantity">Quantity: </label>
    <input type="number" name="quantity" id="quantity" bind:value={$quoteStore[activeIndex].quantity} min="0" max="999" />
  </div>
  
  <div class="upload-container">
    <label for="url" id="url">Thingiverse Link to STL:</label>
    <input type="text" name="url" id="url" bind:value={$quoteStore[activeIndex].url}>
  </div>
  <form class="material-container" action="">
    <label for="material">Material:</label>

    {#if type === "FDM"}
      {#each ["PLA", "PETG", "ABS"] as material}
        <div class="material">
          <input type="radio" name="material" id={material} value={material} bind:group={$quoteStore[activeIndex].material} />
          <label for={material}>{material}</label>
        </div>
      {/each}

    {:else if type === "Resin"}
      <div class="material">
        <input type="text" name="material" id="Resin" bind:value={$quoteStore[activeIndex].material} />
      </div>

    {:else}
      <div class="material">
        <input type="radio" name="material" id="Wood" value="Wood" bind:group={$quoteStore[activeIndex].material} />
        <label for="PETG">Wood</label>
      </div>
      <div class="material">
        <input type="radio" name="material" id="Acrylic" value="Acrylic" bind:group={$quoteStore[activeIndex].material} />
        <label for="ABS">Acrylic</label>
        <!-- ask for acrylic color -->
        <label for="color">- Color: </label>
        <input type="text" name="color" id="color">
      </div>
    {/if}



  </form>

  <div class="dimensions">
    {#if type === 'FDM' || type === 'Resin'}
    <div class="dimension-inp">
      <!-- these could probably also be moved to a child component -->
      <label for="dim-h">height (mm) </label>
      <input type="number" name="dim-h" id="dim-h" bind:value={$quoteStore[activeIndex].height} min="0" max="999" />
    </div>
    {/if}
  
    <div class="dimension-inp">
      <label for="dim-w">width (mm) </label>
      <input type="number" name="dim-w" id="dim-w" bind:value={$quoteStore[activeIndex].width} min="0" max="999" />
    </div>
  
    <div class="dimension-inp">
      <label for="dim-d">depth (mm) </label>
      <input type="number" name="dim-d" id="dim-d" bind:value={$quoteStore[activeIndex].depth} min="0" max="999" />
    </div>
  </div>



  <label for="req">requirements </label>
  <textarea name="req" id="req" cols="40" rows="6" placeholder="Does the print need to be strong?" bind:value={$quoteStore[activeIndex].req}></textarea>

  <label for="desc">description </label>
  <textarea name="desc" id="desc" cols="40" rows="6" placeholder="Tell us about the print" bind:value={$quoteStore[activeIndex].desc}></textarea>
</div>

<style>
  input, 
  textarea {
    background-color: var(--my-gray);
    color: white;
    border-radius: 10px;
    /* border: hsl(285 50% 46%) 2px solid; */
    border: none;
    border: 4px solid hsl(282 98% 29%);
    resize: none;
    padding: 0 4px;
  }

  /* input[type=file] {
    border: none;
  } */

  .inp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    flex-grow: 1;
    gap: 10px;

    padding-top: 24px;
  }

  .dimension-inp {
    width: 25%;
    display: inline-block;
    margin: 0 10px;
  }

  .dimension-inp>input {
    width: 100%;
  }

  label,
  input {
    font-size: 1.4em;
  }

  input[type=radio] {
    margin-top: -6px; /* might create custom radio button because this sucks(?) */
    vertical-align: middle;
  }

  #color {
    width: 170px;
  }

  #quantity {
    width: 65px;
  }

  #stl {
    width: 400px;
  }

  .material {
    display: inline-block;
    padding: 0 12px;
    height: 40px;
  }

  textarea {
    padding: 4px;
  }
</style>