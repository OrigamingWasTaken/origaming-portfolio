<script>
    import '../app.css';
    import { theme } from '$lib/utils/theme';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    onMount(() => {
      // Initialize theme based on user preference if not set
      if (browser && !localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme.set(prefersDark ? 'dark' : 'light');
      }
    });
  </script>
  
  <slot />