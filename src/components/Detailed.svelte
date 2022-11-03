<script>
  import { createEventDispatcher } from 'svelte';
  import { Account, Client, Databases, Query } from 'appwrite';
  import AdminInput from './AdminInput.svelte';
  import Status from './Status.svelte';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  
  const client = new Client()
    .setEndpoint('https://api.acubed.design/v1')
    .setProject('6357477339689685568e');

  const databases = new Databases(client);


  export let myArr;

  // let detailedView = false;

  const dispatch = createEventDispatcher();


  const toggleDetailedView = () => {
    dispatch('toggleDetailedView');
  }


  // const handleEditForm = (e) => {
  //   console.log(e.target.getAttribute('data-id'));
  //   fetchModelData(e.target.getAttribute('data-id'));
  // }

  let modelView = false;
  let currentModel = {};


  const fetchModelData = (e) => {
    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      [
        Query.equal('$id', e.target.getAttribute('data-id'))
      ]
    )

    promise.then((response) => {
      console.log(response, "fetch details");
      modelView = !modelView;
      currentModel = response.documents[0]; // there has to be a better way to unpack
    }, (error) => {
      console.log(error);
    });


  }

  const handleBackModel = () => {
    modelView = !modelView;
    checkIfCompleted();
  }




  let completedIds = [];

  const checkIfCompleted = () => {
    // check if model is present in the "finals" table
    // show green check if it is
    // show red x if it isn't

    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "635895eb92e44c6241b2",
    )

    promise.then((response) => {
      response.documents.forEach((doc) => {
        completedIds = [...completedIds, doc.$id]; // spread better for svelte?
      })
      console.log(completedIds);
    }, (error) => {
      console.log(error);
    });
    
  }

  checkIfCompleted();



const testArr = writable(myArr);
console.log($testArr, "testArr");





  const changeAllStatus = (status) => {
    myArr.forEach((model) => {
      model.status = status;
    })
    myArr = [...myArr];
  }

  
  let allStatusSelector;
  


</script>


<div class="detailed-view">
{#if !modelView}
  <!-- <button on:click={checkIfCompleted}>check who is finished</button> -->
  <p class="title">Order 
    {(myArr[0].orderId.slice(-6).toUpperCase())}
  </p>
  <button on:click={toggleDetailedView} class="back">back</button>
  <button on:click={() => console.log(myArr)}>console</button>
  
  <select bind:this={allStatusSelector} name="status" id="status">status
    <option value="">-Select status-</option>
    <option value="order placed">Order placed</option>
    <option value="quote in progress">Quote in Progress</option>
    <option value="quote sent">Quote sent</option>
    <option value="quote approved">Quote approved</option>
    <option value="in printing">In printing</option>
    <option value="awaiting payment">Awaiting Payment</option>
    <option value="shipped">Shipped</option>
  </select>
  <button on:click={() => {changeAllStatus(allStatusSelector.value)}}>change all status</button>
  
    {#each myArr as quote}
    <div class="quote">
      <p class="model-title">{quote.title}</p>
      <button data-id={quote.$id} on:click={fetchModelData}>click me to edit</button>
      <Status {testArr} currentModel={quote} currentId={quote.$id}/>
      {#if completedIds.includes(quote.$id)}
        <div class="check">✓</div>
      {/if}
    </div>
    {/each}
    {:else}
    <button class="back" on:click={handleBackModel}>back</button>
    <p class="title">{currentModel.title}</p>
    <p>Type: {currentModel.type}</p>
    <p>Material: {currentModel.material}</p>
    <p>Quantity: {currentModel.quantity}</p>
    
    <div class="dimensions">
      height: {currentModel.height}mm width: {currentModel.width}mm 
      {#if currentModel.type !== "Laser"}
        length: {currentModel.depth}mm
      {/if}
    </div>

    <!-- I really shouldn't have to pass in this many things -->
    <Status {currentModel} currentId={currentModel.$id} {testArr}/>
    
    <p>Email: {currentModel.email}</p>
    <p>Order ID: {currentModel.orderId}</p>
    <p>Model ID: {currentModel.$id}</p>
    
    <p>Requirements: {currentModel.requirements}</p>
    <p>Description: {currentModel.description}</p>

    <p>URL: <a target="_blank" href={currentModel.url}>Thingiverse Link</a></p>
    
    <AdminInput modelId={currentModel.$id}/>
  {/if}
    
  </div>




<style>
  .detailed-view {
    background-color: #333;
    width: 90vw;
    min-height: 70vh;
    border-radius: 12px;
    margin: 12px auto;
    padding: 12px;
  }
  
  .quote {
    display: flex;
    
    align-items: center;
    margin: 3px;
  }

  button {
    display: inline-block;
  }

  .model-title {
    display: inline;
  }

  .back {
    padding: 6px;
    margin: 4px;
    font-size: 1.2em;
    position: absolute;
    right: 70px;
  }

  .title {
    font-size: 1.7em;
    font-weight: bold;
    margin-bottom: 6px;
  }

  button {
    padding: 5px;
    border: none;
    margin: 3px;
    font-size: 18px;
  }

  .model-title {
    font-size: 20px;
    padding: 3px;
    min-width: 120px;
  }

  .check {
    color: green;
    font-size: 32px;
  }
</style>