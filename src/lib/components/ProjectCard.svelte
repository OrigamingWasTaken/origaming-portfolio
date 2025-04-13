<script lang="ts">
    import { onMount } from 'svelte';
    import type { Project } from '$lib/data/projects';
    
    export let project: Project;
    let mounted = false;
    
    onMount(() => {
      mounted = true;
    });
  </script>
  
  <div class="project-card" class:mounted={mounted}>
    <div class="project-image">
      <div class="image-container" style="background-color: {project.bgColor || 'var(--bg-tertiary)'}">
        {#if project.icon}
          <div class="icon-container">
            {@html project.icon}
          </div>
        {/if}
      </div>
    </div>
    
    <div class="project-info">
      <h3 class="project-title">{project.title}</h3>
      <p class="project-description">{project.description}</p>
      
      <div class="project-tags">
        {#each project.technologies as tech, i}
          <span class="project-tag" style="animation-delay: {i * 0.1}s">{tech}</span>
        {/each}
      </div>
      
      <div class="project-links">
        {#if project.demoUrl}
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" class="project-link demo-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>Demo</span>
          </a>
        {/if}
        
        {#if project.repoUrl}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" class="project-link repo-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>Code</span>
          </a>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .project-card {
      background-color: var(--bg-secondary);
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-shadow: 0 8px 30px var(--card-shadow);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      transform: translateY(20px);
      border: 2px solid transparent;
    }
    
    .project-card.mounted {
      animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    .project-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 15px 40px var(--card-shadow);
      border-color: var(--accent-primary);
    }
    
    .project-image {
      position: relative;
      height: 160px;
      overflow: hidden;
    }
    
    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-container {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bounce 3s ease-in-out infinite;
      color: white;
    }
    
    .icon-container svg {
      width: 100%;
      height: 100%;
    }
    
    .project-info {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .project-title {
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
      color: var(--text-heading);
    }
    
    .project-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.2rem;
      flex: 1;
    }
    
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.2rem;
    }
    
    .project-tag {
      background-color: var(--bg-tertiary);
      color: var(--accent-primary);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.3rem 0.7rem;
      border-radius: 12px;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
    }
    
    .project-links {
      display: flex;
      gap: 1rem;
    }
    
    .project-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 16px;
      transition: all 0.3s ease;
    }
    
    .demo-link {
      background-color: var(--accent-primary);
      color: white;
    }
    
    .repo-link {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }
    
    .project-link:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px var(--card-shadow);
    }
    
    @keyframes popIn {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
      70% {
        opacity: 1;
        transform: translateY(-5px) scale(1.02);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  </style>