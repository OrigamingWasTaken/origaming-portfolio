import { browser } from '$app/environment';

/**
 * Scroll to element by ID with smooth behavior
 */
export function scrollTo(elementId: string): void {
  if (!browser) return;
  
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Initialize scroll to hash on page load and handle click events
 */
export function initSmoothScroll(): void {
  if (!browser) return;
  
  // Handle initial hash in URL
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  // Set up click handlers for all hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        const targetId = href.substring(1);
        scrollTo(targetId);
        
        // Update URL without scrolling
        history.pushState(null, '', href);
      }
    });
  });
}