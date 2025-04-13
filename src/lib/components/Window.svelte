<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { windowStore, type Position } from '$lib/store/appStore';
  import { fade, fly, scale } from 'svelte/transition';
  
  export let id: string;
  export let title: string;
  export let zIndex: number;
  export let position: Position;
  export let isMaximized: boolean = false;
  export let width: number = 600;
  export let height: number = 450;
  
  let windowElement: HTMLElement;
  let headerElement: HTMLElement;
  let isDragging = false;
  let startPos = { x: 0, y: 0 };
  let startMousePos = { x: 0, y: 0 };
  let viewportWidth: number;
  let viewportHeight: number;
  
  // Terminal should be larger by default
  if (id === 'terminal') {
    width = 1100;
    height = 850;
  }
  
  const dispatch = createEventDispatcher();
  
  function handleHeaderMouseDown(event: MouseEvent) {
    if (isMaximized) return;
    
    // Only initiate drag on left mouse button
    if (event.button !== 0) return;
    
    // Bring window to front first
    windowStore.bringToFront(id);
    
    // Set dragging state
    isDragging = true;
    
    // Store start positions
    startPos = { x: position.x, y: position.y };
    startMousePos = { x: event.clientX, y: event.clientY };
    
    // Prevent text selection during drag
    event.preventDefault();
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    
    // Calculate delta from starting mouse position
    const deltaX = event.clientX - startMousePos.x;
    const deltaY = event.clientY - startMousePos.y;
    
    // Apply delta to starting window position
    let newX = startPos.x + deltaX;
    let newY = startPos.y + deltaY;
    
    // Get window dimensions
    const windowWidth = windowElement.offsetWidth;
    const windowHeight = windowElement.offsetHeight;
    
    // Constrain to viewport
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    
    // Don't allow windows to be dragged completely off-screen
    // Keep at least 100px of the window visible
    newX = Math.max(-windowWidth + 100, Math.min(newX, viewportWidth - 100));
    newY = Math.max(0, Math.min(newY, viewportHeight - 50));
    
    // Update position in store
    windowStore.updatePosition(id, { x: newX, y: newY });
    
    // Prevent default to avoid text selection
    event.preventDefault();
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function handleWindowClick() {
    windowStore.bringToFront(id);
  }
  
  function handleResize() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    
    // If window is off-screen after resize, adjust position
    if (windowElement) {
      const windowWidth = windowElement.offsetWidth;
      const windowHeight = windowElement.offsetHeight;
      
      let newX = position.x;
      let newY = position.y;
      let needsUpdate = false;
      
      // If window extends too far right
      if (newX + 100 > viewportWidth) {
        newX = Math.max(0, viewportWidth - windowWidth);
        needsUpdate = true;
      }
      
      // If window extends too far down
      if (newY + 50 > viewportHeight) {
        newY = Math.max(0, viewportHeight - windowHeight);
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        windowStore.updatePosition(id, { x: newX, y: newY });
      }
    }
  }
  
  function close() {
    windowStore.closeWindow(id);
  }
  
  function minimize() {
    windowStore.minimizeWindow(id);
  }
  
  function maximize() {
    windowStore.maximizeWindow(id);
  }
  
  onMount(() => {
    // Set up global mouse events for dragging
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);
    
    // Set initial viewport dimensions
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    
    // Adjust initial position if off-screen
    handleResize();
    
    // Set initial focus (bring to front)
    windowStore.bringToFront(id);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div 
  class="window" 
  class:maximized={isMaximized}
  style="
    left: {isMaximized ? 0 : position.x}px; 
    top: {isMaximized ? 0 : position.y}px; 
    z-index: {zIndex};
    width: {isMaximized ? '100%' : width + 'px'};
    height: {isMaximized ? '100%' : height + 'px'};
  "
  bind:this={windowElement}
  on:click={handleWindowClick}
  in:scale={{ duration: 200, start: 0.95, opacity: 0 }}
  out:scale={{ duration: 150, start: 0.97, opacity: 0 }}
>
  <div 
    class="window-header"
    bind:this={headerElement}
    on:mousedown={handleHeaderMouseDown}
  >
    <div class="window-controls">
      <button class="control close" on:click={close} aria-label="Close window">
        <span class="control-icon"></span>
      </button>
      <button class="control minimize" on:click={minimize} aria-label="Minimize window">
        <span class="control-icon"></span>
      </button>
      <button class="control maximize" on:click={maximize} aria-label="Maximize window">
        <span class="control-icon"></span>
      </button>
    </div>
    <div class="window-title">{title}</div>
  </div>
  
  <div 
    class="window-content" style="overflow: {id === 'terminal' ? 'hidden' : 'auto'};">
    <slot></slot>
  </div>
</div>

<style>
  .window {
    position: absolute;
    background-color: var(--bg-secondary);
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 500px;
    min-height: 350px;
    resize: both;
    border: 1px solid var(--border-color);
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 60px);
  }
  
  .window.maximized {
    border-radius: 0;
    resize: none;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .window-header {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
    cursor: move;
    height: 38px;
    user-select: none;
  }
  
  .window-controls {
    display: flex;
    gap: 8px;
    margin-right: 1rem;
  }
  
  .control {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, filter 0.2s ease;
  }
  
  .control:hover {
    transform: scale(1.15);
  }
  
  .control:active {
    transform: scale(0.95);
  }
  
  .control.close {
    background-color: #ff5f57;
  }
  
  .control.minimize {
    background-color: #ffbd2e;
  }
  
  .control.maximize {
    background-color: #28ca41;
  }
  
  .control-icon {
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  
  .control:hover .control-icon {
    opacity: 0.6;
  }
  
  .control.close .control-icon::before,
  .control.close .control-icon::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.9);
    top: 50%;
    left: 50%;
  }
  
  .control.close .control-icon::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  
  .control.close .control-icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  
  .control.minimize .control-icon::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.9);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .control.maximize .control-icon::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid rgba(0, 0, 0, 0.9);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .window-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
    user-select: none;
  }
  
  .window-content {
    flex: 1;
    overflow: auto;
    position: relative;
    height: calc(100% - 38px);
  }
  
  /* Responsive styles for mobile */
  @media (max-width: 768px) {
    .window {
      min-width: 320px;
      min-height: 300px;
      width: calc(100vw - 20px) !important;
      max-height: calc(100vh - 80px);
    }
  }
  
  @media (max-width: 480px) {
    .window {
      min-width: 280px;
    }
    
    .window-title {
      font-size: 0.8rem;
    }
    
    .window-controls {
      gap: 6px;
    }
    
    .control {
      width: 14px;
      height: 14px;
    }
  }
</style>