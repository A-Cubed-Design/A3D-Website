<script>
  import {activeView} from '../stores';
  
  // for use with navbar footer
  // function formHandler() {
  //   $activeView = 'form';
  // }
  
  function mainHandler() {
    $activeView = 'main';
  }
</script>

<footer class="footer">
  <div class="container grid">
      <div>
        <a href="/" on:click={mainHandler}>
          <img class="footer-logo" src="./assets/ACubedLogo.png" alt="A Cubed Design Logo">
        </a>
      </div>
      <!-- <nav>
          <ul>
              <li><a href="/" on:click={mainHandler}>About</a></li>
              <li><a href="#team" on:click={mainHandler}>Team</a></li>
              <li><a href="#contact" on:click={formHandler}>Contact</a></li>
          </ul>
      </nav> -->
      <div></div>
      <div class="social">
          <a href="https://www.linkedin.com/company/84838459/"><i class="fab fa-linkedin fa-2x"></i></a>
          <a href="https://www.facebook.com/A-Cubed-Design-104416965644412"><i class="fab fa-facebook fa-2x"></i></a>
          <a href="https://www.instagram.com/acubeddesign/"><i class="fab fa-instagram fa-2x"></i></a>
          <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
      </div>
  </div>
  <div class="icon-attributions">Icon Attributions
    <span class="attribution-links">
      <a href="https://www.flaticon.com/free-icons/braille" title="braille icons">Braille icon by Freepik - Flaticon | </a>
      <a href="https://www.flaticon.com/free-icons/loan" title="loan icons">Loan icon by Smashicons - Flaticon | </a>
      <a href="https://www.flaticon.com/free-icons/rocket" title="rocket icons">Rocket icon by Freepik - Flaticon</a>
    </span>
  </div>
  <p>Copyright &copy; 2022 Accessible Affordable Accelerated Design LLC</p>
</footer>

<style>
/* Footer */
.container {
  max-width: 2000px;
  margin: 0 auto;
  overflow: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

.footer-logo {
  width: 90px;
}

/* for use with navbar footer */
/* ul {
  list-style-type: none;
  margin-bottom: 1.5em;
} */

a {
  text-decoration: none;
  color: #fff;
}

a:hover {
  color: hsl(282 98% 49% / 0.8);
}

p {
  font-size: 1em;
  color: #888;
}

span a {
  color: blue;
}
 
.footer {
  background: var(--my-dark-gray);
  padding: 2em 0;
}

.footer .social a {
  margin: 0 10px;
}

.fa-linkedin:hover {
  color: #0E76A8;
}

.fa-facebook:hover {
  color: #1773EA;
}

.fa-instagram:hover {
  color: #B32E87;
}

.fa-twitter:hover {
  color: #1C9CEA;
}

.icon-attributions {
  color: #fff;
  position: relative;
  font-size: .8em;
}

.icon-attributions .attribution-links {
  visibility: hidden;
  width: 300px;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 100;
  border: 3px solid rgb(0, 0, 0);
  bottom: 100%;
  left: 50%;
  margin-left: -150px;
  background-color:white;
  opacity: 0;
  transition: opacity 1s;
}

.icon-attributions:hover .attribution-links {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  p {
    font-size: .7em;
  }

  .icon-attributions {
    margin-top: 2em;
  }
}
</style>