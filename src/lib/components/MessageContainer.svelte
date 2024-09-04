<script>
  import { messages } from "$lib/store";
  import { afterUpdate } from "svelte";

  let messageContainer;
  let previousMessageCount = 0;
  
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
    {#each $messages as message}
      <div class="flex items-start gap-2 px-2 py-4">
        {#if message.from_LookAI}
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
              {message.from_LookAI ? "LookAI" : "You"}
              <span class="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </p>
          {#if message.from_LookAI}
              <div
                  class="w-full bg-blue-300 p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                  bind:innerHTML={message.message}>
              </div>
          {:else if /https?:\/\/[^\s]+/.test(message.message)}
              <div class="w-full cursor-auto" contenteditable="false">
                  {@html message.message.replace(
                      /(https?:\/\/[^\s]+)/g,
                      '<u><a href="$1" target="_blank" style="font-weight: bold;">$1</a></u>')}
              </div>
          {:else}
              <div
                  class="w-full bg-green-100 p-4 rounded-lg leading-relaxed text-gray-800"
                  contenteditable="false"
                  bind:innerHTML={message.message}
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
</style>
