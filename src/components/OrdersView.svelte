<script>
  import { Account, Client, Databases, ID, Query } from "appwrite";
  import { loggedInStore, quoteStore } from "../stores";
  import { activeStore } from "../stores";
  import { onMount } from "svelte";
  import NoTab from "./NoTab.svelte";

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e");

  const databases = new Databases(client);

  let orderIds = [];

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
        console.log(error);
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

  
</script>

<!-- this flashes in for a second because orderIds doesn't have a length until queried -->
{#if (orderIds.length === 0)}
  <h1>Orders</h1>
  <p>You have no orders.</p>
  <NoTab />
{/if}



{#if detailedOrderView}
<div class="order-container">
  <!-- I should probably use a table? -->
  <h2>Order Details</h2>
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
  </div>
  {:else}
  
  
  
  <div class="orders-container">
    {#each orderIds as orderId}
    
  <!-- I could assign the ID to id, instead of data-id -->
  <div class="order"   data-id={orderId} > <!-- on:click={handleOrderClick} -->
    <p id="order-title">Order {sliceOrderId(orderId)}</p>

    <!-- this has to be really inefficient -->
    {#await fetchOrderDetails(orderId) then order}

      <p class="order-info">Contents: 
        {#each order as quote, i}
          {quote.title}{i < order.length - 1 ? ", " : ""}
        {/each}
      </p>

      <p class="order-info">Total prints: {order.reduce((acc, quote) => acc + quote.quantity, 0)}</p>
      <p class="order-info">Number of models: {order.length}</p>
      <p class="order-info">Date: {order[0].$createdAt.slice(0, 10)}</p>
      <!-- orderId.slice(-6).toUpperCase(); -->
      <p class="status">Status: {order[0].status}</p>
    {/await}
    <button class="order-details-btn" on:click={handleOrderClick} data-id={orderId}>Order Details</button>
  </div>
  {/each}
</div>
{/if}

<style>

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
</style>