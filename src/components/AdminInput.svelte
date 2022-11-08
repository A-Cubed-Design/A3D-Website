<script>
  import { Account, Client, ID, Databases, Query } from "appwrite";
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
    console.log(`model ID: ${modelId}`);
    
    updateTest(modelId, json);
    alert('updated values in finals table');
  }


  // the model's "final" stats, set by the admin
  let modelFinals = {
    electricity: 0,
    grams: 0,
    maintenance: 0,
    'post-labor': 0,
    'design-time': 0,
    'markup-percentage': 0,
    comment: '',
  };


  const fetchAdminStats = () => {
    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "635895eb92e44c6241b2",
      [
        Query.equal('$id', modelId)
      ]
    )

    promise.then((response) => {
      if (response.documents.length > 0) {
        // I can probably ignore this error(?)
        modelFinals = response.documents[0];
      }
      console.log(modelFinals);

    }, (error) => {
      console.log(error);
    });
  }


  fetchAdminStats();




</script>

<!-- <button on:click={updateTest}>updateTest()</button>
<button on:click={fetchAdminStats}>query finals DB</button> -->

<form on:submit={submitHandler}>
  <div class="input-container">
    <label for="electricity">Electricity (Kw/H)</label>
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