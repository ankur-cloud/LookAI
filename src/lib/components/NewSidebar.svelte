<script>
  import SidebarButton from './ui/SidebarButton.svelte';
  import { page } from '$app/stores';
  import { Icons } from './../icons';
  import '../../../src/app-main.css';
  import './sidebar-style.scss';

  let navItems = [
    {
      icon: Icons.HOMED_DASHBOARD,
      tooltip: 'Home',
      label: 'Home',
      route: '/',
    },
    {
      icon: Icons.SETTINGS,
      tooltip: 'Settings',
      label: 'Settings',
      route: '/settings',
    },
    {
      icon: Icons.LOGS,
      tooltip: 'Logs',
      label: 'Logs',
      route: '/logs',
    },
    {
      icon: Icons.SearchIcon,
      tooltip: 'Search',
      label: 'Search',
      route: '/search',
    },
    {
      icon: Icons.FlowChartIcon,
      tooltip: 'FlowChart to Code',
      label: 'FlowChart to Code',
      route: '/convert',
    },
    {
      icon: Icons.DEBUG,
      tooltip: 'Debug Code',
      label: 'Debug Code',
      route: '/debug-code',
    },
    {
      icon: Icons.DEPLOY,
      tooltip: 'Deploy Code',
      label: 'Deploy Code',
      route: '/deploy-code',
    },
  ];
  console.log($page);
</script>

<div id="nav-bar">
  <input id="nav-toggle" type="checkbox" />
  <div id="nav-header">
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr />
  </div>
  <div id="nav-content">
    {#each navItems as { icon, tooltip, label, route }, i}
      <!-- <li class={$page.url.pathname == route ? 'active' : 'nonActive'}>
          <a href={route} class="nav-button">
            <i id="svg-icon" class="icon">{@html icon}</i>
            <span class="nav-item">{label}</span>
          </a>
        </li> -->
      <a
        href={route}
        class={`nav-button ${$page.url.pathname == route ? 'active' : 'nonActive'}`}
      >
        <i class="icon">{@html icon}</i>
        <span class="nav-item">{label}</span>
      </a>
    {/each}
  </div>
</div>
