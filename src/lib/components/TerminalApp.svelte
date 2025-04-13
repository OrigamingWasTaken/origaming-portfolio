<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { windowStore } from "$lib/store/appStore";

  // Tech stack data
  const techStack = [
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "HTML", category: "frontend" },
    { name: "CSS", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Svelte", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "Bash", category: "tools" },
    { name: "Lua", category: "tools" },
  ];

  // Projects data
  const projects = [
    {
      title: "AppleBlox",
      description: "A lightweight Roblox launcher for MacOS ",
      repoUrl: "https://github.com/AppleBlox/appleblox",
      techs: ["TypeScript", "NeutralinoJS", "Swift", "Objective-C"],
    },
    {
      title: "ce-discord-bot",
      description: "Discord bot that notifies you of Minecraft events",
      repoUrl: "https://github.com/Communaute-Events/ce-discord-bot",
      techs: ["TypeScript", "Node.js", "Discord.js", "Bun"],
    },
    {
      title: "paper-comet",
      description: "A basic addon for the Minecraft 'Meteor Client' mod made for me to learn Java.",
      repoUrl: "https://github.com/OrigamingWasTaken/paper-comet",
      techs: ["Java", "Fabric", "Gradle", "Mixins"],
    },
  ];

  // Terminal interaction
  let inputCommand = "";
  let commandHistory: any[] = [];
  let terminalElement: HTMLElement;
  let contentElement: HTMLElement;
  let inputElement: HTMLInputElement;
  let shouldScrollToBottom = true;
  let isAnimating = true;
  let userCanType = false;

  // Animation sequence
  const animationSequence = [
    { command: "echo \"Welcome to my code realm\"", delay: 300 },
    { command: "cat about.txt", delay: 500 },
    { command: "skills", delay: 500 },
    { command: "projects", delay: 500 },
    { command: "echo \"Type 'help' for available commands\"", delay: 300 }
  ];

  function scrollToBottom() {
    if (shouldScrollToBottom && terminalElement) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  }

  async function simulateTyping(command: string) {
    inputCommand = "";
    
    const typingSpeed = 20;
    const randomVariation = 10;
    
    for (let i = 0; i < command.length; i++) {
      inputCommand += command[i];
      await new Promise(resolve => 
        setTimeout(resolve, typingSpeed + Math.random() * randomVariation)
      );
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    handleCommand({ key: "Enter" } as KeyboardEvent);
  }

  async function runAnimationSequence() {
    isAnimating = true;
    userCanType = false;
    
    commandHistory = [];
    
    for (const item of animationSequence) {
      await simulateTyping(item.command);
      await new Promise(resolve => setTimeout(resolve, item.delay));
    }
    
    isAnimating = false;
    userCanType = true;
    
    inputCommand = "";
    setTimeout(() => {
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  }

  function handleCommand(event) {
    if (!userCanType && !isAnimating) {
      return;
    }
    
    if (event.key === "Enter" && inputCommand.trim()) {
      const cmd = inputCommand.trim();

      let output = "";
      let isHtml = false;

      switch (cmd) {
        case "help":
          output = `
Available commands:
  about     - Show information about me
  skills    - List my technical skills
  projects  - Show my projects
  contact   - Display contact information
  clear     - Clear the terminal
  silly     - Show a surprise
  weather   - Current mood forecast
  whoami    - Who am I?
  open      - Open an application (e.g., open photos)
`;
          break;

        case "about":
          output =
            "I'm Origaming (she/he) and I am a passionate fullstack developer! I know TypeScript, Bash, and Python, and hope to learn Rust in the future.\n\nBut coding and solving problems is not my only passion. I also love playing the drums and cycling ^_^.";
          break;

        case "skills":
          output = "My technical skills:\n" + 
            techStack.map((tech) => `• ${tech.name}`).join("\n");
          break;

        case "projects":
          isHtml = true;
          output = "My projects:\n" + 
            projects.map((p) => 
              `• <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">${p.title}</a> - ${p.description}`
            ).join("\n");
          break;

        case "contact":
          output =
            "GitHub: https://github.com/OrigamingWasTaken\nEmail: contact@origaming.dev";
          break;

        case "clear":
          commandHistory = [];
          inputCommand = "";
          shouldScrollToBottom = true;
          return;

        case "silly":
          isHtml = true;
          output = `<pre class="ascii-cat">
    /\\_/\\  
   ( o.o ) 
    > ^ <  
  </pre>`;
          setTimeout(() => {
            const catElement = document.querySelector(".ascii-cat");
            if (catElement) startCatAnimation(catElement);
          }, 100);
          break;

        case "weather":
          output = "Current mood: Sunny with a chance of coding!";
          break;

        case "whoami":
          output = "origaming@developer: ~";
          break;

        case "open photos":
          output = "Opening Photos app...";
          windowStore.openWindow("photos", "PhotoApp", "Photos");
          break;

        case "cat about.txt":
          output =
            "I'm Origaming (she/he) and I am a passionate fullstack developer! I know TypeScript, Bash, and Python, and hope to learn 🦀 Rust \nin the future.\nBut coding and solving problems is not my only passion. I also love playing the drums and cycling ^_^.";
          break;

        case "echo \"Welcome to my code realm\"":
          output = "Welcome to My Code Realm";
          break;
          
        case "echo \"Type 'help' for available commands\"":
          output = "Type 'help' for available commands";
          break;

        default:
          if (cmd.startsWith("open ")) {
            output = `Application "${cmd.substring(5)}" not found. Try "open photos"`;
          } else if (cmd.startsWith("echo ")) {
            output = cmd.substring(5).replace(/^"(.*)"$/, "$1");
          } else {
            output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
          }
      }

      commandHistory = [...commandHistory, { cmd, output, isHtml }];
      inputCommand = "";
      shouldScrollToBottom = true;
      
      if (userCanType) {
        inputElement.focus();
      }
    }
  }

  function startCatAnimation(element) {
    const frames = [
      `  /\\_/\\  \n ( o.o ) \n  > ^ <  `,
      `  /\\_/\\  \n ( o-o ) \n  > ^ <  `,
      `  /\\_/\\  \n ( ^.^ ) \n  > ^ <  `,
    ];

    let frameIndex = 0;

    const animation = setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      element.textContent = frames[frameIndex];
    }, 500);

    setTimeout(() => clearInterval(animation), 10000);
  }

  function focusInput() {
    if (userCanType) {
      inputElement.focus();
    }
  }

  function handleScroll() {
    const isAtBottom = Math.abs(
      (terminalElement.scrollHeight - terminalElement.scrollTop) -
      terminalElement.clientHeight
    ) < 10;
    
    shouldScrollToBottom = isAtBottom;
  }

  afterUpdate(() => {
    scrollToBottom();
  });

  onMount(() => {
    terminalElement.addEventListener('scroll', handleScroll);
    runAnimationSequence();
    
    return () => {
      terminalElement.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="terminal-container">
  <div class="terminal-scrollable" bind:this={terminalElement}>
    <div class="terminal-content" bind:this={contentElement}>
      {#each commandHistory as entry}
        <div class="command-line">
          <span class="prompt">~/origaming$</span>
          <span class="command"> {entry.cmd}</span>
        </div>
        <div class="output">
          {#if entry.isHtml}
            {@html entry.output}
          {:else}
            {#each entry.output.split("\n") as line}
              <div>{line}</div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="terminal-input" class:disabled={!userCanType}>
    <div class="input-wrapper" on:click={focusInput}>
      <span class="prompt">~/origaming$</span>
      <input
        type="text"
        bind:value={inputCommand}
        on:keydown={handleCommand}
        bind:this={inputElement}
        autocomplete="off"
        spellcheck="false"
        disabled={!userCanType}
        class:blinking-cursor={isAnimating}
      />
    </div>
    {#if !userCanType}
      <div class="input-overlay">
        {#if isAnimating}
          <span></span>
        {:else}
          <span>Click to interact with the terminal</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .terminal-container {
    height: 100%;
    overflow: hidden;
    background-color: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .terminal-scrollable {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  .terminal-content {
    padding: 1rem;
    font-family: "JetBrains Mono", monospace;
    background-color: var(--bg-secondary);
    min-height: 100%;
  }

  .terminal-input {
    border-top: 1px solid var(--border-color);
    padding: 0.75rem 1rem;
    background-color: var(--bg-secondary);
    font-family: "JetBrains Mono", monospace;
    position: relative;
  }
  
  .terminal-input.disabled {
    opacity: 0.8;
  }

  .command-line {
    display: flex;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .input-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .prompt {
    color: var(--accent-primary);
    margin-right: 0.5rem;
    white-space: nowrap;
    flex-shrink: 0;
    font-family: "JetBrains Mono", monospace;
    font-weight: normal;
  }

  .command {
    color: var(--text-primary);
    word-break: break-all;
  }

  input {
    background: transparent;
    border: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9rem;
    color: var(--text-primary);
    flex: 1;
    outline: none;
    width: 100%;
    caret-color: var(--text-primary);
    min-width: 10px;
  }
  
  input:disabled {
    cursor: default;
  }
  
  .blinking-cursor {
    caret-color: transparent;
  }
  
  .blinking-cursor::after {
    content: '|';
    animation: blink 1s step-end infinite;
    color: var(--text-primary);
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
  
  .input-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: var(--text-secondary);
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .output {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    max-width: 100%;
  }
  
  .project-link {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .project-link:hover {
    color: var(--accent-secondary);
    text-decoration: underline;
  }

  .ascii-cat {
    font-family: monospace;
    white-space: pre;
    line-height: 1.2;
    color: var(--accent-secondary);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .terminal-content {
      padding: 0.75rem;
    }
    
    .command-line, input {
      font-size: 0.8rem;
    }
    
    .output {
      font-size: 0.8rem;
      padding-left: 0.5rem;
    }
  }
</style>