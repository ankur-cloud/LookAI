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
    settings = await fetchSearchPage();
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
  <div class="mdc-typography--headline2">Search</div>
  <!-- <SettingsMenu /> -->
  <div>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci esse
    labore animi, assumenda perferendis rem similique nobis. Cumque, magnam,
    ipsum placeat dignissimos architecto repellat, quis temporibus quidem
    quisquam asperiores repellendus.
  </div>
</div>

<style>
  .btn-settings:hover {
    background-color: var(--hover-color);
  }
</style>
