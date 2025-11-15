<!-- src/lib/components/shared/CodeOutput.svelte -->
<script lang="ts">

    let { 
      htmlCode, 
      cssCode 
    }: { 
      htmlCode: string, 
      cssCode: string 
    } = $props();
  
    // Stato per i tab e il pulsante copia
    let activeTab: 'html' | 'css' = $state('html');
    let copied = $state(false);
    let copyTimeout: any = null;
    
    //codice corrente
    const currentCode = $derived.by(() => {
      return activeTab === 'html' ? htmlCode : cssCode;
    });
    
    //funzione per la copia
    async function copyCode(text: string) {
      if (copyTimeout) clearTimeout(copyTimeout);
  
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (err) {
        console.error('Errore durante la copia:', err);
        // Fallback
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          copied = true;
        } catch (fallbackErr) {
          console.error('Errore fallback copia:', fallbackErr);
        }
      }
  
      copyTimeout = setTimeout(() => { copied = false; }, 1200);
    }
    
    //effetto per rimozione timeout
    $effect(() => {
      return () => {
        if (copyTimeout) clearTimeout(copyTimeout);
      };
    });
  </script>
  
  <div class="code-output-container">
    <div class="code-header">

      <div class="code-tabs">
        <button class:active={activeTab === 'html'} onclick={() => activeTab = 'html'}>
          HTML
        </button>
        <button class:active={activeTab === 'css'} onclick={() => activeTab = 'css'}>
          CSS
        </button>
      </div>
      
      <div class="header-actions">
        <button class="copy-button" onclick={() => copyCode(currentCode)}>
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
    </div>
    
    <div class="code-content">
      <pre><code>{currentCode}</code></pre>
    </div>
  </div>
  
  <style>

    .code-output-container {
      background-color: #1e293b;
      color: #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #334155;
  
      display: flex; 
      flex-direction: column; 
      flex: 1; 
      min-height: 0;
      max-height: 250px;
    }
    
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0.75rem 0.75rem 1.rem;
      background-color: #334155;
      border-bottom: 1px solid #475569;
    }
    
    .code-tabs {
      display: flex;
      gap: 0.5rem;
    }
    
    .code-tabs button {
      font: inherit;
      font-size: 0.875rem;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      border: none;
      background-color: transparent;
      color: #94a3b8;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .code-tabs button.active {
      background-color: #475569;
      color: #ffffff;
    }
    
    .code-tabs button:hover:not(.active) {
      background-color: #475569;
    }
    
    .header-actions {
      display: flex;
      gap: 0.5rem;
    }
  
    .copy-button {
      font: inherit;
      font-size: 0.875rem;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      border: 1px solid #475569;
      background-color: #334155;
      color: #e2e8f0;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }
    
    .copy-button:hover {
      background-color: #475569;
    }
    
    .code-content {
      flex: 1;
      overflow-y: auto;
      
      /* Stili per la scrollbar */
      scrollbar-width: thin;
      scrollbar-color: #475569 #1e293b;
    }
    
    .code-content::-webkit-scrollbar {
      width: 8px;
    }
    .code-content::-webkit-scrollbar-track {
      background: #1e293b;
    }
    .code-content::-webkit-scrollbar-thumb {
      background-color: #475569;
      border-radius: 4px;
    }
  
    .code-content pre {
      margin: 0;
      padding: 1rem;
      font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  </style>