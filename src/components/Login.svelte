<script>
  import { Account, Client, ID, Databases } from "appwrite";
  import { loggedInStore, quoteStore } from "../stores.js";
  import { activeStore, emailStore } from "../stores.js";
  let newUser = false;

  let newUsername = '';
  let newPassword = '';
  let newName = '';

  const client = new Client()
    .setEndpoint("https://api.acubed.design/v1")
    .setProject("6357477339689685568e");
  const account = new Account(client);
  const databases = new Databases(client);

  const createNewUser = () => {
    if (validateEmail(newUsername) === false) {
      // should I do this or just let the appwrite error handle it?
      alert('Invalid email');
      return;
    }

    const promise = account.create(ID.unique(), newUsername, newPassword, newName);

    promise.then((response) => {
      console.log(response, "user created");
      alert(`User ${newUsername} created!`);
      newUsername = '';
      newPassword = '';
      newUser = false;
      
    }, (error) => {
      console.log(error);
      // alert('Invalid email or password.');
    });
  }

  let username;
  let password;
  let confirmPassword

  const login = () => {

    const promise = account.createEmailSession(username, password);

    promise.then((response) => {
      console.log(response, "logged in");
      $loggedInStore = true;
      username = '';
      password = '';
      confirmPassword = '';
      $emailStore = response.providerUid;
      
      // if there are local quotes, show them
      if ($quoteStore.length) {
        $activeStore = $quoteStore[0].$id;
      } else {
        console.log('quoteStore has no length');
        $activeStore = -2; // if no local quotes, show past orders on login
      }


    }, (error) => {
      console.log(error);
      alert('Invalid username or password.')
    });
  }



  const oAuthLogin = (provider) => {
    const promise = account.createOAuth2Session('google', "https://quote.acubed.design");
  }






  const refreshDocs = () => {
    const promise = databases.listDocuments("6358796a8d7934bcb3cf", "63587d34102e1c615923");

    promise.then((response) => {
      console.log(response.documents, "list of docs");
      $quoteStore = response.documents;
    }, (error) => {
      console.log(error);
    });
  };

  const checkIfauthenticated = () => {
    const promise = account.get();

    promise.then((response) => {
      console.log(response.email, "logged in (check)");
      $loggedInStore = true;
    }, (error) => {
      console.log(error, "this error only means you're logged out");
    });

  }

  checkIfauthenticated();

  const enterHandler = (e) => {
    if (newUser) {
      if (e.key === 'Enter') {
        createNewUser();
      }
    } else if (e.key === 'Enter') {
      login();
    }
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
    alert('test');
  }


  $: isValidEmail = validateEmail(newUsername);

  $: recoveryUser = false;

  let recoveryEmail;

  const recoveryHandler = () => {
    recoveryUser = true;
    console.log('swapping reco user');
  }

  const recoverySubmitHandler = () => {
    const promise = account.createRecovery(recoveryEmail, 'https://quote.acubed.design');

    promise.then((response) => {
      console.log(response, "recovery email sent");
      alert(`Recovery email sent to ${recoveryEmail}`);
      recoveryEmail = '';
      recoveryUser = false;
    }, (error) => {
      console.log(error);
      alert('Invalid email.')
    });
  }

  let urlHasParams = false;


  // this really ought to be abstracted 
  const checkUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret = urlParams.get('secret');

    if (userId && secret) {
      console.log('in if', userId, secret);
      urlHasParams = true;
    }
  }

  checkUrl();

  let newPass;
  let newPassConfirm;

  const resetPassword = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret = urlParams.get('secret');

    const promise = account.updateRecovery(userId, secret, newPass, newPassConfirm);

    promise.then((response) => {
      console.log(response, "password reset");
      alert(`Password reset!`);
      newPass = '';
      newPassConfirm = '';
    }, (error) => {
      console.log(error);
      alert('Invalid password and/or token')
    });
  }



  // placeholder
  const authHandler = () => {
    alert("This feature is coming soon! Please create an account using an email and password.");
  }

