export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    bgColor?: string;
    icon?: string;
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Pixel Adventure",
      slug: "pixel-adventure",
      description: "A vibrant 2D platformer game with custom pixel art and animations built with Unity and C#.",
      technologies: ["Unity", "C#", "Pixel Art", "Game Design"],
      demoUrl: "https://play.example.com/pixel-adventure",
      repoUrl: "https://github.com/origaming/pixel-adventure",
      bgColor: "#ff8ba7",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>`
    },
    {
      id: 2,
      title: "CodeShare",
      slug: "code-share",
      description: "A real-time collaborative code editor with syntax highlighting and live preview for web developers.",
      technologies: ["React", "Node.js", "WebSockets", "TypeScript"],
      demoUrl: "https://codeshare.origaming.dev",
      repoUrl: "https://github.com/origaming/codeshare",
      bgColor: "#b8c1ec",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>`
    },
    {
      id: 3,
      title: "ArtFolio",
      slug: "artfolio",
      description: "A minimalist portfolio website template for digital artists with dark mode and smooth animations.",
      technologies: ["Svelte", "SCSS", "TypeScript", "Animation"],
      demoUrl: "https://artfolio.origaming.dev",
      repoUrl: "https://github.com/origaming/artfolio",
      bgColor: "#c8b6ff", 
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>`
    },
    {
      id: 4,
      title: "TaskMaster",
      slug: "taskmaster",
      description: "A productivity app with task management, pomodoro timer, and habit tracking features.",
      technologies: ["Vue.js", "Firebase", "PWA", "TypeScript"],
      demoUrl: "https://taskmaster.origaming.dev",
      repoUrl: "https://github.com/origaming/taskmaster",
      bgColor: "#bde0fe",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>`
    }
  ];