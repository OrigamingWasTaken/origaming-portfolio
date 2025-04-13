<script lang="ts">
  import { onMount } from 'svelte';
  
  export let imageUrl: string;
  
  let isLoading = true;
  let hasError = false;
  
  // Zoom and pan state
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let startTranslateX = 0;
  let startTranslateY = 0;
  
  // DOM elements
  let imageElement: HTMLImageElement;
  let containerElement: HTMLDivElement;
  
  // Get natural image dimensions
  let imageWidth = 0;
  let imageHeight = 0;
  
  function handleImageLoad() {
    isLoading = false;
    
    if (imageElement) {
      imageWidth = imageElement.naturalWidth;
      imageHeight = imageElement.naturalHeight;
      
      // Reset view for new image
      resetView();
    }
  }
  
  function handleImageError() {
    isLoading = false;
    hasError = true;
  }
  
  function zoomIn() {
    scale = Math.min(scale * 1.2, 5);
    applyConstraints();
  }
  
  function zoomOut() {
    scale = Math.max(scale / 1.2, 0.1);
    applyConstraints();
  }
  
  function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
  }
  
  function applyConstraints() {
    // If image is smaller than viewport at current scale, center it
    if (containerElement && imageElement) {
      const containerWidth = containerElement.clientWidth;
      const containerHeight = containerElement.clientHeight;
      const scaledImageWidth = imageWidth * scale;
      const scaledImageHeight = imageHeight * scale;
      
      // Determine maximum allowed translation
      const maxTranslateX = Math.max(0, (scaledImageWidth - containerWidth) / 2);
      const maxTranslateY = Math.max(0, (scaledImageHeight - containerHeight) / 2);
      
      // Constrain translation
      translateX = Math.max(-maxTranslateX, Math.min(maxTranslateX, translateX));
      translateY = Math.max(-maxTranslateY, Math.min(maxTranslateY, translateY));
    }
  }
  
  function handleMouseDown(event: MouseEvent) {
    if (scale <= 1) return; // Only enable drag when zoomed in
    
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    startTranslateX = translateX;
    startTranslateY = translateY;
    
    // Prevent default behaviors
    event.preventDefault();
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    
    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;
    
    translateX = startTranslateX + deltaX / scale;
    translateY = startTranslateY + deltaY / scale;
    
    applyConstraints();
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    
    // Get mouse position relative to image
    const rect = containerElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Determine zoom direction
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);
    
    // Adjust translation to zoom toward mouse position
    if (newScale !== scale) {
      const scaleDiff = newScale - scale;
      translateX -= (mouseX - rect.width / 2 - translateX) * scaleDiff / scale;
      translateY -= (mouseY - rect.height / 2 - translateY) * scaleDiff / scale;
      scale = newScale;
      
      applyConstraints();
    }
  }
  
  // Set up event listeners
  onMount(() => {
    // Remove event listeners when component is destroyed
    return () => {
      if (containerElement) {
        containerElement.removeEventListener('wheel', handleWheel);
      }
    };
  });
</script>

<div 
  class="image-viewer"
  bind:this={containerElement}
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseUp}
  on:wheel={handleWheel}
>
  <div class="image-container" class:is-dragging={isDragging}>
    {#if isLoading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <span>Loading image...</span>
      </div>
    {/if}
    
    <img 
      bind:this={imageElement}
      src={imageUrl} 
      alt="Image" 
      class="full-image" 
      on:load={handleImageLoad}
      on:error={handleImageError}
      style="transform: translate({translateX}px, {translateY}px) scale({scale}); 
             display: {isLoading ? 'none' : 'block'};"
    />
    
    {#if hasError}
      <div class="error-container">
        <span>Failed to load image</span>
      </div>
    {/if}
  </div>
  
  <!-- Controls -->
  <div class="controls">
    <button class="control-button" on:click={zoomIn} title="Zoom in">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    </button>
    
    <button class="control-button" on:click={zoomOut} title="Zoom out">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    </button>
    
    <button class="control-button" on:click={resetView} title="Reset view">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 12h18M12 3v18"></path>
      </svg>
    </button>
  </div>
  
  <!-- Zoom level indicator -->
  <div class="zoom-level">
    {Math.round(scale * 100)}%
  </div>
  
  <!-- Instructions tooltip -->
  <div class="instructions">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <div class="tooltip">
      <ul>
        <li>Scroll to zoom in/out</li>
        <li>Drag to pan when zoomed in</li>
        <li>Use buttons for precise control</li>
      </ul>
    </div>
  </div>
</div>

<style>
  .image-viewer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-secondary);
    overflow: hidden;
    position: relative;
    cursor: default;
  }
  
  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .image-container.is-dragging {
    cursor: grabbing;
  }
  
  .full-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transform-origin: center;
    transition: transform 0.05s ease;
    cursor: grab;
    will-change: transform;
  }
  
  .loading-container, .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 8px;
    background-color: var(--bg-tertiary);
    color: var(--text-secondary);
  }
  
  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: var(--accent-primary);
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-container {
    color: var(--accent-primary);
  }
  
  .controls {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    background-color: var(--bg-tertiary);
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }
  
  .control-button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  .control-button:hover {
    background-color: var(--accent-primary);
    color: white;
  }
  
  .zoom-level {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 8px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  
  .instructions {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-tertiary);
    color: var(--text-secondary);
    cursor: help;
  }
  
  .tooltip {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    padding: 8px;
    width: 180px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    z-index: 100;
  }
  
  .instructions:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
  
  .tooltip ul {
    margin: 0;
    padding: 0 0 0 16px;
    font-size: 0.85rem;
  }
  
  .tooltip li {
    margin-bottom: 4px;
  }
  
  .tooltip li:last-child {
    margin-bottom: 0;
  }
</style>