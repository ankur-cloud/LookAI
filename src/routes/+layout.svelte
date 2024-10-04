<script>
  import NewSidebar from '$lib/components/NewSidebar.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import '../app-main.css';
</script>

<main>
  <div class="app-container">
    <Navbar />
    <section class="app-content">
      <Toaster />
      <ModeWatcher />
      <div>
        <NewSidebar />
      </div>
      <slot />
    </section>
  </div>
</main>
