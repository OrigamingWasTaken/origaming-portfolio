<script lang="ts">
  import { onMount } from "svelte";
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
  let terminalElement: any;
  let inputElement: any;

  function handleCommand(event) {
    if (event.key === "Enter" && inputCommand.trim()) {
      const cmd = inputCommand.trim();

      // Add command to history
      let output = "";
      let isHtml = false;

      // Process commands
      switch (cmd) {
        case "help":
          output = `
  Available commands:
    help       - Display this help message
    about      - Show information about me
    skills     - List my technical skills
    projects   - Show my projects
    contact    - Display contact information
    clear      - Clear the terminal
    silly      - Show a surprise
    weather    - Current mood forecast
    whoami     - Who am I?
    open       - Open an application (e.g., open photos)
  `;
          break;

        case "about":
          output =
            "I'm Origaming (she/he) and I am a passionate fullstack developer! I know TypeScript, Bash, and Python, and hope to learn Rust in the future.\n\nBut coding and solving problems is not my only passion. I also love playing the drums and cycling ^_^.";
          break;

        case "skills":
          output =
            "My technical skills:\n" +
            techStack.map((tech) => `• ${tech.name}`).join("\n");
          break;

        case "projects":
          output =
            "My projects:\n" +
            projects.map((p) => `• ${p.title} - ${p.description}`).join("\n");
          break;

        case "contact":
          output =
            "GitHub: https://github.com/OrigamingWasTaken\nEmail: contact@origaming.dev";
          break;

        case "clear":
          commandHistory = [];
          inputCommand = "";
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

        default:
          if (cmd.startsWith("open ")) {
            output = `Application "${cmd.substring(5)}" not found. Try "open photos"`;
          } else {
            output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
          }
      }

      commandHistory = [...commandHistory, { cmd, output, isHtml }];
      inputCommand = "";

      // Scroll to bottom
      setTimeout(() => {
        terminalElement.scrollTop = terminalElement.scrollHeight;
        inputElement.focus();
      }, 10);
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

    // Clean up after 10 seconds
    setTimeout(() => clearInterval(animation), 10000);
  }

  function focusInput() {
    inputElement.focus();
  }

  onMount(() => {
    setTimeout(() => {
      inputElement.focus();
      // Initial scroll to bottom to show content
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }, 0);
  });
</script>

<div class="terminal-container">
  <div
    class="terminal-content"
    bind:this={terminalElement}
    on:click={focusInput}
  >
    <div class="command-line">
      <span class="prompt">~/origaming $</span>
      <span class="command"> echo "Welcome to my code realm"</span>
    </div>
    <div class="output welcome">Welcome to My Code Realm</div>

    <div class="command-line">
      <span class="prompt">~/origaming $</span>
      <span class="command"> cat about.txt</span>
    </div>
    <div class="output about">
      <p>
        I'm Origaming (she/he) and I am a passionate fullstack developer! I know TypeScript, Bash, and Python, and hope to learn <span class="emoji"
          >🦀</span
        > Rust <br>in the future.
But coding and solving problems is not my only passion. I also love playing the drums and cycling ^_^.
      </p>
    </div>

    <div class="command-line">
      <span class="prompt">~/origaming $</span>
      <span class="command"> ls tech-stack/</span>
    </div>
    <div class="output">
      <div class="tech-stack">
        {#each techStack as tech}
          <span class="tech-badge" data-category={tech.category}
            >{tech.name}</span
          >
        {/each}
      </div>
    </div>

    <div class="command-line">
      <span class="prompt">~/origaming $</span>
      <span class="command"> ls projects/</span>
    </div>
    <div class="output">
      <div class="projects">
        {#each projects as project}
          <div class="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div class="project-techs">
              {#each project.techs as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              >View on GitHub →</a
            >
          </div>
        {/each}
      </div>
    </div>

    <div class="command-line">
      <span class="prompt">~/origaming $</span>
      <span class="command"> echo "Type 'help' for available commands"</span>
    </div>
    <div class="output tip">Type 'help' for available commands</div>

    {#each commandHistory as entry}
      <div class="command-line">
        <span class="prompt">~/origaming $</span>
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

    <div class="command-line input-line">
      <span class="prompt">~/origaming $</span>
      <input
        type="text"
        bind:value={inputCommand}
        on:keydown={handleCommand}
        bind:this={inputElement}
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</div>

<style>
  .terminal-container {
    height: 100%;
    overflow: hidden;
    background-color: var(--bg-secondary);
    display: flex;
    flex-direction: column;
  }

  .terminal-content {
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    font-family: "JetBrains Mono", monospace;
    background-color: var(--bg-secondary);
    display: flex;
    flex-direction: column;
  }

  .command-line {
    display: flex;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .input-line {
    margin-bottom: 0;
  }

  .prompt {
    color: var(--accent-primary);
    margin-right: 0.5rem;
    white-space: nowrap;
  }

  .command {
    color: var(--text-primary);
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
  }

  .output {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    white-space: pre-wrap;
  }

  .welcome {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0 1.5rem;
    color: var(--accent-primary);
  }

  .about p {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .emoji {
    font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0 1rem;
  }

  .tech-badge {
    display: inline-block;
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    font-size: 0.85rem;
    border: 1px solid var(--border-color);
  }

  .tech-badge[data-category="frontend"] {
    border-left: 3px solid var(--accent-secondary);
  }

  .tech-badge[data-category="backend"] {
    border-left: 3px solid var(--accent-tertiary);
  }

  .tech-badge[data-category="tools"] {
    border-left: 3px solid var(--accent-quaternary);
  }

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin: 0.5rem 0;
  }

  .project-card {
    background-color: var(--bg-tertiary);
    padding: 1.25rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .project-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: var(--accent-primary);
  }

  .project-card p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .project-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--text-secondary);
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
  }

  .project-card a {
    display: inline-block;
    font-size: 0.85rem;
    color: var(--accent-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .project-card a:hover {
    color: var(--accent-secondary);
    text-decoration: underline;
  }

  .ascii-cat {
    font-family: monospace;
    white-space: pre;
    line-height: 1.2;
    color: var(--accent-secondary);
  }

  .tip {
    color: var(--accent-tertiary);
    font-style: italic;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .projects {
      grid-template-columns: 1fr;
    }

    .tech-stack {
      flex-wrap: wrap;
    }
  }
</style>
