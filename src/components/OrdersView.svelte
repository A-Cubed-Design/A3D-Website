<script>
  import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
  import { loggedInStore, quoteStore, emailStore } from "../stores";
  import { activeStore } from "../stores";
  import { statusMap } from "../stores";
  import { onMount } from "svelte";
  import NoTab from "./NoTab.svelte";
    import Admin from "./Admin.svelte";
    import AdminInput from "./AdminInput.svelte";

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e");

  const databases = new Databases(client);

  let orderIds = [];
  let pdfView = false;

  // save orderIds to local storage so there isn't a loading delay
  const saveOrderIds = () => {
    localStorage.setItem("orderIds", JSON.stringify(orderIds));
  };

  // get orderIds from local storage
  const getOrderIds = () => {
    if (localStorage.getItem("orderIds") === null) {
      localStorage.setItem("orderIds", JSON.stringify([]));
    } else {
      orderIds = JSON.parse(localStorage.getItem("orderIds"));
    }
  };

  // this can't be the simplest way to stop <NoTab/> from flashing
  getOrderIds();


  onMount(async () => {
    // $activeStore = -1;
    const response = await databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923"
    );

    // clearing might not be needed if I use stores
    orderIds = [];
    // this is probably not good
    let allDocs = response.documents;
    allDocs.forEach((quote) => {
      if (!orderIds.includes(quote.orderId)) {
        orderIds = [...orderIds, quote.orderId];
      }
    });
    console.log(orderIds);
    saveOrderIds();
  });


  const sliceOrderId = (orderId) => {
    return orderId.slice(-6).toUpperCase();
  };

  let detailedOrderView = false;
  // should these be $: ?
  // this doesn't seem simple
  let currentOrder = [];
  let orderDate = "";
  let currentId = "";
  let currentAddress = "";
  let currentStatus = "";

  const handleOrderClick = (e) => {
    console.log(e.target.getAttribute('data-id'))

    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      [
        Query.equal('orderId', e.target.getAttribute('data-id'))
      ]
    );

    promise.then(function (response) {
        console.log(response);
        currentOrder = response.documents;
        orderDate = response.documents[0].$createdAt;
        currentId = sliceOrderId(response.documents[0].orderId)
        currentAddress = response.documents[0].address
        currentStatus = response.documents[0].status
    }, function (error) {
        console.log(error, 'err1');
    });

    detailedOrderView = true;
  }




  const fetchOrderDetails = async (orderId) => {
    let promise = await databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      [
        Query.equal('orderId', orderId)
      ]
    );

    console.log(promise, "fetchOrderDetails");
    return promise.documents
    // promise.then(function (response) {
    // }, function (error) {
    //     console.log(error);
    // });
  }

  const cancelHandler = async (e) => {
    // ask user to confirm
    if (currentOrder[0].status !== 'order placed') {
      alert('This order has already been processed and cannot be cancelled. Email Support if you still need to cancel.')
      return
    }
    if(!window.confirm("Are you sure you want to cancel this order?")) return; // this one liner is probably fine
    console.log(currentOrder, "orderIds/currentORder");
    let promise = await databases.updateDocument(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      currentOrder[0].$id,
      { status: "cancelled" }
    );

    console.log(promise, "cancelHandler");
    detailedOrderView = false;
  }
  
  let disabled = false;


  let embedTest;
  let hObj;
  let ifr;


  const storage = new Storage(client);

  const fetchPdf = async () => {
    
    
    const promise = await storage.listFiles('637295af44c1cf054df6');
    let fileData = promise.files;
    console.log(fileData, 'promisePDF.listFiles()');
    
    let shortOrderId = currentOrder[0].orderId.slice(-6).toUpperCase();
    console.log(shortOrderId, 'currentOrder[0].orderId');
    
    // later I can add functionality so it only grabs the most recent obj with the same orderId
    // as a double check or alternate way to handle the figuring out the most recent pdf
    let pdfObj = fileData.find((obj) => {
      return obj.name.slice(-10, -4).toUpperCase() === shortOrderId;
    });
    
    console.log(pdfObj.$id, 'pdfObj');
    
    
    
    
    pdfView = true;
    let result = await storage.getFileView('637295af44c1cf054df6', pdfObj.$id);
    console.log(result.href, 'result.href...');
    ifr.src = result.href;

    // convert the pdf to stream
    let pdfStream = await fetch(result.href);
    console.log(pdfStream, 'pdfStream');








    // let response = await fetch('https://api.acubed.design/v1/storage/buckets/637295af44c1cf054df6/files/637bfca382bbc684fa1d/download?project=6357477339689685568e');
    // let blob = await response.blob();
    // let metadata = {
    //   type: 'application/pdf'
    // };
    // let file = new File([blob], 'test.pdf', metadata);
    // // convert to URI
    // let fileURL = URL.createObjectURL(file);

    // console.log(response, 'fetched response');



  }


  

  const statusMapbackup = new Map([
    ["cancelled", -1],
    ["order placed", 0],
    ["quote in progress", 1],
    ["quote sent", 2],
    ["quote approved", 3],
    ["in printing", 4],
    ["awaiting payment", 5],
    ["shipped", 6],
  ]);




  // const getLowestStatus = (order) => {
  //   console.log(order, 'converted order');
  //   let lowestStatus = 7;
  //   order.forEach((quote) => {
  //     console.log(quote.status, 'quote.status() or something')
  //     if (quote.status == 3) {
  //       return statusMap.get(3)
  //     } else if (quote.status === 4) {
  //       return statusMap.get(4)
  //     } 
  //     else if (quote.status < lowestStatus) {
  //       lowestStatus = quote.status;

  //     }
  //   });
  //   return statusMap.get(lowestStatus);
  // };

  const getLowestStatus = (order) => {
    let lowestState = 7;
    let userState = 0;
    order.forEach((quote) => {
      if (quote.status == 3) {
        userState = 3;
      } 
      else if (quote.status == 4) {
        userState = 4;
      } else if (quote.status <= lowestState) {
        lowestState = quote.status;
      }
       
    });
    // return statusMap.get(lowestState);

    if (userState) {
      return statusMap.get(userState);
    } else {
      return statusMap.get(lowestState);
    }
  };
  


  const approveHandler = async () =>{

    for (const model of currentOrder) {
      console.log(model, 'model');
      await databases.updateDocument(
        "6358796a8d7934bcb3cf",
        "63587d34102e1c615923",
        model.$id,
        { status: 4 }
      )

      .then(function (response) {
        console.log(response, 'denyHandler');
        currentStatus = 4;
        // call make.com server function here to alert slack, without an attached reason
      }, function (error) {
        console.log(error);
      });
    }

    // let tempPromise = databases.updateDocument(
    //   "6358796a8d7934bcb3cf",
    //   "63587d34102e1c615923",
    //   currentOrder[0].$id,
    //   { status: 4 }
    // );

    // tempPromise.then(function (response) {
    //   console.log(response, 'approveHandler');
    //   currentStatus = 4;
    //   // call make.com server function here to alert slack, sometimes with an attached reason
    // }, function (error) {
    //   console.log(error);
    // });


    // currentOrder.forEach( (quote) => {
    //   console.log(quote.$id, 'approve handler loop')

    //   quote.status = 3;
    //   currentStatus = 3;
    //   delete quote.$collectionId;
    //   delete quote.$databaseId;

    //   let temp = databases.updateDocument(
    //     "6358796a8d7934bcb3cf",
    //     "63587d34102e1c615923",
    //     quote.$id,
    //     quote,
    //   );

    //   temp.then(function (response) {
    //     console.log(response, 'approveHandler');
    //   }, function (error) {
    //     console.log(error);
    //   });
      


    // });
  }

  const denyHandler = async () => {

    let modifyReason = prompt("Please enter a reason for denying this order");
    // if (modifyReason === null) return;

    for (const model of currentOrder) {
      console.log(model, 'model');
      await databases.updateDocument(
        "6358796a8d7934bcb3cf",
        "63587d34102e1c615923",
        model.$id,
        { status: 3 }
      )

      .then(function (response) {
        console.log(response, 'denyHandler');
        currentStatus = 3;
        // call make.com server function here to alert slack, with an attached reason (sometimes (NONE_GIVEN))
      }, function (error) {
        console.log(error);
      });
    }
    
    // let tempPromise = databases.updateDocument(
    //   "6358796a8d7934bcb3cf",
    //   "63587d34102e1c615923",
    //   currentOrder[0].$id,
    //   { status: 3 }
    //   );
      
    //   tempPromise.then(function (response) {
    //     console.log(response, 'denyHandler');
    //     currentStatus = 3;
    //     // then pass in the reason to the make.com server function
    // }, function (error) {
    //   console.log(error);
    // });
  }


