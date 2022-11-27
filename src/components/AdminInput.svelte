<script>
  import { Account, Client, ID, Databases, Query } from "appwrite";
  import { quoteStore } from "../stores.js";
  // rename modelId to currentId or something similar
  export let modelId;

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e")

  const account = new Account(client);
  const databases = new Databases(client);


  // I'll refactor this later
  const updateTest = (id, formVals) => {
    let promise = databases.updateDocument(
      "6358796a8d7934bcb3cf",
      "635895eb92e44c6241b2",
      id,
      formVals)
      .then((res) => {
        console.log(res, "updated!!!");
      }, (error) => {
        if (error.code === 404) {
          // create the document
          console.log(error, "not found, creating...");
          let promise = databases.createDocument(
            "6358796a8d7934bcb3cf",
            "635895eb92e44c6241b2",
            id,
            formVals)
        }
      });
  }

  // could probably pull data differently
  let electricity;
  let grams;
  let maintenance;
  let postLaborMins;
  let designLaborMins; 
  
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // have to convert
    let json = Object.fromEntries(formData.entries());
    json.orderId = modelId.orderId;
    console.log(`model ID: ${modelId.$id}`);
    
    updateTest(modelId.$id, json);
    alert('updated values in finals table');
  }

  console.log(modelId, "model Idddd");
  // the model's "final" stats, set by the admin
  let modelFinals = {
    electricity: 0,
    grams: 0,
    maintenance: 0,
    'post-labor': 0,
    'design-time': 0,
    'markup-percentage': 0,
    'final-price': 0,
    comment: '',
    orderId: modelId.orderId,

    'electricity-cost': 0.0024,
    'gram-cost': 0.03,
    'maintenance-cost': 0.30,
    'post-labor-cost': 10.00,
    'design-labor-cost': 15.00,


  };


  const fetchAdminStats = () => {
    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "635895eb92e44c6241b2",
      [
        Query.equal('$id', modelId.$id)
      ]
    )

    promise.then((response) => {
      if (response.documents.length > 0) {
        // I can probably ignore this error(?)
        // modelFinals.orderId = response.documents[0].orderId
        modelFinals = response.documents[0];
        modelFinals['final-price'] = modelFinals['final-price'].toFixed(2);
      }
      console.log(modelFinals);

    }, (error) => {
      console.log(error);
    });
  }


  fetchAdminStats();



  let finalAmount;
  // this looks ugly but it expresses my intent easily
  $: finalAmount = (
    (modelFinals.grams * modelFinals['gram-cost']) +
    (modelFinals.electricity * modelFinals['electricity-cost']) +
    (modelFinals.maintenance * modelFinals['maintenance-cost']) + 
    (modelFinals['post-labor'] * modelFinals['post-labor-cost']) / 60 
    // (modelFinals['design-time'] * modelFinals['design-labor-cost'])
  ) * (1 + modelFinals['markup-percentage'] / 100) + 
  ((modelFinals['design-time'] * modelFinals['design-labor-cost']) / $quoteStore[0].quantity); 

  let finalDesignPrice;
  $: finalDesignPrice = (modelFinals['design-time'] * modelFinals['design-labor-cost']);  

  // I can probably shorten this?
  $: finalAmount = (Math.round(finalAmount * 100) / 100).toLocaleString('en-US', { useGrouping: false, minimumFractionDigits: 2 });
  let finalInput;

  const handleCalc = () => {
    // finalInput.value = finalAmount;
    modelFinals['final-price'] = finalAmount;
  }


  let editingCosts = false;

  const costHandler = (e) => {
    e.preventDefault();
    editingCosts = !editingCosts;
  }

  
  const testButtonHandler = () => {
    // console.log(modelFinals);
    console.log(typeof finalAmount, typeof modelFinals['final-price'], 'types');
    console.log(finalAmount)
    console.log(modelFinals['final-price'])
  }

    // values in USD*, I'll move this somewhere else(?)
    const costs = {
    gram: 0.03,
    electricityMinute: 0.0024,
    postLabor: 10.00,
    designLabor: 15.00,
    maintenance: 0.30,
    markup: 5, // *percentage
  }

  const resetCostsHandler = (e) => {
    e.preventDefault();
    modelFinals['gram-cost'] = costs.gram;
    modelFinals['electricity-cost'] = costs.electricityMinute;
    modelFinals['post-labor-cost'] = costs.postLabor;
    modelFinals['design-labor-cost'] = costs.designLabor;
    modelFinals['maintenance-cost'] = costs.maintenance;
  }




</script>
<div on:click={testButtonHandler} class="test-button">test button</div>
<!-- <button on:click={updateTest}>updateTest()</button>
<button on:click={fetchAdminStats}>query finals DB</button> -->

