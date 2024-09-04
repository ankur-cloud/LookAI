<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { ModeWatcher } from "mode-watcher";
  import "../app.pcss";
</script>

<main>
  <div class="h-dvh w-full flex app-container">
      <Toaster />
      <ModeWatcher />
      <Sidebar />
      <slot />
  </div>
</main>

<style>
  .app-container {
    background: linear-gradient(to bottom right, rgba(74, 74, 74), transparent);
  }
</style>