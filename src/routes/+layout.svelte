<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import NewSidebar from '$lib/components/NewSidebar.svelte';
  import Navbar from '$lib/components/Navbar2.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import '../app-main.css';
</script>

<main>
  <div>
    <Navbar />
    <div class="h-dvh flex app-container">
      <Toaster />
      <ModeWatcher />
      <div>
        <NewSidebar />
      </div>
      <slot />
    </div>
  </div>
</main>