<form on:submit={submitHandler}>
  <button on:click={costHandler}>edit costs</button>
  <button on:click={resetCostsHandler}>reset costs</button>
  <div class="input-container">
    <label for="electricity">Print time (minutes)</label>
    <input type="number" name="electricity" id="electricity" placeholder="minutes" bind:value={modelFinals.electricity}>
    <span class="x">X</span>
    <input class:editing={editingCosts} class="costs" type="text" name="electricity-cost" id="elec-cost" bind:value={modelFinals['electricity-cost']}>
  </div>

  <div class="input-container">
    <label for="grams">Material (grams)</label>
    <input type="number" name="grams" id="grams" placeholder="grams" bind:value={modelFinals.grams}>
    <span class="x">X</span>
    <input class:editing={editingCosts} class="costs" type="text" name="gram-cost" id="gram-cost" bind:value={modelFinals['gram-cost']}>
  </div>
  
  <div class="input-container">
    <label for="">Projected maint.</label>
    <input type="number" name="maintenance" id="maintenance" bind:value={modelFinals.maintenance}>
    <span class="x">X</span>
    <input class:editing={editingCosts} class="costs" type="text" name="maintenance-cost" id="maintenance-cost" bind:value={modelFinals['maintenance-cost']}>
  </div>
  
  <div class="input-container">
    <label for="post-labor">Post print labor (mins)</label>
    <input type="number" name="post-labor" id="post-labor" placeholder="minutes" bind:value={modelFinals['post-labor']}>
    <span class="x">X</span>
    <input class:editing={editingCosts} class="costs" type="text" name="post-labor-cost" id="post-labor-cost" bind:value={modelFinals['post-labor-cost']}>
    <span id="sixty">/ 60</span>
  </div>
  
  <div class="input-container">
    <label for="design-time">Design time (hours) (per order)</label>
    <input type="number" name="design-time" id="design-time" placeholder="hours" bind:value={modelFinals['design-time']}>

    <input class:editing={editingCosts} class="costs" type="text" name="design-labor-cost" id="design-labor-cost" bind:value={modelFinals['design-labor-cost']}>
  </div>

  <div class="input-container">
    <label for="markup-percentage">Markup Percentage</label>
    <input type="number" name="markup-percentage" id="markup-percentage" placeholder="%" bind:value={modelFinals['markup-percentage']}>
    <div class="costs-placeholder"></div>
  </div>
  
  <label for="comment">Notes:</label>
  <textarea name="comment" id="comment" bind:value={modelFinals.comment}></textarea>
  
  <div class="input-container">
    <label for="total">Final Amount</label>
    <p class:alert={parseFloat(modelFinals['final-price']) !== parseFloat(finalAmount)} on:click={handleCalc} class="calc">Computed final: {finalAmount}</p>
    <input bind:this={finalInput} step=".01" type="number" name="final-price" id="final-price" bind:value={modelFinals['final-price']} >
  </div>
  
  
  <button>Submit</button>
</form>



<style>
  input {
    font-size: 1.1em;
    width: 110px;
    background-color: #333;
    color: white;
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 96%;
    margin: 3px;
  }


  button {
    border: none;
    padding: 8px;
    margin-top: 16px;
    font-size: 1.2em;
    border-radius: 10px;
  }

  * {
    font-size: 1.2em;
  }

  form {
    border-radius: 12px;
    padding: 16px;
    margin: 4px;
    background-color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    

  }

  textarea {
    width: 570px;
    height: 230px;
    background-color: #333;
    color: white;
    border-radius: 10px;
    padding: 5px;
  }

  label {
    margin-right: auto;
  }

  .costs {
    text-align: center;
    border-width: 0px;
    background-color: transparent;
    pointer-events: none;
  }

  .x {
    font-size: 40px;
    opacity: 0.6;
    margin: -0 -13px;
    font-weight: bold;
    pointer-events: none;
  }

  .editing {
    border-width: 1px;
    background-color: #333;
    pointer-events: auto;
    width: 108px;
  }

  #sixty {
    position: absolute;
    right: 110px;
    opacity: 0.7;
  }

  .costs-placeholder {
    width: 110px;
  }

  .calc {
    cursor: pointer;
    margin: 12px;
    border: 3px solid white;
    border-radius: 10px;
    padding: 4px;
  }

  /* .alert glow effect */
  .alert {
    animation: glow 1s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 5px #fff,
        0 0 10px #ff8080,
        0 0 12px #ff0000;

    }

    to {
      box-shadow: 0 0 10px #fff,
        0 0 20px #ff8080,
        0 0 25px #ff0000;

    }
  }

  /* end alert */
  
</style>