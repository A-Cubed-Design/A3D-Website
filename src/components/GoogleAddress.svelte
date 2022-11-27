<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const testHandler = (e) => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData(e.target);
      let json = Object.fromEntries(formData.entries());

      json.address = json.autocomplete;
      delete json.autocomplete;
      // console.log(json);
      sayAddress(json);
    }

    function sayAddress(message) {
      dispatch("address", message);
    }

</script>

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCP-THEtN8aeSJ_yBHwi48UsKW3KzYQV5E&libraries=places&callback=initMap">
  </script>

  <script>
    
    function initMap() {
      const input = document.getElementById("autocomplete");
      const options = {types: ["geocode"]};


      const autocomplete = new google.maps.places.Autocomplete(input, options);




      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place.address_components, 'place address_components');

        // this has to be bad right?
        const streetAddress = place.address_components.find((component) => {
          return component.types.includes("street_number");
        });

        const streetName = place.address_components.find((component) => {
          return component.types.includes("route");
        });

        const city = place.address_components.find((component) => {
          return component.types.includes("locality");
        });

        const state = place.address_components.find((component) => {
          return component.types.includes("administrative_area_level_1");
        });

        const zip = place.address_components.find((component) => {
          return component.types.includes("postal_code");
        });

        const country = place.address_components.find((component) => {
          return component.types.includes("country");
        });

        // console.log(streetNumber);

        document.getElementById("country").value = country.long_name;
        document.getElementById("city").value = city.long_name;
        document.getElementById("state").value = state.short_name;
        document.getElementById("zip").value = zip.long_name;
        document.getElementById("autocomplete").value = streetAddress.long_name + " " + streetName.long_name;

        const addressObject = {
          streetAddress: streetAddress.long_name,
          streetName: streetName.long_name,
          city: city.long_name,
          state: state.short_name,
          zip: zip.long_name,

        };

        console.log(typeof JSON.stringify(addressObject));
      })


    }





  </script>
</svelte:head>


<form on:submit={testHandler} class="address-container">
  <p>Enter Address to submit: </p>

  <div class="form-div">
    <label for="full-name">Full Name</label>
    <input type="text" name="full-name" id="full-name" placeholder="Full name">

  </div>


  <div class="form-div">
    <label for="autocomplete">Address</label>
    <input type="text" name="autocomplete" id="autocomplete" placeholder="Address">
  </div>

  <div class="form-div">
    
    <label for="unit">unit</label>
    <input type="text" name="unit" id="unit" placeholder="apt/unit">
  </div>

  
  <div class="form-div">
    <label for="city">City</label>
    <input type="text" name="city" id="city" placeholder="City">
  </div>

  <div class="form-div">
    <label for="state">State</label>
    <input type="text" name="state" id="state" placeholder="State" class="short">
  </div>
  


  <div class="form-div">
    <label for="zip">Zip</label>
    <input type="text" name="zip" id="zip" placeholder="Zip" class="short">
  </div>
  
  <div class="form-div">
    <label for="country">Country: </label>
    <input type="text" name="country" id="country" placeholder="Country" class="short">
  </div>

  <!-- <input type="submit" name="submit" id="submit"> -->
  <button>submit</button>
</form>



<style>
  .address-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #2224;
    border-radius: 12px;
    width: 400px;
    padding: 8px;
    margin-top: 10px;
  }

  input {
    /* width: 300px; */
    font-size: 1rem;
    margin: 4px;
    padding: 3px;
  }

  .short {
    width: 100px !important;
    margin-right: 110px;
  }

  label {
    width: 120px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
  }
</style>