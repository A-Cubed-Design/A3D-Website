<script>
  import { Account, Client, ID, Databases, Permission, Role, Query } from "appwrite";
  import { onMount } from "svelte";

  import Detailed from "./Detailed.svelte";
  import Status from "./Status.svelte";
 
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

  onMount(async () => {
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
    });
    console.log(orderIds, "order ids");
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

  const toggleDetailedView = () => {
    detailedView = !detailedView;
  };
  
</script>


<main>

<h2>All Orders: </h2>


  {#if !detailedView}
    {#each filteredOrders as order}
      <div class="order-id">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <p id={order.orderId} on:click={clickOrderHandler}>{sliceOrderId(order.orderId)} email: {order.email}</p>
      </div>
    {/each}
  {:else}
    <Detailed myArr={currentOrder} on:toggleDetailedView={toggleDetailedView} />
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
</style>
