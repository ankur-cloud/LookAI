<script lang="ts">
  import '../../../src/app-main.css';
  import 'boxicons/css/boxicons.min.css';
  import { tokenUsage, agentState, messages } from '$lib/store';
  import {
    createProject,
    fetchMessages,
    fetchInitialData,
    deleteProject,
    fetchAgentState,
    fetchProjectFiles,
  } from '$lib/api';

  import { get } from 'svelte/store';
  import { writable } from 'svelte/store';
  import './SettingsMenu.scss';
  import IconButton from '@smui/icon-button';
  import Menu from '@smui/menu';
  import List, { Item, Text } from '@smui/list';
  import Button, { Label, Icon } from '@smui/button';
  import Banner from '@smui/banner';

  import { Steps } from 'svelte-steps';

  let selectedProject: string;
  let tempPL = [];
  for (let i = 0; i < 20; i++) {
    tempPL.push(`Project ${i + 1}`);
  }
  const projectList = writable(tempPL);

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
      selectProject(projectName);
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

  let bannerOpen = true;
  // $: {
  //   bannerOpen = $page.url.pathname === '/';
  // }

  let projectMenu;
</script>

<Banner bind:open={bannerOpen} autoClose={false} style="height: 3rem;">
  <svelte:fragment slot="actions">
    <div style="min-width: 150px;">
      <Button on:click={() => projectMenu.setOpen(true)} variant="outlined">
        <Label>{selectedProject}</Label>
      </Button>
      <Menu bind:this={projectMenu} class="project-menu">
        <List>
          <Item selected={selectedProject === 'New Project'}>
            <Button on:click={createNewProject}>
              <Text>New Project</Text>
              <Icon class="material-icons">add</Icon>
            </Button>
          </Item>
          {#if $projectList !== null}
            {#each $projectList as project}
              <Item selected={selectedProject === project}>
                <Button on:click={() => selectProject(project)}>
                  <Text>{project}</Text>
                </Button>
                <IconButton
                  class="material-icons"
                  ripple={false}
                  on:click={deleteproject}
                >
                  delete</IconButton
                >
              </Item>
            {/each}
          {/if}
        </List>
      </Menu>
    </div>

    <Steps
      {steps}
      size="2rem"
      line="2rem"
      alertColor={'#ff00ff'}
      current={3}
      clickable={false}
    />
  </svelte:fragment>
</Banner>

<style>
</style>
