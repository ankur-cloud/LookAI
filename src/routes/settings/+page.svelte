<script>
  import { updateSettings, fetchSettings } from '$lib/api';
  import { onMount } from 'svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { setMode } from 'mode-watcher';
  // import * as Select from '$lib/components/ui/select/index.js';
  import Seperator from '../../lib/components/ui/Seperator.svelte';
  // import SettingsMenu from '../../../src/lib/components/SettingsMenu.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import Button, { Icon } from '@smui/button';
  import Paper, { Content } from '@smui/paper';
  import Select, { Option } from '@smui/select';
  import IconButton from '@smui/icon-button';

  let settings = {};
  let editMode = false;
  let original = {};
  let active = 'API Keys';

  function getSelectedTheme() {
    let theme = localStorage.getItem('mode-watcher-mode');
    if (theme === 'light') {
      return { value: 'light', label: 'Light' };
    } else if (theme === 'dark') {
      return { value: 'dark', label: 'Dark' };
    } else if (theme === 'system') {
      return { value: 'system', label: 'System' };
    } else {
      return { value: 'system', label: 'System' };
    }
  }

  function getSelectedResize() {
    let resize = localStorage.getItem('resize');
    if (resize === 'enable') {
      return { value: 'enable', label: 'Enable' };
    } else {
      return { value: 'disable', label: 'Disable' };
    }
  }

  let selectedTheme = getSelectedTheme();
  let selectedResize = getSelectedResize();

  function setResize(value) {
    localStorage.setItem('resize', value);
  }

  onMount(async () => {
    settings = await fetchSettings();
    // this is for correcting order of apis shown in the settings page
    settings['API_KEYS'] = {
      BING: settings['API_KEYS']['BING'],
      GOOGLE_SEARCH: settings['API_KEYS']['GOOGLE_SEARCH'],
      GOOGLE_SEARCH_ENGINE_ID: settings['API_KEYS']['GOOGLE_SEARCH_ENGINE_ID'],
      CLAUDE: settings['API_KEYS']['CLAUDE'],
      OPENAI: settings['API_KEYS']['OPENAI'],
      GEMINI: settings['API_KEYS']['GEMINI'],
      MISTRAL: settings['API_KEYS']['MISTRAL'],
      GROQ: settings['API_KEYS']['GROQ'],
      NETLIFY: settings['API_KEYS']['NETLIFY'],
    };
    // make a copy of the original settings
    original = JSON.parse(JSON.stringify(settings));
  });

  const save = async () => {
    let updated = {};
    for (let key in settings) {
      if (settings[key] !== original[key]) {
        updated[key] = settings[key];
      }
    }
    await updateSettings(updated);

    editMode = !editMode;
  };

  const edit = () => {
    editMode = !editMode;
  };

  let darkTheme = false;

  const themeArr = [
    { label: 'Light', value: false, icon: 'light_mode' },
    { label: 'Dark', value: true, icon: 'dark_mode' },
  ];
</script>

<div class="p-4 h-full w-full gap-8 flex flex-col overflow-y-auto">
  <div class="mdc-typography--headline2">Settings</div>
  <section toolbar></section>
  <!-- <SettingsMenu /> -->
  <TabBar
    tabs={['API Keys', 'API Endpoints', 'Appearance']}
    let:tab
    bind:active
  >
    <!-- Note: the `tab` property is required! -->
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  {#if active === 'API Keys'}
    <Paper variant="unelevated">
      <Content>
        {#if settings['API_KEYS']}
          <div class="flex gap-4 w-full">
            <div class="flex flex-col gap-4 w-full">
              <div class="flex flex-col gap-4">
                {#each Object.entries(settings['API_KEYS']) as [key, value]}
                  <div class="flex gap-1 items-center">
                    <p class="w-48">{key.toLowerCase()}</p>
                    <input
                      type="text"
                      bind:value={settings['API_KEYS'][key]}
                      name={key}
                      class="p-2 border-2 w-1/2 rounded-lg {editMode
                        ? ''
                        : ' text-gray-500'}"
                      readonly={!editMode}
                    />
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}</Content
      >
    </Paper>
  {:else if active === 'API Endpoints'}
    <Paper variant="unelevated">
      <Content>
        {#if settings['API_KEYS']}
          <div class="flex gap-4 w-full">
            <div class="flex flex-col w-full gap-4">
              {#each Object.entries(settings['API_ENDPOINTS']) as [key, value]}
                <div class="flex gap-3 items-center">
                  <p class="w-28">{key.toLowerCase()}</p>
                  <input
                    type="text"
                    bind:value={settings['API_ENDPOINTS'][key]}
                    name={key}
                    class="p-2 border-2 w-1/2 rounded-lg {editMode
                      ? ''
                      : 'text-gray-500'}"
                    readonly={!editMode}
                  />
                </div>
              {/each}
            </div>
          </div>
        {/if}
        <div class="flex gap-4 mt-5">
          {#if !editMode}
            <Button on:click={edit} variant="outlined">
              <Icon class="material-icons">edit</Icon>
              <Label>Edit</Label>
            </Button>
          {:else}
            <Button on:click={save} variant="outlined">
              <Icon class="material-icons">save</Icon>
              <Label>Save</Label>
            </Button>
          {/if}
        </div>
      </Content>
    </Paper>
  {:else if active === 'Appearance'}
    <Paper variant="unelevated">
      <Content>
        <div class="flex w-full justify-between items-center my-2 gap-8">
          <div>Select a theme</div>
          <div>
            <Select variant="outlined" bind:darkTheme>
              {#each themeArr as { label, value, icon }}
                <Option {value} on:click={() => toggleMode(value)}>
                  {label}
                </Option>
              {/each}
            </Select>
          </div>
        </div>
        <div class="flex w-full justify-between items-center my-2 gap-8">
          <div>Enable tab resize</div>
          <div>
            <Select
              variant="outlined"
              bind:darkTheme
              label="Resize"
              onChange={() => {
                console.log('Enable tab resize');
                setResize(v.value);
              }}
            >
              <Option value="" />
              {#each [{ label: 'Enable', value: 'enable' }, { label: 'Disable', value: 'disable' }] as { label, value }}
                <Option {value}>{label}</Option>
              {/each}
            </Select>

            <!-- <Select.Root
              onSelectedChange={(v) => {
                setResize(v.value);
              }}
            >
              <Select.Trigger class="w-[180px]">
                <Select.Value placeholder={selectedResize.label} />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value={'enable'} label={'Enable'}
                    >Enable</Select.Item
                  >
                  <Select.Item value={'disable'} label={'Disable'}
                    >Disable</Select.Item
                  >
                </Select.Group>
              </Select.Content>
              <Sel ect.Input name="favoriteFruit" />
            </Select.Root> -->
          </div>
        </div>
        <div class="flex w-full justify-between items-center my-2 gap-8">
          <div>Reset layout</div>
          <Button
            on:click={() => {
              localStorage.removeItem('paneforge:default');
            }}
            variant="outlined"
          >
            <Icon class="material-icons">undo</Icon>
            <Label>Reset</Label>
          </Button>
        </div>
      </Content>
    </Paper>
  {/if}
</div>

<style>
  .btn-settings:hover {
    background-color: var(--hover-color);
  }
</style>
