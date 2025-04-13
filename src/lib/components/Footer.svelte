<script lang="ts">
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <a href="#hero" class="logo-link">
            <span class="logo-text">Origaming</span>
          </a>
          <p class="tagline">Crafting digital experiences</p>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="link-group">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {currentYear} Origaming. All rights reserved.</p>
        <button class="back-to-top" on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span>Back to Top</span>
        </button>
      </div>
    </div>
  </footer>
  
  <style>
    footer {
      background-color: var(--bg-secondary);
      position: relative;
      padding: 4rem 0 2rem;
      overflow: hidden;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      margin-top: -30px;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 3rem;
      margin-bottom: 3rem;
    }
    
    .footer-logo {
      flex: 1;
      min-width: 250px;
    }
    
    .logo-link {
      display: inline-block;
      margin-bottom: 1rem;
    }
    
    .logo-text {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .tagline {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 4rem;
    }
    
    .link-group h4 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
      color: var(--text-heading);
    }
    
    .link-group h4::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 30px;
      height: 3px;
      background-color: var(--accent-primary);
      border-radius: 2px;
    }
    
    .link-group ul {
      list-style-type: none;
    }
    
    .link-group li {
      margin-bottom: 0.8rem;
    }
    
    .link-group a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .link-group a:hover {
      color: var(--accent-primary);
      transform: translateX(5px);
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    
    .back-to-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: var(--bg-tertiary);
      color: var(--text-secondary);
      border-radius: 20px;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .back-to-top:hover {
      background-color: var(--accent-primary);
      color: white;
      transform: translateY(-5px);
      box-shadow: 0 5px 15px var(--card-shadow);
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 2rem;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .back-to-top {
        margin-top: 1rem;
      }
    }
  </style>