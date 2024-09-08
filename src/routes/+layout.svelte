<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Navbar from '$lib/components/Navbar2.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import '../app-main.css';
</script>

<main>
  <div>
    <Navbar />
    <div class="h-dvh w-full flex app-container">
      <Toaster />
      <ModeWatcher />
      <div>
        <Sidebar />
      </div>
      <slot />
    </div>
  </div>
</main>
