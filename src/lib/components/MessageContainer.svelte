<script>
  import { messages } from '$lib/store';
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function jsonString(str) {
    try {
      const parsedStr = JSON.parse(str);
      return parsedStr;
    } catch (e) {
      return str;
    }
  }

  let messageContainer;
  let previousMessageCount = 0;

  // Dummy data for messages
  const dummyMessages = [
    {
      from_LookAI: true,
      message:
        ' if ($messages && $messages.length > previousMessageCount) if ($messages && $messages.length > previousMessageCount)',
      timestamp: '2024-10-05 20:57:34',
    },
    {
      from_LookAI: true,
      message:
        "To help transform your vision of a student-friendly calculator website into actionable items, let's begin by breaking down the business requirements for the project. Please confirm or elaborate on the details below:\n\n1. **Target Audience:**\n - Primary users are students, likely from high school or college.\n\n2. **Calculator Functionalities:**\n - Basic arithmetic operations (addition, subtraction, multiplication, division)\n - Scientific functions (sine, cosine, tangent, logarithms, etc.)\n - Ability to handle complex numbers and perform trigonometric calculations\n - History feature to view recent calculations\n\n3. **User Interface Design:**\n - Intuitive and user-friendly design\n - Mobile-responsive layout\n - Theme options for different UI styles (e.g., light and dark modes)\n - Clear display of results and operations\n\n4. **Additional Features:**\n - Configuration options for decimal precision\n - Error handling for invalid inputs\n - Accessibility features for diverse user needs\n\n5. **Platform and Compatibility:**\n - Web-based application accessible from any modern browser\n\n6. **Security and Privacy:**\n - Ensure calculations and history are securely handled and private to the user\n\nOnce you confirm these or provide additional details, I can proceed with crafting a user story and breakdown tasks necessary for the development process.",
      timestamp: '2024-10-17 21:14:38',
    },

    {
      from_LookAI: true,
      message: 'From jira_agent to user_prompting_agent\n',
      timestamp: '2024-10-17 21:23:45',
    },
    {
      from_LookAI: true,
      message: {
        instructions:
          'Determ e projects for creating the user story. projects for creating the user story. projects for creating the user story.',
      },
      timestamp: '2024-10-25 21:28:56',
    },
    {
      from_LookAI: false,
      message: 'exit messaegeg',
      timestamp: '2024-10-17 21:23:45',
    },
    {
      from_LookAI: true,
      message: {
        instructions:
          '{"summary": "Finalize Code for App","description": "Finalize the application code after thorough testing and make any necessary adjustments.","issuetype": {"name": "Task"}, "project": {"id": "10066"}}',
      },
      timestamp: '2024-11-01 11:46:34',
    },
    {
      from_LookAI: true,
      message: {
        xczxcxz:
          'User Story 1:\n        title: Student Addition Challenge\n        Description: Create a system for students to input two numbers, calculate the sum, and reward them if correct.\n        issue id: AG-108\n        Project: Agent\n        type:story\n\n        User Story 1 task 1:\n        title: Understanding Requirements for Addition Feature\n        Description: Understand the requirements for a system that allows students to input numbers and receive rewards for correct sums.\n        issue id: AG-109\n        Project: Agent\n        type:task\n\n        User Story 1 task 2:\n        title: Code Generation for Addition Feature\n        Description: Generate the code that implements the addition of two numbers with a student interface.\n        issue id: AG-110\n        Project: Agent\n        type:task\n\n        User Story 1 task 3:\n        title: Execute Student Addition Code\n        Description: Execute the code developed for addition to ensure accuracy and functionality.\n        issue id: AG-111\n        Project: Agent\n        type:task\n\n        User Story 1 task 4:\n        title: Error Handling in Addition Feature\n        Description: Detect and handle any errors that arise during the execution of the addition code.\n        issue id: AG-112\n        Project: Agent\n        type:task\n\n        User Story 1 task 5:\n        title: Generate Test Cases for Addition Feature\n        Description: Create test cases to validate the functionality and robustness of the student addition feature.\n        issue id: AG-113\n        Project: Agent\n        type:task\n\n        User Story 1 task 6:\n        title: Finalize Student Addition Feature\n        Description: Finalize the addition feature after testing and ensure it is ready for deployment.\n        issue id: AG-114\n        Project: Agent\n        type:task\n',
      },
      timestamp: '2024-11-01 11:36:17',
    },
    {
      from_LookAI: true,
      message: {
        json_string:
          '[{"operation": "write", "path": "sum_calculator.py", "code": "def calculate_sum(a, b):\\n    return a + b\\n\\n# Example usage\\nresult = calculate_sum(5, 3)\\nprint(f\'The sum of 5 and 3 is: {result}\')"}]',
      },
      timestamp: '2024-10-27 21:59:20',
    },
  ];

  const getData = (messages) => {
    return messages.map((x) => {
      let tempMsg = x.message;
      let flag = false;

      if (typeof tempMsg === 'object') {
        for (const [key, value] of Object.entries(tempMsg)) {
          if (isJsonString(value)) {
            const parsedValue = JSON.parse(value);
            tempMsg[key] = parsedValue;
            flag = true;
          }
        }
      }

      return {
        ...x,
        message: tempMsg,
        flag: flag,
      };
    });
  };

  let transformedMessages = [];

  const unsubscribe = messages.subscribe((currentMessages) => {
    transformedMessages = getData(currentMessages);
    console.log('Transformed Messages:', transformedMessages);
  });

  onDestroy(() => {
    unsubscribe();
  });

  onMount(() => {
    messages.set(dummyMessages);
  });

  afterUpdate(() => {
    if ($messages && $messages.length > previousMessageCount) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
      previousMessageCount = $messages.length;
    }
  });
