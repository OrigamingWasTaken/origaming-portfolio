<script lang="ts">
  import { onMount } from 'svelte';
  
  export let initialContent: string = '';
  
  let content = initialContent;
  let editorElement: HTMLTextAreaElement;
  
  onMount(() => {
    if (editorElement) {
      editorElement.focus();
    }
  });
</script>

<div class="text-editor">
  <div class="editor-toolbar">
    <button class="tool-button" title="Bold">B</button>
    <button class="tool-button" title="Italic"><i>I</i></button>
    <button class="tool-button" title="Underline"><u>U</u></button>
    <span class="separator"></span>
    <select class="font-selector" title="Font Size">
      <option>12px</option>
      <option>14px</option>
      <option selected>16px</option>
      <option>18px</option>
    </select>
  </div>
  
  <textarea 
    bind:this={editorElement}
    bind:value={content}
    class="editor-content"
    spellcheck="false"
  ></textarea>
</div>

<style>
  .text-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-secondary);
    min-width: 600px;
    min-height: 500px;
  }
  
  .editor-toolbar {
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
  }
  
  .tool-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tool-button:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px var(--card-shadow);
  }
  
  .tool-button:active {
    transform: translateY(0);
  }
  
  .separator {
    width: 1px;
    height: 24px;
    background-color: var(--border-color);
    margin: 0 0.25rem;
  }
  
  .font-selector {
    padding: 0.5rem 0.75rem;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .font-selector:hover {
    border-color: var(--accent-primary);
  }
  
  .editor-content {
    flex: 1;
    padding: 1.5rem;
    background-color: var(--bg-secondary);
    border: none;
    resize: none;
    color: var(--text-primary);
    font-family: 'Menlo', 'Monaco', 'JetBrains Mono', monospace;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
    width: 100%;
    height: 100%;
  }
</style>