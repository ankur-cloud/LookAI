<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import {
    projectList,
    modelList,
    internet,
    tokenUsage,
    agentState,
    messages,
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
  import Fab, { Icon } from '@smui/fab';

  import './SettingsMenu.scss';

  let selected1 = 'Red';
  let selected2 = 'Red';

  let selectedModel;
  let selectedSearchEngine;

  let modelMenu;
  let searchMenu;

  // const modelList = writable({
  //   'Model Category 1': [
  //     ['Model 1', 'v1.0'],
  //     ['Model 2', 'v2.0'],
  //     ['Model 3', 'v3.0'],
  //   ],
  //   'Model Category 2': [
  //     ['Model 4', 'v1.0'],
  //     ['Model 5', 'v2.0'],
  //     ['Model 6', 'v3.0'],
  //   ],
  //   'Model Category 3': [
  //     ['Model 7', 'v1.0'],
  //     ['Model 8', 'v2.0'],
  //     ['Model 9', 'v3.0'],
  //   ],
  // });

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