</script>

<!-- {#each [...statusMap] as [key, value]}
    <div class="status-text">
      {key} {value}
    </div>
{/each} -->

<!-- this flashes in for a second because orderIds doesn't have a length until queried -->
<h1 id="view-title">Orders:</h1>
<h2>{$emailStore}</h2>
{#if (orderIds.length === 0)}

  <h2>You have no orders.</h2>
  <NoTab />
{/if}



{#if detailedOrderView}
<div class="order-container">
  <!-- I should probably use a table? -->
  {#if currentStatus === 2}
    <div class="alert">
      <span>!</span>
      <div>Awaiting Quote Response</div>
    </div>
  {/if}
  <h2>Order Details</h2>
  <h2>{$emailStore}</h2>
  <button class="back-btn" on:click={() => detailedOrderView = false}>Back</button>
  <!-- making a second line-item div for the header row probably isn't good -->
    <div class="line-item guide">
      <p class="title">Title</p>
      <p class="type">Type</p>
      <p class="material">Mat</p>
      <p class="height">H</p>
      <p class="width">W</p>
      <p class="depth">D</p>
      <p class="link">link</p>
      <p>#</p>
    </div>

    {#each currentOrder as quote}
    <div class="line-item">
      <p class="title">{quote.title}</p>
      <p class="type">{quote.type}</p>
      <p class="material">{quote.material}</p>
      <p class="height">{quote.height}</p>
      <p class="width">{quote.width}</p>
      <p class="depth">{quote.depth}</p>
      <a class="link" href={quote.url} target="_blank">STL link</a>
      <p>{quote.quantity}</p>
    </div>
    {/each}
    <div class="order-details">
      <div class="details-line-item">
        <p>Order ID:</p>
        <p>{currentId}</p>
      </div>

      <div class="details-line-item">
        <p>Order Date:</p>
        <p>{orderDate.slice(0, 10)}</p>
      </div>

      <div class="details-line-item">
        <p>total models:</p>
        <p>{currentOrder.reduce((accum, obj) => accum += obj.quantity, 0)}</p>
      </div>

      <div class="details-line-item">
        <p>Order Status:</p>
        <p>{currentStatus}</p>
      </div>

      <div class="details-line-item">
        <p>unique models: </p>
        <p>{currentOrder.length}</p>
      </div>
    </div>
    <p class="address-title">Shipping Address</p>
    <p>{currentAddress}</p>
    <button on:click={cancelHandler}>cancel order</button>
    <br>
    
    {#if (currentStatus >= 2)}
      <button class:glowing={currentStatus === 2} id='pdf-button' on:click={fetchPdf}>
        {#if pdfView}
          Hide PDF
        {:else if currentStatus === 2}
          View Quote to make decision
        {:else}
          View PDF/download
        {/if}
      </button>

      {#if pdfView}
        <embed bind:this={embedTest}>
          {#if currentStatus === 2}
            <p>Do you approve of this quote? </p>
            <button on:click={approveHandler} class="approve">Approve</button>
            <button on:click={denyHandler} class="deny">Deny</button>
          {/if}
        <iframe bind:this={ifr} src="" frameborder="0" title='invoice'></iframe>
      {/if}

    {/if}

  </div>
  {:else}
  
  
  
  <div class="orders-container">
    {#each orderIds as orderId}
    
  <!-- I could assign the ID to id, instead of data-id -->
  
  <!-- this has to be really inefficient -->
  {#await fetchOrderDetails(orderId) then order}
  <!-- {console.log(order, 'order')} -->
  <div class="order" class:pending={order[0].status === 2}  data-id={orderId} class:disabled={disabled === true} > <!-- on:click={handleOrderClick} -->
    <p id="order-title">Order {sliceOrderId(orderId)}</p>
    <div class="disabled" class:approval={order[0].status === 2}>
      <p class="inner">Pending your approval</p>
    </div>

      <p class="order-info">Contents: 
        {#each order as quote, i}
          {quote.title}{i < order.length - 1 ? ", " : ""}
        {/each}
      </p>

      <p class="order-info">Total prints: {order.reduce((acc, quote) => acc + quote.quantity, 0)}</p>
      <p class="order-info">Number of models: {order.length}</p>
      <p class="order-info">Date: {order[0].$createdAt.slice(0, 10)}</p>
      <!-- orderId.slice(-6).toUpperCase(); -->
      <p class="status">Status: {getLowestStatus(order)}</p>
      <!-- I need to fix this because status is a number -->
      {#if order[0].status === "cancelled"}
        {disabled = true}
      {/if}
      <button class="order-details-btn" on:click={handleOrderClick} data-id={orderId}>
        {#if order[0].status === 2}
          <p data-id={orderId}>Pending Quote (click to view)</p>
        {:else}
          <p data-id={orderId}>Order Details</p>
        {/if}
      </button>
    </div>
    {/await}
  {/each}
</div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');


  .orders-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .order-container {
    min-height: 70vh;
    background-color: #393939;
    border-radius: 10px;
    padding: 10px;
    margin: 1.1%;
  }

  .back-btn {
    position: absolute;
    right: 64px;
    background-color: #d13535cb;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px;
    font-size: 1.2em;
  }

  .order {
    flex-basis: 47.8%;
    background-color: #333;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    margin: 1.1%;
    transition: background-color 0.5s, color 0.7s;
    box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.16);
    position: relative;
  }

  .order:hover {
    background-color: #393939;
  }

  .order-info {
    color: #bbb;
    text-align: left;
    padding: 2px;
    font-size: 18px;
  }

  #order-title {
    font-weight: bold;
    font-size: 20px;
    padding: 4px;
  }

  .order-details-btn {
    background-color: #730099;
    border: none;
    border: 3px solid white;
    border-radius: 8px;
    padding: 8px;
    margin: 8px;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
  }

  .status {
    font-size: 1.3em;
  }





  .line-item {
    border: 1px solid white;
    display: flex;
    width: 62%;
    margin: 2px auto;
    font-size: 1.3em;
    padding: 5px;
    }

  .title {
    width: 240px;
    background-color: green;
  }

  .type {
    width: 100px;
  }

  .material {
    width: 120px;
    background-color: blue;
  }

  .height, 
  .width,
  .depth {
    width: 3.1em;
  }

  .link {
    width: 170px;
  }


  .line-item p:last-child {
    width: 2.1em;
    margin-left: auto;
    background-color: #222;
  }

  .guide > * {
    background-color: transparent;
  }

  .guide {
    font-weight: bold;
    border: none;
  }



  .order-details {
    width: 62%;
    margin: 0 auto;
    border: 1px solid white;
    padding: 5px;
  }

  .details-line-item {
    display: flex;
  }

  .details-line-item p:first-child {
    text-align: left;
    width: 150px;
  }

  .address-title {
    font-weight: bold;
    font-size: 22px;
    padding: 2px;
    margin: 6px;
  }

  .disabled {
    display: none;
  }

  iframe {
    width: 100%;
    height: 600px;
  }

  .approve,
  .deny {
    color: white;
    padding: 8px;
    margin: 2px;
    border: none;
    border-radius: 12px;
    font-size: 20px;
  }

  .approve {
    background-color: green;
  }

  .deny {
    background-color: red;
  }


  .pending {
    border: 5px solid #b61;
  }

  /* placeholder */
  .pending {
    animation: pulse 1.4s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.7);
    }
    80% {
      box-shadow: 0 0 0 14px rgba(204, 169, 44, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }


  /* this is not good and I should make something simpler later */
  .approval {
    position: absolute;
    height: 120px;
    width: 120px;
    text-align: center;
    top: 0;
    right: 0;
    display: block;
    padding-left: 40px;

    background-color:#b61;

    clip-path: polygon(100% 0, 0 0, 100% 100%);
    z-index: 4;
  }


  .inner {
    position: absolute;
    top: 23px;
    right: -2px;
    width: 110px;
    transform: rotate(37deg);
    font-family: 'Poppins', sans-serif;
    z-index: 19;
  }

  .inner:after {
    content: '';
    position: absolute;
    top: -51px;
    right: -20px;
    width: 140%;
    height: 100%;
    background-color: #393939
  }

  #pdf-button {
    font-size: 21px;
    font-weight: bold;
    padding: 6px 9px;
    margin: 3px;
    background-color: #2b5;
    border-radius: 12px;
    border: none;
  }

  /* add pulse effect to pdf button */

  .glowing {
    animation: glowing 1.6s infinite;
  }

  @keyframes glowing {
    0% {
      box-shadow: 0 0 0 0 #2b5b;
    }
    89% {
      box-shadow: 0 0 0 14px rgba(204, 169, 44, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }

  .alert {
    background-color: #b61;
    position: absolute;

    padding: 5px 15px;
    margin: 4px;
    border-radius: 6px;
    width: 250px; 
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    

  }

  .alert > span {
    font-weight: bold;
    font-size: 26px;
    background-color: red;
    display: inline-block;
    width: 29px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
</style>