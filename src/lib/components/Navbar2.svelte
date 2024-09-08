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

<header id="nav-menu" aria-label="navigation bar">
  <div class="container">
    <div class="nav-start">
      <a class="logo" href="/">
        <i class="icon">{@html Icons.HOME}</i>
      </a>
      <nav class="menu">
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
                    class="btn-drowdown-elements"
                    on:click|preventDefault={createNewProject}
                  >
                    <i class="fas fa-plus"></i>
                    new project 1
                  </button>
                  <button
                    class="btn-drowdown-elements"
                    on:click|preventDefault={createNewProject}
                  >
                    <i class="fas fa-plus"></i>
                    new project2
                  </button>

                  {#if $projectList !== null}
                    {#each $projectList as project}
                      <div
                        class="flex items-center px-4 hover:bg-black/20 transition-colors"
                      >
                        <button
                          href="#"
                          class="flex gap-2 items-center text-sm py-3 w-full h-full overflow-x-visible"
                          on:click|preventDefault={() => selectProject(project)}
                        >
                          {project}
                        </button>
                        <button
                          class="fa-regular fa-trash-can hover:text-red-600"
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
            <div class="dropdown-menu relative inline-block text-left">
              <div>
                <button
                  type="button"
                  class="btn btn-drowdown-elements"
                  id="search-engine-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <span id="selected-search-engine">{selectedSearchEngine}</span
                  >
                  {#if closeIconSelectVisible[searchEngineButton]}
                    <i class="fas fa-angle-up text-tertiary"></i>
                  {:else}
                    <i class="fas fa-angle-down text-tertiary"></i>
                  {/if}
                </button>
              </div>

              <div
                id="search-engine-dropdown"
                class="absolute left-0 z-10 mt-2 origin-top-right min-w-[200px] bg-secondary rounded-xl shadow-lg max-h-96 overflow-y-auto hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="search-engine-button"
                tabindex="-1"
              >
                <div role="none" class="flex flex-col divide-y-2 w-full">
                  {#if $searchEngineList !== null}
                    {#each $searchEngineList as engine}
                      <div
                        class="flex items-center px-4 hover:bg-black/20 transition-colors
                    {selectSearchEngine === engine ? 'bg-gray-300' : ''}"
                      >
                        <button
                          class="flex gap-2 items-center text-sm py-3 w-full text-clip"
                          on:click|preventDefault={() =>
                            selectSearchEngine(engine)}
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
            <div class="dropdown-menu relative inline-block text-left">
              <div>
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
              </div>

              <div
                id="model-dropdown"
                class="absolute right-0 z-10 mt-2 w-64 origin-top-right bg-secondary rounded-xl shadow-lg max-h-96 overflow-y-auto hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="model-button"
                tabindex="-1"
              >
                {#if $modelList !== null}
                  <div class="flex flex-col divide-y-2">
                    {#each Object.entries($modelList) as [modelName, modelItems]}
                      <div class="flex flex-col py-4 gap-2" role="none">
                        <span class="text-sm px-4 w-full font-semibold"
                          >{modelName.toLowerCase()}</span
                        >
                        <div class="flex flex-col gap-[1px] px-6 w-full">
                          {#each modelItems as models}
                            <button
                              class="relative nav-button flex text-start text-sm text-clip hover:bg-black/20 px-2 py-1.5 rounded-md
                            transition-colors {selectedModel ==
                                `${models[0]} (${models[1]})` ||
                              selectedModel == models[1]
                                ? 'bg-gray-300'
                                : ''}"
                              on:click|preventDefault={() =>
                                selectModel(models)}
                            >
                              {models[0]}
                              <span
                                class="tooltip text-[10px] px-2 text-gray-500"
                                >{models[1]}</span
                              >
                            </button>
                          {/each}
                        </div>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>

    <div class="nav-end">
      <div class="right-container">
        <div class="flex items-center gap-2 text-sm">
          <span>Token Usage:</span>
          <span id="token-count" class="token-count-animation text-foreground"
            >{$tokenUsage}</span
          >
        </div>
        <Seperator />
        <div class="" style="display: flex; align-items: center; gap: 20px">
          <div class="flex items-center gap-2 text-sm">
            <span>Internet:</span>
            <span
              class="size-3 rounded-full green-dot"
              class:online={$internet}
              class:offline={!$internet}
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  .btn {
    text-align: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    min-width: var(--btn-item-width);
    align-items: center;
    height: 2rem;
    justify-content: space-between;
    color: var(--dark-grey);
  }
  .btn-drowdown-elements {
    display: inline-flex;
    background-color: var(--white);
    color: var(--dark-grey);
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    border-radius: var(--border-radius);
    font-size: x-small;

    width: fit-content;
  }
  .btn-drowdown-elements .selected-project {
    font-size: x-small;
  }

  .menu {
    top: 25%;
    position: relative;
  }
  .menu-bar {
    gap: 0.5rem;
  }
  .logo {
    /* margin-right: 1.5rem; */
    width: 12rem;
  }

  #nav-menu {
    border-bottom: var(--border);
  }

  .hidden {
    background-color: brown;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    column-gap: 2rem;
    height: 6rem;
    padding: 1.2rem 3rem;
    background: linear-gradient(
      135deg,
      rgba(2, 5, 112, 1) 60%,
      rgb(38, 118, 216)
    );
    -webkit-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
    color: rgb(2, 5, 112);
  }

  .nav-start,
  .nav-end,
  .menu-bar,
  .right-container {
    display: flex;
    align-items: center;
    color: var(--white);
    height: 100%;
  }

  .dropdown {
    background-color: var(--white);
    border-radius: var(--border-radius);
    overflow-y: auto;
    transform-origin: top left;
    min-width: var(--btn-item-width);
    max-height: 24rem;
    margin-top: 0.5rem;
    position: absolute;
    left: 0px;
    opacity: 1;
    /* transform: scale(0.97) translateX(-5px); */
    box-shadow: var(--shadow);
    transition: 0.1s ease-in-out;
    z-index: 100;
  }

  .right-container {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
  .right-container span {
    font-size: small;
    font-weight: 500;
    color: var(--white);
  }
  .green-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #00f00c;
    border-radius: 50%;
  }
  @media (max-width: 1100px) {
    .container {
      padding: 1.2rem;
    }

    .dropdown {
      display: none;
      min-width: 100%;
      border: none !important;
      border-radius: var(--border-radius);
      position: static;
      top: 0;
      left: 0;
      visibility: visible;
      opacity: 1;
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 600px) {
    .right-container {
      display: none;
    }
  }
</style>
