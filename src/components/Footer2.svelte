<script>
  import {activeView} from '../stores';

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
      <div></div>
      <div class="social">
          <a href="https://www.linkedin.com/company/84838459/" class="social-icon">
            <i class="fab fa-linkedin fa-2x" aria-hidden="true"></i>
            <span class="sr-only">LinkedIn Page</span>
          </a>
          <a href="https://www.facebook.com/A-Cubed-Design-104416965644412" class="social-icon">
            <i class="fab fa-facebook fa-2x" aria-hidden="true"></i>
            <span class="sr-only">Facebook Page</span>
          </a>
          <a href="https://www.instagram.com/acubeddesign/" class="social-icon">
            <i class="fab fa-instagram fa-2x" aria-hidden="true"></i>
            <span class="sr-only">Instagram Page</span>
          </a>
      </div>
  </div>
  <div class="icon-attributions" tabindex="0" role="button" aria-label="Show icon attributions">Icon Attributions
    <span class="attribution-links">
      <a href="https://www.flaticon.com/free-icons/braille" title="braille icons">Braille icon by Freepik - Flaticon | </a>
      <a href="https://www.flaticon.com/free-icons/loan" title="loan icons">Loan icon by Smashicons - Flaticon | </a>
      <a href="https://www.flaticon.com/free-icons/rocket" title="rocket icons">Rocket icon by Freepik - Flaticon</a>
    </span>
  </div>
  <p>Copyright &copy; 2025 Accessible Affordable Accelerated Design LLC</p>
</footer>

<style>
.footer {
  background: var(--color-surface-0);
  padding: var(--space-xl) 0 var(--space-lg);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary-light), transparent);
}

.container {
  max-width: var(--content-max-width);
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
  padding-left: var(--space-md);
}

a {
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: var(--transition-color);
}

a:hover {
  color: var(--color-primary-light);
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--border-radius-sm);
  background: rgba(255, 255, 255, 0.06);
  margin: 0 6px;
  transition: transform var(--duration-fast) var(--ease-out-expo), background var(--duration-fast) var(--ease-out-cubic);
}

.social-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}

.social-icon .fa-linkedin {
  color: var(--color-text-secondary);
}
.social-icon:hover .fa-linkedin {
  color: var(--color-linkedin);
}

.social-icon .fa-facebook {
  color: var(--color-text-secondary);
}
.social-icon:hover .fa-facebook {
  color: var(--color-facebook);
}

.social-icon .fa-instagram {
  color: var(--color-text-secondary);
}
.social-icon:hover .fa-instagram {
  color: var(--color-instagram);
}

p {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-top: var(--space-md);
}

.icon-attributions {
  color: var(--color-text-tertiary);
  position: relative;
  font-size: var(--font-size-xs);
  cursor: pointer;
  margin-top: var(--space-md);
}

.icon-attributions .attribution-links {
  visibility: hidden;
  width: 300px;
  text-align: center;
  border-radius: var(--border-radius-md);
  padding: var(--space-xs);
  position: absolute;
  z-index: 100;
  border: 1px solid var(--color-border-default);
  bottom: 100%;
  left: 50%;
  margin-left: -150px;
  background-color: var(--color-surface-3);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out-cubic);
}

span a {
  color: var(--color-text-link);
  font-size: var(--font-size-xs);
}

.icon-attributions:hover .attribution-links,
.icon-attributions:focus .attribution-links {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    text-align: center;
  }

  .footer-logo {
    padding-left: 0;
  }

  .social {
    margin-top: var(--space-sm);
  }

  p {
    font-size: var(--font-size-xs);
  }

  .icon-attributions {
    margin-top: var(--space-lg);
  }
}
</style>
