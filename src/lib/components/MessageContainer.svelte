<script>
  import { messages } from '$lib/store';
  import { afterUpdate, onMount } from 'svelte';

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
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
  ];

  // Populate the messages store with dummy data on mount

  // onMount(() => {
  //   messages.set(dummyMessages);
  // });

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
  {#if $messages !== null}
    <div class="flex flex-col divide-y-2">
      {#each $messages as messageObj}
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
              {#if isJsonString(messageObj?.message?.json_string)}
                <div
                  class="shadow wrapJson w-full background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  {#if JSON.parse(messageObj.message.json_string)[0].operation === 'write'}
                    <p>
                      Writing to
                      <span class="italic">
                        {JSON.parse(messageObj.message.json_string)[0].path}
                      </span>
                    </p>
                  {/if}

                  <pre class="mt-4">
                            <code contenteditable="false"
                      >{JSON.parse(messageObj.message.json_string)[0]
                        .code}</code
                    >
                </pre>
                </div>
              {:else if typeof messageObj.message === 'object'}
                <div
                  class="w-full shadow wrapJson background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  <pre>{JSON.stringify(messageObj.message, null, 2)}</pre>
                </div>
              {:else if typeof messageObj.message === 'string'}
                <div
                  class="w-full shadow wrapJson background-primary-theme p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                >
                  <pre
                    class="mt-4"
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
  .shadow wrapJson {
    overflow-wrap: break-word;
    word-wrap: break-word;
    /* white-space: pre-wrap;   */
    overflow: auto;
  }
</style>
