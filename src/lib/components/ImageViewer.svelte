<script lang="ts">
  export let imageUrl: string;
</script>

<div class="image-viewer">
  <div class="image-container">
    <div class="image-placeholder" style="background-color: var(--bg-tertiary);">
      <span>Image Preview</span>
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
  }
  
  .image-container {
    max-width: 90%;
    max-height: 90%;
  }
  
  .image-placeholder {
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: var(--text-secondary);
    font-size: 1.2rem;
  }
</style>