<script>
  import SidebarButton from './ui/SidebarButton.svelte';
  import { page } from '$app/stores';
  import { Icons } from './../icons';
  // import '../../../src/app-main.css';

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

<div class="sidebar">
  <ul>
    {#each navItems as { icon, tooltip, label, route }, i}
      <li class={$page.url.pathname == route ? 'active' : 'nonActive'}>
        <a href={route}>
          <i id="svg-icon" class="icon">{@html icon}</i>
          <span class="nav-item">{label}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .sidebar {
    height: 100vh;
    width: var(--sidebar-width);
    background: var(--light-grey);
    padding: 0.4rem 0;
    transition: all 0.5s ease;
  }

  .sidebar ul li {
    position: relative;
    list-style-type: none;
    width: 90%;
    margin: 0.8rem auto;
    line-height: 3rem;
    color: var(--dark-grey);
    border-radius: var(--border-radius);
  }

  .sidebar ul li a {
    display: flex;
    align-items: center;
    text-decoration: none;
    border-radius: var(--border-radius);
  }

  .sidebar ul li a .icon {
    color: var(--dark-grey);
    min-width: 3rem;
    text-align: center;
    margin-left: 0.4rem;
    border-radius: 1rem;
    line-height: 3rem;
  }

  .sidebar .nav-item {
    opacity: 1;
  }

  /* hover start  */
  .sidebar ul li :hover {
    background-color: var(--white);
    color: var(--dark-grey);
  }
  .sidebar ul li:hover a #svg-icon {
    color: var(--dark-grey);
  }
  /* hover end  */

  /* active  class  */
  .sidebar ul li.active {
    background: var(--selected-sidebar-primary);
    color: var(--white);
  }

  .sidebar ul li.active a .icon {
    color: var(--white);
  }
</style>
