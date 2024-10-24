<script lang="ts">
  import type { Action } from '@smui/banner';
  import Banner, { Label } from '@smui/banner';
  import Button from '@smui/button';
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import '../../../src/app-main.css';
  import { Icons } from './../icons';
  import 'boxicons/css/boxicons.min.css';
  import { onDestroy, onMount } from 'svelte';
  import {
    // projectList,
    // modelList,
    internet,
    tokenUsage,
    agentState,
    messages,
    // searchEngineList,
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
  import Select, { Option } from '@smui/select';
  import Icon from '@smui/select/icon';
  import Checkbox from '@smui/checkbox';
  import IconButton from '@smui/icon-button';
  import LinearProgress from '@smui/linear-progress';
  import FormField from '@smui/form-field';

  import { createEventDispatcher } from 'svelte';
  import { Steps } from 'svelte-steps';

  let selectedProject: string;

  const projectList = writable([
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4',
    'Project 5',
  ]);

  const checkListAndSetItem = (
    list: any,
    itemKey: string,
    defaultItem: string
  ) => {
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

  function selectProject(project: string) {
    console.log('selectProject', project);
    selectedProject = project;
    localStorage.setItem('selectedProject', project);
    fetchMessages();
    fetchAgentState();
    fetchProjectFiles();
  }

  async function createNewProject() {
    const projectName = prompt('Enter the project name:');
    if (projectName) {
      await createProject(projectName);
      projectName;
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

  const actions = {
    [0]: 'Primary',
    [1]: 'Secondary',
    [2]: 'Unknown',
  };
  let action = 'None yet';

  function handleActionClicked(event: CustomEvent<{ action: Action }>) {
    action = actions[event.detail.action];
  }

  let open = true;
  const dispatch = createEventDispatcher();

  function handleProjectChange(event) {
    console.log('handleProjectChange', event);
    // event.preventDefault();
    const value = event.target.value;
    console.log('valuevalue', value);
    if (value === 'new project') {
      createNewProject();
    } else {
      selectProject(value);
    }
    // dispatch('change', { target: { value } });
  }

  let progress = 0;
  let closed = false;
  let timer;

  onMount(reset);

  onDestroy(() => {
    clearInterval(timer);
  });

  function reset() {
    progress = 0;
    closed = false;
    clearInterval(timer);
    timer = setInterval(() => {
      progress += 0.01;

      if (progress >= 1) {
        progress = 1;
        closed = true;
        clearInterval(timer);
      }
    }, 100);
  }

  const steps = [
    {
      text: 'Business Requirement',
      code: 'BR',
    },
    {
      text: 'Technical Specification',
      code: 'TS',
    },
    {
      text: 'Code Generation',
      code: 'CG',
    },
    {
      text: 'Test Data Generation',
      code: 'TSTC',
    },
    {
      text: 'Release details',
      code: 'RELDET',
    },
    {
      text: ' ',
      code: 'RELDfET',
    },
  ];
</script>

<Banner bind:open autoClose={false} style="height: 3rem;">
  <svelte:fragment slot="actions">
    <Select
      key={(value) => `${value == null ? '' : value}`}
      class="shaped-outlined"
      variant="outlined"
      bind:value={selectedProject}
    >
      <Option value="new project" on:click={createNewProject}>
        <i class="fas fa-plus"></i> <span>New Project</span></Option
      >
      {#if $projectList !== null}
        {#each $projectList as project}
          <Option value={project} on:click={() => selectProject(project)}
            >{project}</Option
          >
        {/each}
      {/if}
    </Select>
    <Steps
      {steps}
      size="2rem"
      line="2rem"
      alert
      alertColor={'#ff00ff'}
      current={3}
      clickable={false}
    />
  </svelte:fragment>
</Banner>

<style>
  /* .testsssss {
    background-color: brown;
  } */
</style>
