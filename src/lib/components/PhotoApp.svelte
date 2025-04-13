<script lang="ts">
  import { onMount } from 'svelte';
  import { windowStore } from '$lib/store/appStore';
  
  // Photos data with the sample provided
  let photos = [
    { id: 1, title: 'Basil', thumbnail: '', fullImage: '/basil.webp' },
    { id: 2, title: 'Lust', thumbnail: '', fullImage: '/lust.webp' },
    { id: 3, title: 'Limbo', thumbnail: '', fullImage: '/limbo.webp' },
    { id: 4, title: 'Greed', thumbnail: '', fullImage: '/greed.webp' },
    { id: 5, title: 'Wrath', thumbnail: '', fullImage: '/wrath.webp' },
    { id: 6, title: 'Heresy', thumbnail: '', fullImage: '/heresy.webp' },
    { id: 7, title: 'Gluttony', thumbnail: '', fullImage: '/gluttony.webp' },

    
  ];
  
  let isGeneratingThumbnails = true;
  
  // Function to create high-quality thumbnails from full-size images
  async function generateThumbnail(imageUrl, maxWidth = 300, maxHeight = 300) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
        }
        
        // Use higher resolution for better quality
        const scaleFactor = window.devicePixelRatio || 1;
        canvas.width = width * scaleFactor;
        canvas.height = height * scaleFactor;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        const ctx = canvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Use higher quality settings
        let thumbnailUrl;
        try {
          thumbnailUrl = canvas.toDataURL('image/webp', 0.95);
        } catch (e) {
          thumbnailUrl = canvas.toDataURL('image/jpeg', 0.92);
        }
        
        resolve(thumbnailUrl);
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${imageUrl}`);
        resolve(null); // Resolve with null to show a placeholder
      };
      
      img.src = imageUrl;
    });
  }
  
  // Process all photos to generate thumbnails
  async function processPhotos() {
    isGeneratingThumbnails = true;
    
    try {
      const thumbnailPromises = photos.map(async (photo) => {
        if (photo.thumbnail && photo.thumbnail !== photo.fullImage) {
          return photo;
        }
        
        try {
          const thumbnailUrl = await generateThumbnail(photo.fullImage);
          return {
            ...photo,
            thumbnail: thumbnailUrl || photo.fullImage
          };
        } catch (error) {
          console.error(`Error generating thumbnail for ${photo.title}:`, error);
          return { ...photo, thumbnail: photo.fullImage };
        }
      });
      
      photos = await Promise.all(thumbnailPromises);
    } catch (error) {
      console.error('Error processing photos:', error);
    } finally {
      isGeneratingThumbnails = false;
    }
  }
  
  // Open the image viewer window with enhanced controls
  function openImageViewer(photo) {
    const windowId = `image-${photo.id}`;
    
    setTimeout(() => {
      windowStore.openWindow(
        windowId,
        'ImageViewer',
        photo.title,
        { imageUrl: photo.fullImage }
      );
      
      windowStore.bringToFront(windowId);
    }, 0);
  }
  
  onMount(() => {
    processPhotos();
  });
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
  {#each photos as photo (photo.id)}
    <div class="photo-item" on:click={() => openImageViewer(photo)}>
      <div class="photo-thumbnail">
        {#if photo.thumbnail}
          <img src={photo.thumbnail} alt={photo.title} class="thumbnail-image" loading="lazy" />
        {:else if isGeneratingThumbnails}
          <div class="thumbnail-loading">
            <div class="loading-spinner"></div>
          </div>
        {:else}
          <div class="thumbnail-placeholder">
            <span>{photo.title[0]}</span>
          </div>
        {/if}
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
  background-color: var(--bg-tertiary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease;
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

.thumbnail-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--accent-primary);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.photo-title {
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

/* Responsive styles */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>