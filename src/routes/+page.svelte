<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { windowStore, type WindowState } from '$lib/store/appStore';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Window from '$lib/components/Window.svelte';
  import DesktopIcon from '$lib/components/DesktopIcon.svelte';
  import TerminalApp from '$lib/components/TerminalApp.svelte';
  import PhotoApp from '$lib/components/PhotoApp.svelte';
  import ImageViewer from '$lib/components/ImageViewer.svelte';
  import TextEditor from '$lib/components/TextEditor.svelte';
  
  // Subscribe to window store
  let windows: WindowState[] = [];
  
  // File content for info.txt
  const infoTxtContent = `# Origaming
  
Name: Origaming (she/he)
Role: Fullstack Developer

## About Me
I'm a passionate fullstack developer who loves building web applications and games. 
I specialize in JavaScript, TypeScript, and Python.
When I'm not coding, I enjoy playing the drums and cycling.

## Technical Skills
- Frontend: JavaScript, TypeScript, React, Svelte, Next.js
- Backend: Node.js, Python, Bash
- Tools: Git, Docker, VSCode

## Contact
- GitHub: https://github.com/origaming
- Email: contact@origaming.dev

## Current Goals
Learning Rust 🦀 and exploring WebAssembly technologies.
`;
  
  onMount(() => {
    const unsubscribe = windowStore.subscribe(value => {
      windows = value;
    });
    
    return unsubscribe;
  });
  
  // Component mapping
  const components = {
    TerminalApp,
    PhotoApp,
    ImageViewer,
    TextEditor
  };
</script>

<svelte:head>
  <title>Origaming | Developer</title>
  <meta name="description" content="Personal developer site of Origaming" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main class="desktop">
  <div class="topbar">
    <div class="menu">
      <div class="logo">Origaming</div>
    </div>
    <div class="status">
      <div class="theme-toggle-container">
        <ThemeToggle />
      </div>
    </div>
  </div>
  
  <div class="desktop-area">
    <!-- Decorative elements for the wallpaper -->
    <div class="wallpaper-overlay"></div>
    
    <!-- Desktop Icons -->
    <DesktopIcon 
      id="terminal"
      title="Terminal"
      iconType="terminal"
      component="TerminalApp"
    />
    
    <DesktopIcon 
      id="photos"
      title="Photos"
      iconType="photos"
      component="PhotoApp"
    />
    
    <DesktopIcon 
      id="info-txt"
      title="info.txt"
      iconType="text"
      component="TextEditor"
      props={{ initialContent: infoTxtContent }}
    />
    
    <!-- Windows -->
    {#each windows.filter(w => w.isOpen && !w.isMinimized) as window (window.id)}
      <Window 
        id={window.id}
        title={window.title}
        zIndex={window.zIndex}
        position={window.position}
        isMaximized={window.isMaximized}
      >
        <svelte:component 
          this={components[window.component]} 
          {...window.props || {}} 
        />
      </Window>
    {/each}
  </div>
</main>

<style>
  .desktop {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-primary);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .topbar {
    height: 28px;
    background-color: var(--bg-secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid var(--border-color);
    position: relative;
    z-index: 9999;
  }
  
  .logo {
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--text-primary);
  }
  
  .theme-toggle-container {
    display: flex;
    align-items: center;
    height: 100%;
  }
  
  .desktop-area {
    flex: 1;
    position: relative;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 90px);
    grid-template-rows: repeat(auto-fill, 100px);
    grid-auto-flow: column;
    gap: 1rem;
    align-content: start;
    background: linear-gradient(135deg, 
               var(--bg-primary) 0%, 
               var(--bg-secondary) 50%,
               var(--accent-primary) 200%);
    background-size: cover;
    background-position: center;
  }
  
  .wallpaper-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 75% 25%, 
                 color-mix(in srgb, var(--accent-primary) 15%, transparent) 5%, 
                 transparent 40%),
               radial-gradient(circle at 25% 75%, 
                 color-mix(in srgb, var(--accent-tertiary) 15%, transparent) 5%, 
                 transparent 40%);
    pointer-events: none;
    z-index: 0;
  }
  
  /* Responsive grid for desktop icons */
  @media (max-width: 768px) {
    .desktop-area {
      grid-template-columns: repeat(auto-fill, 80px);
      grid-template-rows: repeat(auto-fill, 90px);
      padding: 0.5rem;
      gap: 0.5rem;
    }
  }
</style>