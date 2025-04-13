<script lang="ts">
    import { onMount } from 'svelte';
    
    let mounted = false;
    
    onMount(() => {
      mounted = true;
    });
  </script>
  
  <div class="logo-container">
    {#if mounted}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Animated Gamepad Icon -->
        <rect 
          x="8" 
          y="12" 
          width="24" 
          height="16" 
          rx="8" 
          fill="url(#logoGradient)" 
          class="gamepad-body"
        />
        
        <!-- D-Pad -->
        <rect 
          x="12" 
          y="16" 
          width="4" 
          height="8" 
          rx="1" 
          fill="#ffffff" 
          class="dpad"
        />
        <rect 
          x="10" 
          y="18" 
          width="8" 
          height="4" 
          rx="1" 
          fill="#ffffff" 
          class="dpad"
        />
        
        <!-- Buttons -->
        <circle 
          cx="26" 
          cy="17" 
          r="2" 
          fill="#ffffff" 
          class="button button-1"
        />
        <circle 
          cx="30" 
          cy="21" 
          r="2" 
          fill="#ffffff" 
          class="button button-2"
        />
        <circle 
          cx="26" 
          cy="25" 
          r="2" 
          fill="#ffffff" 
          class="button button-3"
        />
        <circle 
          cx="22" 
          cy="21" 
          r="2" 
          fill="#ffffff" 
          class="button button-4"
        />
        
        <defs>
          <linearGradient id="logoGradient" x1="8" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="var(--accent-primary)" />
            <stop offset="1" stop-color="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>
    {/if}
  </div>
  
  <style>
    .logo-container {
      width: 40px;
      height: 40px;
      position: relative;
    }
    
    .gamepad-body {
      animation: pulse 3s infinite ease-in-out;
    }
    
    .dpad {
      animation: glow 2s infinite alternate;
    }
    
    .button {
      animation: blink 1.5s infinite alternate;
    }
    
    .button-1 {
      animation-delay: 0s;
    }
    
    .button-2 {
      animation-delay: 0.2s;
    }
    
    .button-3 {
      animation-delay: 0.4s;
    }
    
    .button-4 {
      animation-delay: 0.6s;
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    @keyframes glow {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes blink {
      0% {
        opacity: 0.6;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  </style>