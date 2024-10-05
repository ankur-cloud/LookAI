<script>
  import '../../../src/app-main.css';
  import { Icons } from './../icons';
  import 'boxicons/css/boxicons.min.css';
  import { tokenUsage } from '$lib/store';
  import './Navbar.scss';
</script>

<header id="nav-menu" aria-label="navigation bar">
  <div class="navbar-container">
    <div class="nav-start">
      <a class="logo" href="/">
        <i class="icon">{@html Icons.HOME}</i>
      </a>
    </div>

    <div class="nav-end">
      <div class="right-container">
        <div class="flex items-center gap-2 text-sm">
          <span>Token Usage:</span>
          <span id="token-count" class="token-count-animation text-foreground"
            >{$tokenUsage}</span
          >
        </div>
      </div>
    </div>
  </div>
</header>
