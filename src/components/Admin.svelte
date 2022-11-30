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
      <div class="order-id" class:approved={order.status === 4} class:rejected={order.status === 3}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="inner-id" id={order.orderId} on:click={clickOrderHandler}>
          {#if order.status === 3 || order.status === 4}
          <div class="alert">
            <span>!</span>
          </div>
          {/if}
          {sliceOrderId(order.orderId)} <span class="divider"> </span> email: {order.email} <span class="divider"> </span> status: {statusMap.get(order.status)}
        </div>
      </div>
      {/if}
    {/each}
  <h2>Completed & Cancelled Orders: </h2>
      {#each filteredOrders as order}
        {#if order.status === statusMap.size - 2 || order.status === -1}
        <div class="order-id" class:approved={order.status === 4} class:rejected={order.status === 3}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="inner-id" id={order.orderId} on:click={clickOrderHandler}>
            {sliceOrderId(order.orderId)} <span class="divider"> </span> email: {order.email} <span class="divider"> </span> status: {statusMap.get(order.status)}
          </div>
        </div>
        {/if}
      {/each}


  {:else}
    <Detailed myArr={currentOrder} on:toggleFromDelete={deleteHandler} on:toggleDetailedView={toggleDetailedView} />
  {/if}


</main>

<style>

  .inner-id {
    display: flex;
    align-items: center;
  }

  .order-id div {
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

 
  
  
  .rejected div {
    animation: rejected 2.2s infinite ease-in-out;
    background-color: rgba(255, 0, 0, 0.7);
  }
  
  .approved div {
    animation: approved 2.2s infinite ease-in-out;
    background-color: rgba(11, 104, 11, 0.7);
  }

  @keyframes rejected {
    0% {
      background-color: rgba(255, 10, 20, 0.6);
    }
    50% {
      background-color: #1f1f1f;
    }
    100% {
      background-color: rgba(255, 10, 20, 0.6);
    }
  }

  @keyframes approved {
    0% {
      background-color: rgba(11, 104, 11, 0.8);
    }
    50% {
      background-color: #1f1f1f;
    }
    100% {
      background-color: rgba(11, 104, 11, 0.8);
    }
  }

  /* .alert p {
    background-color: blue;
    font-size: 22px;
  } */

  .alert { 
    /* position: relative; */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: orange !important;
    width: 8px;
    height: 8px;
    transform: scale(2.6) ;
    border-radius: 50%;
    position: relative;
    margin: 0;
    margin-left: 6px !important;
    margin-right: 14px !important;
    /* border: 2px solid black */
    /* display: none; */
  }

  .alert span {

    font-size: 12px;
    font-weight: bold;

  }

  /* slightly rotate alert span back and forth */
  .alert span:nth-child(1) {
    animation: alert 0.7s infinite linear;
  }

  @keyframes alert {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(8deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-8deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }



  span.divider {
    height: 20px;
    width: 2px;
    margin: 0 6px;
    background-color: white;
    color: white;
  }


  .tester {
    width: 20px;
    height: 20px;
    background-color: white !important;
  }
</style>
