<script>
  import '../../../src/app-main.css';
  import { Icons } from './../icons';
  import 'boxicons/css/boxicons.min.css';
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
  import Seperator from './ui/Seperator.svelte';
  import { writable } from 'svelte/store';
  import './SettingsMenu.scss';

  let selectedProject;
  let selectedModel;
  let selectedSearchEngine;

  let projectButton = 'project-button';
  let modelButton = 'model-button';
  let searchEngineButton = 'search-engine-button';

  let closeIconSelectVisible = {
    [projectButton]: false,
    [modelButton]: false,
    [searchEngineButton]: false,
  };

  // const projectList = writable([
  //   'Project 1',
  //   'Project 2',
  //   'Project 3',
  //   'Project 4',
  //   'Project 5',
  // ]);
  // const searchEngineList = writable([
  //   'Project 1',
  //   'Project 2Project 2Project 2',
  //   'Project 2Project 2Project 2',
  //   'Project 3',
  //   'Project 4',
  //   'Project 5',
  // ]);
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
  const checkListAndSetItem = (list, itemKey, defaultItem) => {
    if (get(list) && get(list).length > 0) {
      const item = localStorage.getItem(itemKey);
      return item ? item : defaultItem;
    } else {
      localStorage.setItem(itemKey, '');
      return defaultItem;
    }
  };

  selectedProject = checkListAndSetItem(
    projectList,
    'selectedProject',
    'Select Project'
  );
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
  console.log('selectedSearchEngine', selectedSearchEngine);
  function selectProject(project) {
    selectedProject = project;
    localStorage.setItem('selectedProject', project);
    fetchMessages();
    fetchAgentState();
    fetchProjectFiles();
    document.getElementById('project-dropdown').classList.add('hidden');
  }

  function selectModel(model) {
    selectedModel = `${model[0]}`;
    localStorage.setItem('selectedModel', model[1]);
    document.getElementById('model-dropdown').classList.add('hidden');
  }

  function selectSearchEngine(searchEngine) {
    selectedSearchEngine = searchEngine;
    localStorage.setItem('selectedSearchEngine', searchEngine);
    document.getElementById('search-engine-dropdown').classList.add('hidden');
  }

  async function createNewProject() {
    const projectName = prompt('Enter the project name:');
    if (projectName) {
      await createProject(projectName);
      61(projectName);
    }
  }
  async function deleteproject(project) {
    if (confirm(`Are you sure you want to delete ${project}?`)) {
      await deleteProject(project);
      await fetchInitialData();
      messages.set([]);
      agentState.set(null);
      tokenUsage.set(0);
      selectedProject = 'Select Project';
      localStorage.setItem('selectedProject', '');
    }
  }

  const dropdowns = [
    {
      dropdown: 'project-dropdown',
      button: projectButton,
    },
    {
      dropdown: 'model-dropdown',
      button: modelButton,
    },
    {
      dropdown: 'search-engine-dropdown',
      button: searchEngineButton,
    },
  ];

  function closeDropdowns(event) {
    dropdowns.forEach(({ dropdown, button }) => {
      const dropdownElement = document.getElementById(dropdown);
      const buttonElement = document.getElementById(button);

      if (
        dropdownElement &&
        buttonElement &&
        !dropdownElement.contains(event.target) &&
        !buttonElement.contains(event.target)
      ) {
        dropdownElement.classList.add('hidden');
        closeIconSelectVisible[button] = false;
      }
    });
  }
  onMount(() => {
    dropdowns.forEach(({ dropdown, button }) => {
      document.getElementById(button).addEventListener('click', function () {
        const dropdownElement = document.getElementById(dropdown);
        closeIconSelectVisible[button] = !closeIconSelectVisible[button];

        dropdownElement.classList.toggle('hidden');
      });
    });
    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  });
  console.log('closeIconSelectVisible', closeIconSelectVisible);
  console.log('internet', internet);
</script>

