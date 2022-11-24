<script>
  import { createEventDispatcher } from 'svelte';
  import { Account, Client, Databases, Functions, Query, Storage } from 'appwrite';
  import AdminInput from './AdminInput.svelte';
  import Status from './Status.svelte';
  import Pdf from './Pdf.svelte'
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { statusMap } from '../stores.js';
    import { bubble } from 'svelte/internal';
  
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

  const deleteDispatcher = () => {
    dispatch('toggleFromDelete', { orderId: myArr[0].orderId });
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
      console.log(model);
      model.status = parseInt(allStatusSelector.value);
    })
    myArr = [...myArr];
  }

  
  let allStatusSelector;


   // can this even be abstracted to tatus.svelte?
  const submitAllStatus = () => {


    myArr.forEach((model) => {
      let tempModel = model;
      
      tempModel.$id = model.$id;
      delete tempModel.$collectionId;
      delete tempModel.$databaseId;


      let promise = databases.updateDocument(
        "6358796a8d7934bcb3cf",
        "63587d34102e1c615923",
        model.$id,
        tempModel
      )

      promise.then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    })

    alert('updated all statuses');

}

const functions = new Functions(client);

const handleSendEmail = () => {
  let confirm = window.confirm("Are you sure you want to send an email?");
  if (confirm) {
    // sendEmail();
    console.log("attempted server function execution");

    let promise = functions.createExecution("636d290363018a943afe", JSON.stringify(myArr));

    promise.then((response) => {
      console.log(response, "triggering server func 01");
    }, (error) => {
      console.log(error, "triggering servre func 02");
    });
  }
}

const deleteHandler = () => {
  let confirm = window.confirm("Are you sure you want to delete the entire order?");
  if (!confirm) return;
  const toDeleteList = myArr.map(a => a.$id);
  console.log(toDeleteList);

  toDeleteList.forEach((id) => {
    let promise = databases.deleteDocument(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      id
    )

    promise.then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  })

  // change view to zoom admin out after deletion
  deleteDispatcher();


}



const updateQuantityHandler = () => {
    let confirm = window.confirm("Are you sure you want to update the quantity?");
    if (!confirm) return;
    
    let promise = databases.updateDocument(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      currentModel.$id,
      { quantity: currentModel.quantity }
    )

    promise.then((response) => {
      alert('updated')
      console.log(response);
    }, (error) => {
      alert('error')
      console.log(error);

    });

  }

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
    {#each [...statusMap] as [key, value]}
      <option value={key}>{value}</option>
    {/each}
  </select>
  <button on:click={() => {changeAllStatus(allStatusSelector.value)}}>change all status</button>
  <button on:click={submitAllStatus}>submit all status</button>
  <button on:click={deleteHandler} class="delete">Delete Entire Order!</button>
  
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
    <button class="send-email" on:click={handleSendEmail}>send invoice email</button>
    <Pdf currentOrder={myArr} />
    {:else}
    <button class="back" on:click={handleBackModel}>back</button>
    <p class="title">{currentModel.title}</p>
    <p>Type: {currentModel.type}</p>
    <p>Material: {currentModel.material}</p>
    <label for="quantity">Quantity: </label>
    <input type="number" name="quantity" id="quantity" bind:value={currentModel.quantity}>
    
    <div class="dimensions">
      height: {currentModel.height}mm width: {currentModel.width}mm 
      {#if currentModel.type !== "Laser"}
        length: {currentModel.depth}mm
      {/if}
    </div>

    <!-- I really shouldn't have to pass in this many things -->
    
    <p>Email: {currentModel.email}</p>
    <p>Order ID: {currentModel.orderId}</p>
    <p>Model ID: {currentModel.$id}</p>
    
    <p>Requirements: {currentModel.requirements}</p>
    <p>Description: {currentModel.description}</p>
    
    <p>URL: <a target="_blank" href={currentModel.url}>Thingiverse Link</a></p>
    <button class="update" on:click={updateQuantityHandler}>Update Values</button>
    <div id="status-wrapper">
      <Status {currentModel} currentId={currentModel.$id} {testArr}/>
    </div>
    
    <AdminInput modelId={currentModel}/>
  {/if}
    
  </div>




<style>
  .detailed-view {
    background-color: #333;
    max-width: 80vw;
    min-height: 70vh;
    border-radius: 12px;
    margin: 12px auto;
    padding: 12px;
    position: relative;
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
    right: 50px;
    top: 30px;
    border-radius: 4px;
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

  .send-email {
    border-radius: 7px;
    padding: 9px;
    margin: 8px;
    font-size: 1.2em;
    font-weight: bold;
    background-color: #a12;
  }

  .delete {
    background-color: rgb(182, 94, 72);
    border-radius: 8px;
  }

  #status-wrapper {
    margin: 12px;
  }
</style>