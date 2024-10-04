<script>
  import '../../../src/app-main.css';
  import { Icons } from './../icons';
  import 'boxicons/css/boxicons.min.css';
  import { tokenUsage } from '$lib/store';
  import './Navbar.scss';

  // let selectedProject;
  // let selectedModel;
  // let selectedSearchEngine;

  // let projectButton = 'project-button';
  // let modelButton = 'model-button';
  // let searchEngineButton = 'search-engine-button';

  // let closeIconSelectVisible = {
  //   [projectButton]: false,
  //   [modelButton]: false,
  //   [searchEngineButton]: false,
  // };

  // const checkListAndSetItem = (list, itemKey, defaultItem) => {
  //   if (get(list) && get(list).length > 0) {
  //     const item = localStorage.getItem(itemKey);
  //     return item ? item : defaultItem;
  //   } else {
  //     localStorage.setItem(itemKey, '');
  //     return defaultItem;
  //   }
  // };

  // selectedProject = checkListAndSetItem(
  //   projectList,
  //   'selectedProject',
  //   'Select Project'
  // );
  // selectedModel = checkListAndSetItem(
  //   modelList,
  //   'selectedModel',
  //   'Select Model'
  // );
  // selectedSearchEngine = checkListAndSetItem(
  //   searchEngineList,
  //   'selectedSearchEngine',
  //   'Select Search Engine'
  // );

  // function selectProject(project) {
  //   selectedProject = project;
  //   localStorage.setItem('selectedProject', project);
  //   fetchMessages();
  //   fetchAgentState();
  //   fetchProjectFiles();
  //   document.getElementById('project-dropdown').classList.add('hidden');
  // }

  // function selectModel(model) {
  //   selectedModel = `${model[0]}`;
  //   localStorage.setItem('selectedModel', model[1]);
  //   document.getElementById('model-dropdown').classList.add('hidden');
  // }

  // function selectSearchEngine(searchEngine) {
  //   selectedSearchEngine = searchEngine;
  //   localStorage.setItem('selectedSearchEngine', searchEngine);
  //   document.getElementById('search-engine-dropdown').classList.add('hidden');
  // }

  // async function createNewProject() {
  //   const projectName = prompt('Enter the project name:');
  //   if (projectName) {
  //     await createProject(projectName);
  //     61(projectName);
  //   }
  // }
  // async function deleteproject(project) {
  //   if (confirm(`Are you sure you want to delete ${project}?`)) {
  //     await deleteProject(project);
  //     await fetchInitialData();
  //     messages.set([]);
  //     agentState.set(null);
  //     tokenUsage.set(0);
  //     selectedProject = 'Select Project';
  //     localStorage.setItem('selectedProject', '');
  //   }
  // }

  // const dropdowns = [
  //   {
  //     dropdown: 'project-dropdown',
  //     button: projectButton,
  //   },
  //   {
  //     dropdown: 'model-dropdown',
  //     button: modelButton,
  //   },
  //   {
  //     dropdown: 'search-engine-dropdown',
  //     button: searchEngineButton,
  //   },
  // ];

  // function closeDropdowns(event) {
  //   dropdowns.forEach(({ dropdown, button }) => {
  //     const dropdownElement = document.getElementById(dropdown);
  //     const buttonElement = document.getElementById(button);

  //     if (
  //       dropdownElement &&
  //       buttonElement &&
  //       !dropdownElement.contains(event.target) &&
  //       !buttonElement.contains(event.target)
  //     ) {
  //       dropdownElement.classList.add('hidden');
  //       closeIconSelectVisible[button] = false;
  //     }
  //   });
  // }
  // onMount(() => {
  //   dropdowns.forEach(({ dropdown, button }) => {
  //     document.getElementById(button).addEventListener('click', function () {
  //       const dropdownElement = document.getElementById(dropdown);
  //       closeIconSelectVisible[button] = !closeIconSelectVisible[button];

  //       dropdownElement.classList.toggle('hidden');
  //     });
  //   });
  //   document.addEventListener('click', closeDropdowns);
  //   return () => {
  //     document.removeEventListener('click', closeDropdowns);
  //   };
  // });
  // console.log('closeIconSelectVisible', closeIconSelectVisible);
  // console.log('internet', internet);
</script>

<header id="nav-menu" aria-label="navigation bar">
  <div class="container">
    <div class="nav-start">
      <a class="logo" href="/">
        <i class="icon">{@html Icons.HOME}</i>
      </a>
      <!-- <nav class="menu">
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
      </nav> -->
    </div>

    <div class="nav-end">
      <div class="right-container">
        <div class="flex items-center gap-2 text-sm">
          <span>Token Usage:</span>
          <span id="token-count" class="token-count-animation text-foreground"
            >{$tokenUsage}</span
          >
        </div>
      </div>
    </div>
  </div>
</header>
