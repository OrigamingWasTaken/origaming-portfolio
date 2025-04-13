<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { windowStore, type Position } from '$lib/store/appStore';
    import { fade, fly, scale } from 'svelte/transition';
    
    export let id: string;
    export let title: string;
    export let zIndex: number;
    export let position: Position;
    export let isMaximized: boolean = false;
    
    let windowElement: HTMLElement;
    let headerElement: HTMLElement;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let originalPos = { ...position };
    
    const dispatch = createEventDispatcher();
    
    function handleHeaderMouseDown(event: MouseEvent) {
      if (isMaximized) return;
      
      // Only initiate drag on left mouse button
      if (event.button !== 0) return;
      
      isDragging = true;
      
      // Calculate the offset from cursor to the top-left corner of the window
      const rect = windowElement.getBoundingClientRect();
      dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      // Store original position to prevent jumping
      originalPos = { x: rect.left, y: rect.top };
      
      // Bring window to front
      windowStore.bringToFront(id);
      
      // Prevent text selection during drag
      event.preventDefault();
    }
    
    function handleMouseMove(event: MouseEvent) {
      if (!isDragging) return;
      
      // Calculate new position based on mouse movement
      const newX = originalPos.x + (event.clientX - (originalPos.x + dragOffset.x));
      const newY = originalPos.y + (event.clientY - (originalPos.y + dragOffset.y));
      
      // Update position in store
      windowStore.updatePosition(id, { x: newX, y: newY });
      
      // Update original position to prevent cumulative errors
      originalPos = { x: newX, y: newY };
      
      // Prevent default to avoid text selection
      event.preventDefault();
    }
    
    function handleMouseUp() {
      isDragging = false;
    }
    
    function handleWindowClick() {
      windowStore.bringToFront(id);
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
      
      // Set initial focus (bring to front)
      windowStore.bringToFront(id);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
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
      width: {isMaximized ? '100%' : 'auto'};
      height: {isMaximized ? '100%' : 'auto'};
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
    
    <div class="window-content">
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
  </style>