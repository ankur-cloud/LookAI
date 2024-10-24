<script>
  import NewSidebar from '$lib/components/NewSidebar.svelte';
  import Drawer from '$lib/components/Drawer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import '../app-main.css';

  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Checkbox from '@smui/checkbox';
  import FormField from '@smui/form-field';
  import { Content } from '@smui/drawer';
  import SettingsMenu from '../../src/lib/components/SettingsMenu.svelte';
  import SettingsMenuBanner from '../../src/lib/components/SettingsMenuBanner.svelte';
  import MenuConfig from '../../src/lib/components/MenuConfig.svelte';
  import Menu, { SelectionGroup, SelectionGroupIcon } from '@smui/menu';
  import List, { Item, Separator, Text } from '@smui/list';
  import Button, { Label } from '@smui/button';

  let prominent = false;
  let dense = false;
  let secondaryColor = false;

  let isDrawerOpen = true;
  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }
</script>

<div class="flexy">
  <div class="top-app-bar-container flexor">
    <TopAppBar
      variant="static"
      {prominent}
      color={secondaryColor ? 'secondary' : 'primary'}
    >
      <Row>
        <Section>
          <IconButton class="material-icons" on:click={toggleDrawer}
            >menu</IconButton
          >
          <Title>Look AI</Title>
        </Section>
        <Section align="end" toolbar>
            <MenuConfig></MenuConfig>
        </Section>
      </Row>
    </TopAppBar>

    <SettingsMenuBanner />

    <div class="flexor-content">
      <!-- <Toaster />
        <ModeWatcher /> -->
      <div>
        <Drawer open={isDrawerOpen}>
          <slot />
        </Drawer>

        <!-- <NewSidebar /> -->
      </div>
    </div>
  </div>
</div>

<style>
  .top-app-bar-container {
    width: 100%;
    height: 100%;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    margin: 0 0px 18px 0;
    background-color: var(--mdc-theme-background, #fff);

    overflow: auto;
    display: inline-block;
  }

  @media (max-width: 480px) {
    .top-app-bar-container {
      margin-right: 0;
    }
  }

  .flexy {
    display: flex;
    flex-wrap: wrap;
    height: 100dvh;
  }

  .flexor {
    display: inline-flex;
    flex-direction: column;
  }

  .flexor-content {
    display: flex;
    flex-basis: 0;
    /* height: 0; */
    flex-grow: 1;
    overflow: auto;
    height: 90%;
  }
</style>
