<script>
  import { createEventDispatcher } from 'svelte';
  import { Account, Client, Databases, Functions, Query, Storage } from 'appwrite';
  import AdminInput from './AdminInput.svelte';
  import Status from './Status.svelte';
  import Pdf from './Pdf.svelte'
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { statusMap, quoteStore } from '../stores.js';
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
      $quoteStore[0] = currentModel;
    }, (error) => {
      console.log(error);
    });


  }

  const handleBackModel = () => {
    editing = false;
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
  const submitAllStatus = async () => {


    // myArr.forEach( async (model) => {
    //   let tempModel = model;
      
    //   tempModel.$id = model.$id;
    //   // don't need to upload these
    //   delete tempModel.$collectionId;
    //   delete tempModel.$databaseId;
    //   delete tempModel.finalPrice;

    //   // this can't be good
    //   await new Promise(r => setTimeout(r, 200));

    //   await databases.updateDocument(
    //     "6358796a8d7934bcb3cf",
    //     "63587d34102e1c615923",
    //     model.$id,
    //     tempModel
    //   )

    //   .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error, 'testerr');
    //   });
    // })

    for (const model of myArr) {
      let tempModel = model;
      
      tempModel.$id = model.$id;
      // don't need to upload these
      delete tempModel.$collectionId;
      delete tempModel.$databaseId;
      delete tempModel.finalPrice;

      // this can't be good
      // await new Promise(r => setTimeout(r, 200));

      await databases.updateDocument(
        "6358796a8d7934bcb3cf",
        "63587d34102e1c615923",
        model.$id,
        tempModel
      )

      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error, 'testerr');
      });
    }


    alert("All statuses updated!");

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
      { quantity: currentModel.quantity,
        type: currentModel.type,
        material: currentModel.material,
        depth: currentModel.depth,
        width: currentModel.width,
        height: currentModel.height,
        url: currentModel.url,
      }
    )

    promise.then((response) => {
      alert('updated')
      console.log(response);
    }, (error) => {
      alert('error')
      console.log(error);

    });

  }


  let editing = false;

  const editHandler = () => {
    editing = !editing;
  }

  

  const orderRows = [
    [
    'model-title', 
    'model-quantity', 
    'model-final-price',
    'model-type', 
    'model-material', 
    'model-status',
    'model-height', 
    'model-width', 
    'model-depth',
    'model-url',
    'model-description',
    'model-requirements',
    'model-id',
    'order-id',
    'order-email',
    'order-address',
  ],
  ];

  // let csvContent = "data:text/csv;charset=utf-8,";

  myArr.forEach(obj => {
    // use statusMap to convert number to string
    let statusString = statusMap.get(obj.status);
    let tempAddress = obj.address.replace(/(\r\n|\n|\r)/gm, " ");
    let tempRow = [
      obj.title,
      obj.quantity,
      obj['final-price'],
      obj.type,
      obj.material,
      statusString,
      obj.height,
      obj.width,
      obj.depth,
      obj.url,
      obj.description,
      obj.requirements,
      obj.$id,
      obj.orderId,
      obj.email,
      tempAddress,
    ];
    orderRows.push(tempRow);
  })

  const generateCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8," + orderRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    return encodedUri;
  }

  // window.open(encodedUri);
  let encodedUri = generateCsv();
</script>

<a href={encodedUri}>anchor link</a>


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
    <button on:click={editHandler}>Edit values</button>

    {#if editing} 
      <button class="update" on:click={updateQuantityHandler}>Submit values</button>
    {/if}
    <div class="inp-container">
      <span>Type:</span>
      {#if editing}
        <select bind:value={currentModel.type} name="type" id="type">
          <option value="FDM">FDM</option>
          <option value="Resin">Resin</option>
          <option value="Laser">Laser</option>
        </select>
      {:else}
        <span>{currentModel.type}</span>
      {/if}
    </div>
    <div class="inp-container">
      <label for="material">Material:</label>
      <input class:editable={editing} type="text" bind:value={currentModel.material} name="material" id="material">
    </div>
    
    <div class="inp-container">
      <label for="quantity">Quantity: </label>
      <input class:editable={editing} type="number" name="quantity" id="quantity" bind:value={currentModel.quantity}>
    </div>
    
    <div class="dimensions">
      <label for="length">Length: </label>
      <input class:editable={editing} type="text" name="length" id="length" bind:value={currentModel.depth}>
      <span>mm</span>
      <label for="width">Width: </label>
      <input class:editable={editing} type="text" name="width" id="width" bind:value={currentModel.width}>
      <span>mm</span>
      {#if currentModel.type !== "Laser"}
        <label for="height">Height:</label>
        <input class:editable={editing} type="text" name="height" id="height" bind:value={currentModel.height}>
        <span>mm</span>
      {/if}
    </div>

    <!-- I really shouldn't have to pass in this many things -->
    
    <p>Email: {currentModel.email}</p>
    <p>Order ID: {currentModel.orderId}</p>
    <p>Model ID: {currentModel.$id}</p>
    
    <p>Requirements: {currentModel.requirements}</p>
    <p>Description: {currentModel.description}</p>
    
    <div class="inp-container">
      <label for="url">URL: </label>
      {#if editing}
        <input class:editable={editing} type="text" name="url" id="url" bind:value={currentModel.url}>
      {:else}
        <a href={currentModel.url}>{currentModel.url}</a>
      {/if}
    </div>
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



  
  .inp-container {
    display: flex;
    gap: 10px;
  }

  input {
    width: 70px;
    font-size: 1em;
    color: white;
    margin: 2px;
    border-width: 0px;
    pointer-events: none;
    background-color: transparent;
  }

  #url {
    width: 420px;
  }

  .dimensions > input {
    width: 50px;
    text-align: right;
  }

  .dimensions > span {
    margin-right: 12px;
    position: relative;
    left: -4px;
  }


  .editable {
    pointer-events: auto; 
    border-width: 2px;
    background-color: #444;
  }
</style>