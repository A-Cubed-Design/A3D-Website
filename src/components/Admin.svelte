<script>
  import { Account, Client, ID, Databases, Permission, Role, Query } from "appwrite";
  import { onMount } from "svelte";

  import Detailed from "./Detailed.svelte";
  import { statusMap } from "../stores.js";
 
  let newUser = false;
  $: loggedIn = true;

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e")
    
  const account = new Account(client);
  const databases = new Databases(client);


  const checkIfauthenticated = () => {
    const promise = account.get();

    promise.then((response) => {
      console.log(response.email, "logged in (check)");
      loggedIn = true;
    }, (error) => {
      console.log(error);
    });
  }

  const logOutHandler = () => {
    const promise = account.deleteSession('current');

    promise.then((response) => {
      console.log(response, "logged out");
    }, (error) => {
      console.log(error);
    });
  }

// adminLogin would then change $loggedIn to true

  const sliceOrderId = (orderId) => {
    return orderId.slice(-6).toUpperCase();
  };

  let orderIds = [];
  let orderEmails = []; // this can't be good

  let filteredOrders = [];

  const mountInit = async () => {
    console.log('RAN MOUNT INIT');
    const response = await databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923"
    );
    // this is probably not good
    let allDocs = response.documents;
    allDocs.forEach((quote) => {


      // if orderIds doesn't contain the ID,
      if (!orderIds.includes(quote.orderId)) {
        // add the object instead of the value to the array? we need to reference other props later
        // so we will have one object/model per order


        filteredOrders = [...filteredOrders, quote];
        orderIds = [...orderIds, quote.orderId]; // jank
        // orderEmails = [...orderEmails, quote.email];
      }

      // if orderIds does contain the ID, cehck if status is lower than current status
      // I feel like I can move this logic somewhere else and also improve it
      // also this is probably not performant
      else {
        filteredOrders.forEach((order) => {
          if (order.orderId === quote.orderId) { // if the current object's ID matches the single one in filteredOrders
            if (quote.status < order.status) {
              order.status = quote.status; // lower the status
            }
          }
        });
        filteredOrders = [...filteredOrders];
      }
    });
    //console.log(orderIds, "order ids");
    console.log(filteredOrders, "filtered orders!!!!");
  }

  onMount(() => {
    mountInit();
  });

  let currentOrder = {};

  const clickOrderHandler = (e) => {
    console.log(typeof e.target.getAttribute('id', "handle id"))

    let promise = databases.listDocuments(
      "6358796a8d7934bcb3cf",
      "63587d34102e1c615923",
      [
        Query.equal('orderId', e.target.getAttribute('id'))
      ]
    );
    
    promise.then((response) => {
      console.log(response.documents, "order details");
      detailedView = !detailedView;
      currentOrder = response.documents;
    }, (error) => {
      console.log(error);
    });
  };


  let detailedView = false;

  const toggleDetailedView = (event) => {
    detailedView = !detailedView;
    console.log(event);
    filteredOrders = []; // makes it work, but causes blank menu for 10ms
    orderIds = [];
    mountInit();
    // querying the entire DB again is probably really bad 
    // but I want to ensure the admin always sees the most up to date data 
    // just in case someone else makes a change at the same time
    
    // take the deleted order and remove it from filtered + myArr?
    // instead, right now I'm just triggering a reload on Detailed.svelte
  };

  const deleteHandler = (event) => {
    detailedView = !detailedView;
    console.log(event.detail.orderId, 'deletion event');

    // remove the order from filteredOrders
    console.log('pre filtered orders', filteredOrders);
    filteredOrders = filteredOrders.filter((order) => order.orderId !== event.detail.orderId);
  }

  
</script>


<main>

  
  
  {#if !detailedView}
  <h2>Pending Orders: </h2>
    {#each filteredOrders as order}
      {#if order.status >= 0 && order.status < statusMap.size - 2}
      <div class="order-id" class:cancelled={order.status === "cancelled"}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <p id={order.orderId} on:click={clickOrderHandler}>{sliceOrderId(order.orderId)} email: {order.email} status: {statusMap.get(order.status)}</p>
      </div>
      {/if}
    {/each}
  <h2>Completed & Cancelled Orders: </h2>
      {#each filteredOrders as order}
        {#if order.status === statusMap.size - 2 || order.status === -1}
        <div class="order-id" class:cancelled={order.status === "cancelled"}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p id={order.orderId} on:click={clickOrderHandler}>{sliceOrderId(order.orderId)} email: {order.email} status: {statusMap.get(order.status)}</p>
        </div>
        {/if}
      {/each}


  {:else}
    <Detailed myArr={currentOrder} on:toggleFromDelete={deleteHandler} on:toggleDetailedView={toggleDetailedView} />
  {/if}


</main>

<style>

  .order-id p {
    cursor: pointer;
    background-color: #1f1f1f;
    margin: 2px;
    padding: 2px;
  }

  * {
    text-align: left;
  }

  h2 {
    margin: 8px;
  }

  .cancelled {
    text-decoration: line-through;
  }
</style>
