<script lang="ts">
    import type { Skill } from '$lib/data/skills';
    export let skill: Skill;
  </script>
  
  <div class="skill-badge" style="--skill-color: {skill.color || 'var(--accent-primary)'}">
    <div class="skill-icon">
      {@html skill.icon}
    </div>
    <div class="skill-info">
      <span class="skill-name">{skill.name}</span>
      {#if skill.level}
        <div class="skill-level">
          <div class="level-bar">
            <div class="level-fill" style="width: {skill.level}%"></div>
          </div>
          <span class="level-text">{skill.level}%</span>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .skill-badge {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: var(--bg-secondary);
      padding: 1rem;
      border-radius: 20px;
      box-shadow: 0 5px 15px var(--card-shadow);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
      border: 2px solid transparent;
    }
    
    .skill-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background-color: var(--skill-color);
      transition: all 0.3s ease;
      border-radius: 0 3px 3px 0;
    }
    
    .skill-badge:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 25px var(--card-shadow);
      border-color: var(--skill-color);
    }
    
    .skill-badge:hover::before {
      width: 10px;
    }
    
    .skill-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      background-color: var(--bg-tertiary);
      border-radius: 14px;
      transition: all 0.3s ease;
      color: var(--skill-color);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
    
    .skill-badge:hover .skill-icon {
      transform: scale(1.1) rotate(5deg);
      background-color: var(--skill-color);
      color: white;
    }
    
    .skill-info {
      flex: 1;
    }
    
    .skill-name {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-heading);
      font-size: 1.05rem;
    }
    
    .skill-level {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .level-bar {
      flex: 1;
      height: 8px;
      background-color: var(--bg-tertiary);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .level-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--skill-color), var(--accent-secondary));
      border-radius: 4px;
      transition: width 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }
    
    .level-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      animation: shimmer 2s infinite;
    }
    
    .level-text {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--skill-color);
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  </style>