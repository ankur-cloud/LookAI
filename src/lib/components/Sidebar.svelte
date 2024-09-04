<script>
  import SidebarButton from './ui/SidebarButton.svelte';
  import { page } from '$app/stores';
  import { Icons } from './../icons';

  let navItems = [
    {
      icon: Icons.HOME,

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
      route: '/',
    },
    {
      icon: Icons.DEPLOY,
      tooltip: 'Deploy Code',
      label: 'Deploy Code',
      route: '/',
    },
  ];
  console.log($page.url);
</script>

<div
  class="sidebar flex flex-col text-tertiary mx-2 my-4 gap-6 items-center bg-secondary rounded-xl p-6"
>
  <ul>
    {#each navItems as { icon, tooltip, route, label }, i}
      <SidebarButton
        {icon}
        href={route}
        isSelected={$page.url.pathname == route}
        {tooltip}
        {label}
      />
    {/each}
  </ul>
</div>
