<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/utils/theme';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  function toggleTheme() {
    theme.update(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  $: if (mounted) {
    document.body.className = $theme === 'light' ? 'light-theme' : '';
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme} 
  aria-label={$theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
>
  {#if $theme === 'dark'}
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    background-color: transparent;
    color: var(--text-primary);
    transition: all 0.2s ease;
    padding: 0;
  }

  .theme-toggle:hover {
    background-color: var(--bg-tertiary);
    color: var(--accent-primary);
  }
</style>