<script lang="ts">
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import { Icons } from '../icons';
  import { page } from '$app/stores';
  import './Drawer.scss';

  let active = 'Gray Kittens';
  export let open = true;

  function setActive(value: string) {
    active = value;
  }

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

<div class="drawer-container">
  <Drawer variant="dismissible" bind:open>
    <Content>
      <List>
        {#each navItems as { icon, tooltip, label, route }, i}
          <Item
            href={route}
            on:click={() => setActive(route)}
            activated={active === route}
          >
            <i class="icon">{@html icon}</i>
            <Text>{label}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>

  <AppContent class="app-content">
    <main class="main-content">
      <slot />
    </main>
  </AppContent>
</div>

<style>
  /* These classes are only needed because the
      drawer is in a container on the page. */
</style>
