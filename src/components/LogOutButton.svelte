<script>
  import { Account, Client } from "appwrite";
  import { loggedInStore } from "../stores.js";

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e");
  const account = new Account(client);

  let email = '';
  
  const logOutHandler = () => {
    const promise = account.deleteSession('current');

    promise.then((response) => {
      console.log(response, "logged out");
      $loggedInStore = false;
      email = '';
    }, (error) => {
      console.log(error);
    });
  }


  const showEmail = () => {
    const promise = account.get();

    promise.then((response) => {
      console.log(response, "user email");
      email = response.email
    }, (error) => {
      console.log(error, "this error only means you're logged out");
    });
  }

  showEmail(); // there has to be a better place for this
</script>
<p class="email">devinfo: {email}</p>

{#if $loggedInStore}
  <button on:click={logOutHandler}>Log Out</button>
{/if}

<style>
  button {
    z-index: 3;
    margin-left: auto;
    margin-right: 1.5rem;

    color: white;
    background-color: transparent;

    border: 3px solid white;
    border-radius: 8px;
    font-size: 1.3em;
    padding: 4px;
    transition: background-color 0.5s, color 0.6s;
  }

  /* I'll remove this later */
  .email {
    position: absolute;
    left: 1%;
    padding: 90px 240px;
    z-index: 4;
    font-weight: bold;
    color: transparent
  }

  .email:hover {
    color: green;
    background-color: #fff;
  }
</style>