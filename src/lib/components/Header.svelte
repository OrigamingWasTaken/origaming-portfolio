<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import ThemeToggle from './ThemeToggle.svelte';
    import AnimatedLogo from './AnimatedLogo.svelte';
    import { initSmoothScroll } from '$lib/utils/smoothScroll';
    
    let scrollY: number = 0;
    let isMenuOpen: boolean = false;
    let mounted: boolean = false;
    
    onMount(() => {
      mounted = true;
      initSmoothScroll();
    });
    
    // Handle scroll to apply header styles
    function handleScroll() {
      scrollY = window.scrollY;
    }
    
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
    
    function closeMenu() {
      isMenuOpen = false;
    }
    
    $: isScrolled = scrollY > 50;
  </script>
  
  <svelte:window on:scroll={handleScroll} />
  
  <header class:scrolled={isScrolled}>
    <div class="container">
      <div class="header-content">
        <a href="#hero" class="logo-container" on:click={closeMenu}>
          <AnimatedLogo />
          <span class="logo-text">Origaming</span>
        </a>
        
        <div class="mobile-menu-toggle" on:click={toggleMenu} role="button" aria-label="Toggle menu">
          <span class:active={isMenuOpen}></span>
          <span class:active={isMenuOpen}></span>
          <span class:active={isMenuOpen}></span>
        </div>
        
        <nav class:open={isMenuOpen} class:desktop={!isMenuOpen}>
          {#if mounted && (isMenuOpen || !isMenuOpen)}
            <ul>
              <li>
                <a 
                  href="#hero" 
                  on:click={closeMenu}
                  in:fly={{ y: -10, duration: 300, delay: 100 }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  on:click={closeMenu}
                  in:fly={{ y: -10, duration: 300, delay: 150 }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  on:click={closeMenu}
                  in:fly={{ y: -10, duration: 300, delay: 200 }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  on:click={closeMenu}
                  in:fly={{ y: -10, duration: 300, delay: 250 }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  on:click={closeMenu}
                  in:fly={{ y: -10, duration: 300, delay: 300 }}
                  class="contact-btn"
                >
                  Contact Me
                </a>
              </li>
            </ul>
          {/if}
        </nav>
        
        <div class="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
  
  <style>
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 1.2rem 0;
      transition: all 0.3s ease;
      background-color: var(--bg-primary);
    }
  
    header.scrolled {
      padding: 0.8rem 0;
      background-color: var(--bg-secondary);
      box-shadow: 0 5px 20px var(--card-shadow);
      backdrop-filter: blur(10px);
    }
  
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--text-heading);
      text-decoration: none;
      transition: transform 0.3s ease;
    }
    
    .logo-container:hover {
      transform: scale(1.05);
    }
  
    .logo-text {
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 1.5rem;
      font-weight: 800;
    }
  
    nav {
      display: flex;
    }
  
    nav ul {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style-type: none;
    }
  
    nav a {
      position: relative;
      color: var(--text-primary);
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 0.5rem 0;
    }
  
    nav a:hover {
      color: var(--accent-primary);
      transform: translateY(-2px);
    }
  
    nav a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 3px;
      background-color: var(--accent-primary);
      transition: all 0.3s ease;
      transform: translateX(-50%);
      border-radius: 3px;
    }
  
    nav a:hover::after {
      width: 100%;
    }
  
    .contact-btn {
      background-color: var(--accent-primary);
      color: white !important;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      transition: all 0.3s ease;
    }
  
    .contact-btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 5px 15px var(--card-shadow);
      background-color: var(--accent-secondary);
    }
  
    .contact-btn::after {
      display: none;
    }
  
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      cursor: pointer;
    }
  
    .mobile-menu-toggle span {
      display: block;
      height: 3px;
      width: 100%;
      background-color: var(--text-primary);
      border-radius: 3px;
      transition: all 0.3s ease;
    }
  
    .mobile-menu-toggle span.active:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
  
    .mobile-menu-toggle span.active:nth-child(2) {
      opacity: 0;
    }
  
    .mobile-menu-toggle span.active:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  
    .theme-toggle-container {
      margin-left: 1rem;
    }
  
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: flex;
        z-index: 1001;
      }
  
      nav {
        display: none;
      }
  
      nav.open {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--bg-primary);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
  
      nav.open ul {
        flex-direction: column;
        gap: 2rem;
      }
  
      nav.open a {
        font-size: 1.5rem;
      }
    }
  </style>