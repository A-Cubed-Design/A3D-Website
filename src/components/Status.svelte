<script>
  import { Account, Client, ID, Databases } from "appwrite";
  import { statusMap } from "../stores.js";
    import Admin from "./Admin.svelte";
  
  export let currentModel
  export let currentId;
  export let testArr;

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e");

  const databases = new Databases(client);

  
  const statusHandler = () => {

    let tempModel = currentModel;
    tempModel.$id = currentId;
    // there has to be a better way than cloning and deleting
    delete tempModel.$collectionId;
    delete tempModel.$databaseId;

    let promise = databases.updateDocument(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      currentId,
      tempModel
    );

    promise.then(
      (response) => {
        console.log(response, "updated status");
        alert("updated status to " + currentModel.status);
      },
      (error) => {
       console.log(error);
      }
    );
  }

</script>

<select bind:value={currentModel.status} name="status" id="status">status
  {#each [...statusMap] as [key, value]}
    <option value={key}>{value}</option>
  {/each}
  <!-- <option value="">-Select status-</option>
  <option value="order placed">Order placed</option>
  <option value="quote in progress">Quote in progress</option>
  <option value="quote sent">Quote sent</option>
  <option value="quote approved">Quote approved</option>
  <option value="in printing">In printing</option>
  <option value="awaiting payment">Awaiting Payment</option>
  <option value="shipped">Shipped</option>
  <option value="cancelled">Cancelled</option> -->
</select>

<button on:click={statusHandler}>update status</button>

<style>
  select {
    color: white;
    background-color: #555;
    font-size: 18px;
  }

  button, 
  select {
    font-size: 18px;
    margin: 0 6px;
  }
</style>