</script>

<div
  id="message-container"
  class="flex flex-col flex-1 gap-4 overflow-y-auto rounded-lg p-4"
  bind:this={messageContainer}
>
  {#if transformedMessages !== null}
    <div class="flex flex-col divide-y-2">
      {#each transformedMessages as messageObj}
        <div class="flex items-start gap-2 px-2 py-4">
          {#if messageObj.from_LookAI}
            <img
              src="/assets/LookAI-avatar_23.svg"
              alt="LookAI's Avatar"
              class="flex-shrink-0 rounded-full avatar"
              style="width: 28px; height: 28px;"
            />
          {:else}
            <img
              src="/assets/user-avatar.svg"
              alt="User's Avatar"
              class="flex-shrink-0 rounded-full avatar"
              style="width: 28px; height: 28px;"
            />
          {/if}
          <div class="flex flex-col w-full text-sm">
            <p class="text-xs text-gray-400">
              {messageObj.from_LookAI ? 'LookAI' : 'You'}
              <span class="timestamp"
                >{new Date(messageObj.timestamp).toLocaleTimeString()}</span
              >
            </p>
            {#if messageObj.from_LookAI}
              {#if messageObj?.message?.json_string}
                <div
                  class="shadow wrapJson w-full background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  {#if messageObj.message.json_string[0].operation === 'write'}
                    <p>
                      Writing to
                      <span class="italic">
                        {messageObj.message.json_string[0].path}
                      </span>
                    </p>
                  {/if}

                  <pre class="mt-4">
                            <code contenteditable="false"
                      >{messageObj.message.json_string[0].code}</code
                    >
                </pre>
                </div>
              {:else if typeof messageObj.message === 'object'}
                <div
                  class="w-full shadow wrapJson background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  {#each Object.entries(messageObj.message) as [key, value]}
                    <div>
                      <span>{key}:</span>

                      {#if messageObj.flag}
                        <JsonView json={value} />
                      {:else}
                        <pre>{value}</pre>
                      {/if}
                    </div>
                  {/each}
                </div>
              {:else if typeof messageObj.message === 'string'}
                <div
                  class="w-full shadow wrapJson background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  <pre
                    class="mt-4 wrapJson"
                    bind:innerHTML={messageObj.message}
                    contenteditable="false"></pre>
                </div>
              {/if}
            {:else if /https?:\/\/[^\s]+/.test(messageObj.message)}
              <div class="w-full cursor-auto" contenteditable="false">
                {@html messageObj.message.replace(
                  /(https?:\/\/[^\s]+)/g,
                  '<u><a href="$1" target="_blank" style="font-weight: bold;">$1</a></u>'
                )}
              </div>
            {:else}
              <div
                class="shadow wrapJson w-full p-4 rounded-lg leading-relaxed text-gray-800 shadow background-userMsg"
                contenteditable="false"
                bind:innerHTML={messageObj.message}
              ></div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .timestamp {
    margin-left: 8px;
    font-size: smaller;
    color: #aaa;
  }
  #message-container {
    scrollbar-width: none;
  }

  #message-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }
  .background-primary-theme {
    background-color: var(--primary-color-light);
  }
  .background-userMsg {
    background-color: var(--light-grey);
  }

  .wrapJson {
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow: auto;
    max-height: 350px;
  }

  .wrapJson pre {
    margin: 0;
    overflow: hidden;
    white-space: pre-wrap;
  }
</style>