<nav class="menu card-frame">
  <ul class="menu-bar">
    <li>
      <div class="dropdown-menu relative inline-block">
        <button
          type="button"
          class="btn btn-drowdown-elements"
          id="project-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span id="selected-project">{selectedProject}</span>

          {#if closeIconSelectVisible[projectButton]}
            <i class="fas fa-angle-up text-tertiary"></i>
          {:else}
            <i class="fas fa-angle-down text-tertiary"></i>
          {/if}
        </button>
        <div
          id="project-dropdown"
          class="dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="project-button"
          tabindex="-1"
        >
          <div role="none" class="flex flex-col divide-y-2 w-full">
            <button
              class="btn btn-drowdown-elements"
              on:click|preventDefault={createNewProject}
            >
              <i class="fas fa-plus"></i>
              new project
            </button>

            {#if $projectList !== null}
              {#each $projectList as project}
                <div class="btn btn-drowdown-elements">
                  <button
                    class="peoject_name"
                    href="#"
                    on:click|preventDefault={() => selectProject(project)}
                  >
                    {project}
                  </button>
                  <button
                    class="peoject-icon fa-regular fa-trash-can hover:text-red-600"
                    on:click={() => deleteproject(project)}
                    aria-label="Delete project"
                  ></button>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </li>
    <Seperator />
    <li>
      <div class="dropdown-menu relative inline-block">
        <!-- <div> -->
        <button
          type="button"
          class="btn btn-drowdown-elements"
          id="search-engine-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span id="selected-search-engine">{selectedSearchEngine}</span>
          {#if closeIconSelectVisible[searchEngineButton]}
            <i class="fas fa-angle-up text-tertiary"></i>
          {:else}
            <i class="fas fa-angle-down text-tertiary"></i>
          {/if}
        </button>
        <!-- </div> -->

        <div
          id="search-engine-dropdown"
          class="dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="search-engine-button"
          tabindex="-1"
        >
          <div role="none" class="flex flex-col divide-y-2 w-full">
            {#if $searchEngineList !== null}
              {#each $searchEngineList as engine}
                <div
                  class="btn btn-drowdown-elements {selectSearchEngine ===
                  engine
                    ? 'bg-gray-300'
                    : ''}"
                >
                  <button
                    class="search-engine-list-btn"
                    on:click|preventDefault={() => selectSearchEngine(engine)}
                  >
                    {engine}
                  </button>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </li>
    <Seperator />
    <li>
      <div class="dropdown-menu relative inline-block">
        <button
          type="button"
          class="btn btn-drowdown-elements"
          id="model-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span id="selected-model">{selectedModel}</span>
          {#if closeIconSelectVisible[modelButton]}
            <i class="fas fa-angle-up text-tertiary"></i>
          {:else}
            <i class="fas fa-angle-down text-tertiary"></i>
          {/if}
        </button>

        <div
          id="model-dropdown"
          class="dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="model-button"
          tabindex="-1"
        >
          {#if $modelList !== null}
            <div class="flex flex-col divide-y-2">
              {#each Object.entries($modelList) as [modelName, modelItems]}
                <div class="flex flex-col divide-y-4" role="none">
                  <span class="W-full modal-dd-header"
                    >{modelName.toLowerCase()}</span
                  >
                  <div class="flex flex-col w-full divide-y-2">
                    {#each modelItems as models}
                      <div
                        class="btn btn-drowdown-elements {selectedModel ==
                          `${models[0]} (${models[1]})` ||
                        selectedModel == models[1]
                          ? 'bg-gray-300'
                          : ''}"
                      >
                        <button
                          class="search-engine-list-btn"
                          on:click|preventDefault={() => selectModel(models)}
                        >
                          {models[0]}
                          <span class="tooltip text-[10px] px-2 text-gray-500"
                            >{models[1]}</span
                          >
                        </button>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </li>
    <Seperator />
  </ul>
</nav>
