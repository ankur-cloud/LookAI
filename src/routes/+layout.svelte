<script>
  import Drawer from '$lib/components/Drawer.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import '../app-main.css';

  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import SettingsMenuBanner from '../../src/lib/components/SettingsMenuBanner.svelte';
  import MenuConfig from '../../src/lib/components/MenuConfig.svelte';
  import Button, { Icon } from '@smui/button';
  import Tab, { Label } from '@smui/tab';
  import { onMount } from 'svelte';

  let secondaryColor = false;

  let isDrawerOpen = true;
  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }

  let darkTheme = false;

  $: modeLabel = `switch to ${darkTheme ? 'light' : 'dark'} mode`;

  // This icon represents the mode to which the user can switch.
  $: modeIcon = darkTheme ? 'light_mode' : 'dark_mode';

  // onMount(() => {
  //   darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // });

  function toggleMode(darkValue) {
    console.log('darkValue', darkValue);
    darkTheme = darkValue;
    console.log('darkTheme', darkTheme);
  }
</script>

<svelte:head>
  {#if darkTheme === undefined}
    <link
      rel="stylesheet"
      href="/smui.css"
      media="(prefers-color-scheme: light)"
    />
    <link
      rel="stylesheet"
      href="/smui-dark.css"
      media="screen and (prefers-color-scheme: dark)"
    />
  {:else if darkTheme}
    <link rel="stylesheet" href="/smui.css" media="print" />
    <link rel="stylesheet" href="/smui-dark.css" media="screen" />
  {:else}
    <link rel="stylesheet" href="/smui.css" />
  {/if}
</svelte:head>

<div class="flexy">
  <div class="top-app-bar-container flexor">
    <TopAppBar
      variant="static"
      prominent={false}
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
      <!-- <ModeWatcher /> -->

      <Toaster />
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
    overflow: hidden;
    /* scrollbar-width: none; */
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
    scrollbar-width: thin;
  }
</style>