</script>


<div class="login-container">
  <!-- this is getting messy -->
  {#if !newUser && !recoveryUser && !urlHasParams}

    <h1>Sign in</h1>
    <input type="email" id="username" name="username" placeholder="Email" bind:value={username}/>
    <input type="password" id="password" name="password" placeholder="Password" bind:value={password} />

    <div class="misc-controls">
      <input type="checkbox" id="remember" name="remember" />
      <label for="remember">Remember me</label>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={recoveryHandler}>Forgot password?</a>
    </div>

    <button type="submit" on:click={login}>Log in</button>

    <div class="auth-container">
      <button on:click={oAuthLogin}>Continue with Google</button>
      <button on:click={authHandler}>Continue with Facebook</button>
      <button on:click={authHandler}>Continue with GitHub</button>
    </div>

    <div class="signup">
      <p>Don't have an account?</p>
      <button on:click={() => newUser = true}>Sign up</button>
    </div>

  {:else if recoveryUser}
    <label for="email">Enter email: </label>
    <input type="email" placeholder="Enter email to recover" id="email" bind:value={recoveryEmail}>
    <button on:click={recoverySubmitHandler}>Send recovery email</button>
    <button on:click={() => recoveryUser = false} class="cancel">Cancel</button>
  {:else if urlHasParams}
    <h1>Reset password</h1>
    <input type="password" id="password" name="password" placeholder="Password" bind:value={newPass} />
    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" bind:value={newPassConfirm} />
    <button type="submit" on:click={resetPassword}>Reset password</button>
  {:else}


    <div class="new-user-container">
      <h1>Create Account</h1>
      <input type="text" id="name" name="name" placeholder="Full name" bind:value={newName} />
      <input type="email" id="username" name="username" placeholder="Email" bind:value={newUsername} required />
      <input type="password" id="password" name="password" placeholder="Password" bind:value={newPassword}/>
      <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" bind:value={confirmPassword}/>
      <button type="submit" on:click={createNewUser}>Sign up</button>
      <p>Already have an account?</p>
      <button on:click={() => newUser = false}>Log in</button>
    </div>
    
    {/if}
    
  </div>
  
  <svelte:window on:keydown={enterHandler} />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: green;

    min-height: 70vh;

    width: 370px;
    margin: 34px;
    padding: 20px;
    border-radius: 12px;

    flex-grow: 1;
    align-self: center;

    /* background: linear-gradient(108deg, hsla(282 98% 29% / 1) 45%, #27233a 45%); */
    background: linear-gradient(108deg, hsla(282 98% 29% / 1) 45%, #27233a 45%);
    box-shadow: #0005 0 5px 16px;
    position: relative;
  }

  h1 {
    margin: 24px;
    font-family: 'Poppins', sans-serif;
  }


  input {
    display: block;
    
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 3px solid #ccc;
    border-radius: 4px;

    width: 280px;

    background-color: var(--my-gray);
    
    font-weight: bold;
    color: white;
    font-size: 1em;
  }

  input:focus,
  input:active {
    outline: none;
  }

  input[type="checkbox"] {
    padding: 0;
    margin: 0 6px;

    width: 1.1em;
  }

  button {
    padding: 0.6rem 2rem;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  } 

  .misc-controls {
    width: 95%;
    display: flex;
    margin-bottom: 16px;
  }

  a {
    margin-left: auto;
    cursor: pointer;
  }

  .auth-container {
    margin: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .auth-container button {
    width: 250px;
    background-color: #0d6efd;
  }

  button[type="submit"] {
    background-color: #198754;
  }

  .new-user-container {
    border-radius: 12px;
    padding: 20px;
  }

  p {
    margin: 10px;
  }

  .cancel {
    margin: 14px;
  }

  label[for="email"] {
    font-size: 22px;
    font-weight: bold;
    margin: 6px;
  }
</style>