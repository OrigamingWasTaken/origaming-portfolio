<script lang="ts">
    import { windowStore } from '$lib/store/appStore';
    
    export let id: string;
    export let title: string;
    export let iconType: 'terminal' | 'photos' | 'text';
    export let component: string;
    export let props: any = {};
    
    function openApp() {
      windowStore.openWindow(id, component, title, props);
    }
  </script>
  
  <div class="desktop-icon" on:dblclick={openApp}>
    <div class="icon" class:terminal={iconType === 'terminal'} class:photos={iconType === 'photos'} class:text={iconType === 'text'}>
      {#if iconType === 'terminal'}
        <div class="terminal-icon">
          <div class="terminal-header">
            <div class="dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="terminal-body">
            <div class="line"></div>
            <div class="line short"></div>
            <div class="line medium"></div>
          </div>
        </div>
      {:else if iconType === 'photos'}
        <div class="photos-icon">
          <div class="photo-top"></div>
          <div class="photo-stack">
            <div class="photo photo1"></div>
            <div class="photo photo2"></div>
            <div class="photo photo3"></div>
          </div>
        </div>
      {:else if iconType === 'text'}
        <div class="text-icon">
          <div class="text-file">
            <div class="text-corner"></div>
            <div class="text-lines">
              <div class="text-line"></div>
              <div class="text-line"></div>
              <div class="text-line short"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class="icon-label">{title}</div>
  </div>
  
  <style>
    .desktop-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90px;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      transition: background-color 0.2s ease;
    }
    
    .desktop-icon:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
    }
    
    .icon-label {
      font-size: 0.8rem;
      color: var(--text-primary);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    
    /* Terminal Icon */
    .terminal-icon {
      width: 52px;
      height: 52px;
      background-color: var(--bg-tertiary);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }
    
    .terminal-header {
      height: 12px;
      background-color: var(--bg-secondary);
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
    
    .dots {
      display: flex;
      gap: 3px;
    }
    
    .dots span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--accent-primary);
    }
    
    .terminal-body {
      flex: 1;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
    }
    
    .line {
      height: 2px;
      background-color: var(--accent-secondary);
      width: 80%;
    }
    
    .line.short {
      width: 50%;
    }
    
    .line.medium {
      width: 65%;
    }
    
    /* Photos Icon */
    .photos-icon {
      width: 52px;
      height: 52px;
      position: relative;
    }
    
    .photo-top {
      width: 48px;
      height: 8px;
      background-color: var(--accent-primary);
      border-radius: 4px 4px 0 0;
      position: absolute;
      top: 0;
      left: 2px;
    }
    
    .photo-stack {
      position: absolute;
      top: 8px;
      left: 0;
      width: 100%;
      height: calc(100% - 8px);
    }
    
    .photo {
      position: absolute;
      width: 42px;
      height: 36px;
      border-radius: 3px;
      border: 2px solid var(--bg-secondary);
    }
    
    .photo1 {
      background-color: var(--accent-secondary);
      transform: rotate(-10deg);
      top: 6px;
      left: 3px;
    }
    
    .photo2 {
      background-color: var(--accent-tertiary);
      transform: rotate(5deg);
      top: 4px;
      left: 7px;
    }
    
    .photo3 {
      background-color: var(--accent-quaternary);
      top: 7px;
      left: 10px;
    }
    
    /* Text File Icon */
    .text-icon {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .text-file {
      width: 42px;
      height: 50px;
      background-color: #f5f5f5;
      border-radius: 3px;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 12px 6px 6px;
    }
    
    .text-corner {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, transparent 50%, #f5f5f5 50%);
    }
    
    .text-corner::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 12px 12px 0 0;
      border-color: var(--accent-primary) transparent transparent transparent;
    }
    
    .text-lines {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: auto;
    }
    
    .text-line {
      height: 2px;
      background-color: #aaa;
      width: 100%;
    }
    
    .text-line.short {
      width: 60%;
    }
  </style>