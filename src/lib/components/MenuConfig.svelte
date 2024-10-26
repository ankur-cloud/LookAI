<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import {
    projectList,
    // modelList,
    internet,
    tokenUsage,
    agentState,
    searchEngineList,
  } from '$lib/store';

  import {
    createProject,
    fetchMessages,
    fetchInitialData,
    deleteProject,
    fetchAgentState,
    fetchProjectFiles,
  } from '$lib/api';

  import { get } from 'svelte/store';

  import IconButton from '@smui/icon-button';
  import Menu, { SelectionGroup, SelectionGroupIcon } from '@smui/menu';
  import List, { Item, Separator, Text } from '@smui/list';
  import Button, { Label } from '@smui/button';

  import './SettingsMenu.scss';

  let selectedModel;
  let selectedSearchEngine;

  let modelMenu;
  let searchMenu;

  const modelList = writable({
    CLAUDE: [
      ['Claude 3 Opus', 'claude-3-opus-20240229'],
      ['Claude 3 Sonnet', 'claude-3-sonnet-20240229'],
      ['Claude 3 Haiku', 'claude-3-haiku-20240307'],
    ],
    GOOGLE: [['Gemini 1.0 Pro', 'gemini-pro']],
    GROQ: [
      ['LLAMA3 8B', 'llama3-8b-8192'],
      ['LLAMA3 70B', 'llama3-70b-8192'],
      ['LLAMA2 70B', 'llama2-70b-4096'],
      ['Mixtral', 'mixtral-8x7b-32768'],
      ['GEMMA 7B', 'gemma-7b-it'],
    ],
    MISTRAL: [
      ['Mistral 7b', 'open-mistral-7b'],
      ['Mistral 8x7b', 'open-mixtral-8x7b'],
      ['Mistral Medium', 'mistral-medium-latest'],
      ['Mistral Small', 'mistral-small-latest'],
      ['Mistral Large', 'mistral-large-latest'],
    ],
    OLLAMA: [],
    OPENAI: [
      ['GPT-4 Turbo', 'gpt-4-turbo'],
      ['GPT-3.5 Turbo', 'gpt-3.5-turbo-0125'],
      ['GPT-4o', 'gpt-4o'],
    ],
    PHI3: [['Phi-3-mini-128k', 'microsoft/Phi-3-mini-128k-instruct']],
  });

  // const searchEngineList = writable([
  //   'Google 1',
  //   'Yahoo   ',
  //   'Duck Duck Go  ',
  //   'Bing',
  //   'Google 21',
  //   'Yahoo2   ',
  //   'Duck Duck Go 2 ',
  //   'Bing2',
  // ]);

  const checkListAndSetItem = (list, itemKey, defaultItem) => {
    if (get(list) && get(list).length > 0) {
      const item = localStorage.getItem(itemKey);
      return item ? item : defaultItem;
    } else {
      localStorage.setItem(itemKey, '');
      return defaultItem;
    }
  };

  selectedModel = checkListAndSetItem(
    modelList,
    'selectedModel',
    'Select Model'
  );

  selectedSearchEngine = checkListAndSetItem(
    searchEngineList,
    'selectedSearchEngine',
    'Select Search Engine'
  );

  function selectModel(model) {
    selectedModel = `${model[0]}`;
    localStorage.setItem('selectedModel', model[1]);
  }

  function selectSearchEngine(searchEngine) {
    selectedSearchEngine = searchEngine;
    localStorage.setItem('selectedSearchEngine', searchEngine);
  }

  console.log('selectedSearchEngine', selectedSearchEngine);
</script>

<div class="search-engine-select-menu">
  <IconButton
    class="material-icons"
    aria-label="Change Search"
    on:click={() => searchMenu.setOpen(true)}>manage_search</IconButton
  >
  <Menu bind:this={searchMenu}>
    <List>
      {#if $searchEngineList !== null}
        <SelectionGroup>
          {#each $searchEngineList as engine}
            <Item
              on:SMUI:action={() => selectSearchEngine(engine)}
              selected={selectSearchEngine === engine}
            >
              <SelectionGroupIcon>
                <i class="material-icons">check</i>
              </SelectionGroupIcon>
              <Text>{engine}</Text>
            </Item>
          {/each}
        </SelectionGroup>
        <Separator />
      {/if}
    </List>
  </Menu>
</div>

<div class="model-select-menu">
  <IconButton
    class="material-icons"
    aria-label="Change Model"
    on:click={() => modelMenu.setOpen(true)}>tune</IconButton
  >
  <Menu bind:this={modelMenu}>
    <List>
      {#if $modelList !== null}
        {#each Object.entries($modelList) as [modelName, modelItems]}
          <SelectionGroup>
            <Text>{modelName}</Text>
            {#each modelItems as item}
              <Item
                on:SMUI:action={() => selectModel(item)}
                class="search-engine-list-btn"
                selected={selectedModel === item}
              >
                <SelectionGroupIcon>
                  <i class="material-icons">check</i>
                </SelectionGroupIcon>
                <Text>{item}</Text>
              </Item>
            {/each}
          </SelectionGroup>
        {/each}
      {/if}
    </List>
  </Menu>
  <!-- <Fab on:click={() => clicked++} extended>
    <Label>Extended</Label>
  </Fab> -->
</div>
