<script>
  import { Account, Client, ID, Databases, Query } from "appwrite";
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
      }
      console.log(modelFinals);

    }, (error) => {
      console.log(error);
    });
  }


  fetchAdminStats();

  // values in USD
  const costs = {
    gram: 0.03,
    electricityMinute: 0.0024,
    postLabor: 10.00,
    designLabor: 15.00,
    maintenance: 0.30,
  }

  let finalAmount;
  // this looks ugly but it expresses my intent easily
  $: finalAmount = (
    (modelFinals.grams * costs.gram) +
    (modelFinals.electricity * costs.electricityMinute) +
    (modelFinals['post-labor'] * costs.postLabor) / 60 +
    (modelFinals['design-time'] * costs.designLabor) +
    (modelFinals.maintenance * costs.maintenance)
  ) * (1 + modelFinals['markup-percentage'] / 100); 

  // I can probably shorten this?
  $: finalAmount = (Math.round(finalAmount * 100) / 100).toLocaleString('en-US', { useGrouping: false, minimumFractionDigits: 2 });
  let finalInput;

  const handleCalc = () => {
    finalInput.value = finalAmount;
  }
</script>

<!-- <button on:click={updateTest}>updateTest()</button>
<button on:click={fetchAdminStats}>query finals DB</button> -->

<form on:submit={submitHandler}>
  <div class="input-container">
    <label for="electricity">Print time (minutes)</label>
    <input type="number" name="electricity" id="electricity" placeholder="minutes" bind:value={modelFinals.electricity}>
  </div>

  <div class="input-container">
    <label for="grams">Material (grams)</label>
    <input type="number" name="grams" id="grams" placeholder="grams" bind:value={modelFinals.grams}>
  </div>
  
  <div class="input-container">
    <label for="">Projected maint.</label>
    <input type="number" name="maintenance" id="maintenance" bind:value={modelFinals.maintenance}>
  </div>
  
  <div class="input-container">
    <label for="post-labor">Post print labor (mins)</label>
    <input type="number" name="post-labor" id="post-labor" placeholder="minutes" bind:value={modelFinals['post-labor']}>
  </div>
  
  <div class="input-container">
    <label for="design-time">Design time (hours)</label>
    <input type="number" name="design-time" id="design-time" placeholder="hours" bind:value={modelFinals['design-time']}>
  </div>

  <div class="input-container">
    <label for="markup-percentage">Markup Percentage</label>
    <input type="number" name="markup-percentage" id="markup-percentage" placeholder="%" bind:value={modelFinals['markup-percentage']}>
  </div>
  
  <label for="comment">Notes:</label>
  <textarea name="comment" id="comment" bind:value={modelFinals.comment}></textarea>
  
  <div class="input-container">
    <label for="total">Final Amount</label>
    <p on:click={handleCalc}>calc'd final: {finalAmount}</p>
    <input bind:this={finalInput} step=".01" type="number" name="final-price" id="final-price" bind:value={modelFinals['final-price']} >
  </div>
  
  
  <button>Submit</button>
</form>



<style>
  input {
    font-size: 1.1em;
    width: 120px;
    background-color: #333;
    color: white;
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-between;
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
</style>