<script lang="ts">
    import { onMount } from 'svelte';
    import { windowStore } from '$lib/store/appStore';
    
    // Sample photos data
    const photos = [
      { id: 1, title: 'Workspace Setup', thumbnail: '/images/workspace-thumb.jpg', fullImage: '/images/workspace.jpg' },
      { id: 2, title: 'Code Snippet', thumbnail: '/images/code-thumb.jpg', fullImage: '/images/code.jpg' },
      { id: 3, title: 'Project Diagram', thumbnail: '/images/diagram-thumb.jpg', fullImage: '/images/diagram.jpg' },
      { id: 4, title: 'Tech Conference', thumbnail: '/images/conference-thumb.jpg', fullImage: '/images/conference.jpg' }
    ];
    
    function openImageViewer(photo) {
      // Create window ID based on photo ID to prevent duplicates
      const windowId = `image-${photo.id}`;
      
      // Force the new window to be on top by ensuring it has the highest z-index
      // This is done by directly calculating a high z-index value
      setTimeout(() => {
        windowStore.openWindow(
          windowId,
          'ImageViewer',
          photo.title,
          { imageUrl: photo.fullImage }
        );
        
        // Ensure it's at the front
        windowStore.bringToFront(windowId);
      }, 0);
    }
  </script>
  
  <div class="photo-app">
    <div class="toolbar">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search photos...">
      </div>
    </div>
    
    <div class="photo-grid">
      {#each photos as photo}
        <div class="photo-item" on:click={() => openImageViewer(photo)}>
          <div class="photo-thumbnail">
            <div class="thumbnail-placeholder" style="background-color: var(--bg-tertiary);">
              <span>{photo.title[0]}</span>
            </div>
          </div>
          <div class="photo-title">{photo.title}</div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .photo-app {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--bg-secondary);
    }
    
    .toolbar {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .search-box {
      display: flex;
      align-items: center;
      background-color: var(--bg-tertiary);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      gap: 0.5rem;
    }
    
    .search-box svg {
      color: var(--text-secondary);
    }
    
    .search-box input {
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 0.9rem;
      outline: none;
      width: 100%;
    }
    
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      padding: 1rem;
      overflow-y: auto;
      flex: 1;
    }
    
    .photo-item {
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .photo-item:hover {
      transform: scale(1.03);
    }
    
    .photo-thumbnail {
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }
    
    .thumbnail-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--accent-primary);
      font-weight: bold;
    }
    
    .photo-title {
      font-size: 0.85rem;
      text-align: center;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .photo-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }
  </style>