<script>
  import { quoteStore } from "../stores";
  import { activeStore } from "../stores";

  $: activeIndex = $quoteStore.findIndex(quote => quote.id === $activeStore);
  $: type = $quoteStore[activeIndex].type;

  // this is not DRY but it will be replaced later
  const calcResult = (quantity, numTwo, type) => {
    if (type === "Addition") {
      $quoteStore[activeIndex].result = quantity + numTwo;
      return `${quantity} + ${numTwo} = ${$quoteStore[activeIndex].result}`;
    }  else if (type === "Multiplication") {
      $quoteStore[activeIndex].result = quantity * numTwo;
      return `${quantity} x ${numTwo} = ${$quoteStore[activeIndex].result}`;
    } else {
      if (numTwo === 0) return "You can't divide by zero!"
      $quoteStore[activeIndex].result = parseFloat((quantity / numTwo).toFixed(2));
      return `${quantity} / ${numTwo} = ${$quoteStore[activeIndex].result}`;
    }
  };

  $: result = calcResult(
    $quoteStore[activeIndex].quantity,
    $quoteStore[activeIndex].numTwo,
    type
  );

</script>

<div class="calc-container">
  <!-- I can probably abstract this into a component and then use it twice -->
  <label for="num-one">Operand One: </label>
  <input type="number" name="num-one" id="num-one" bind:value={$quoteStore[activeIndex].quantity}>

  <label for="num-two">Operand Two: </label>
  <input type="number" name="num-two" id="num-two" bind:value={$quoteStore[activeIndex].numTwo}>

  <p>result: {result}</p>
</div>

<style>
  .calc-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    flex-grow: 1;
    gap: 10px;

    padding-top: 24px;
  }

  label,
  input,
  p {
    font-size: 1.4em;
  }
</style>