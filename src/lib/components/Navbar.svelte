<script>
  import '../../../src/app-main.css';
  import { Icons } from './../icons';
  import 'boxicons/css/boxicons.min.css';
  import { tokenUsage } from '$lib/store';
  import './Navbar.scss';

  const dummyData = [
    {
      name: 'Business Requirement',
      code: 'BR',
    },
    {
      name: 'Technical Specification',
      code: 'TS',
    },
    {
      name: 'Code Generation',
      code: 'CG',
    },
    {
      name: 'Test Data Generation',
      code: 'TSTC',
    },
    {
      name: 'Release details',
      code: 'RELDET',
    },
  ];
</script>

<header id="nav-menu" aria-label="navigation bar">
  <div class="navbar-container">
    <div class="nav-start">
      <a class="logo" href="/">
        <i class="icon">{@html Icons.HOME}</i>
      </a>
      <div class="mb-5 overflow-hidden rounded-full bg-gray-200">
        <div
          class="journey-map rounded-full bg-gradient-to-r from-green-300 to-green-700"
        >
          {#each dummyData as element, index}
            <div class="stage ">
              <div class="step-icon">{index}</div>
              <div class="step-content text-white-900">
                <p>{element.name}.</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
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
