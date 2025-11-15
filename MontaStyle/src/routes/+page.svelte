<!--Home page-->
<script lang="ts">
    // SVGs per le icone delle card
    const paletteGenIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6L20 6"></path><path d="M4 12H16"></path><path d="M13 18H20"></path><path d="M4 6H5"></path><path d="M8 12H9"></path><path d="M8 18H9"></path>
      </svg>`;
    const templateGenIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line>
      </svg>`;
    const cssGenIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>`;
</script>
  
<div class="home-container">
  
    <section class="features-section">
        
        <h2 class="section-title">Scopri gli strumenti</h2>
        <div class="features-grid">

        <!-- Card Generatore Palette -->
        <a href="/palette" class="feature-card">
          <div class="card-icon-wrapper" style="--icon-bg: #eff6ff;">
            <span class="card-icon" style="--icon-color: #3b82f6;">{@html paletteGenIcon}</span>
          </div>
          <h3 class="card-title">Generatore di Palette</h3>
          <p class="card-description">
            Parti da un colore base, genera armonie (monocromatiche, analoghe, complementari)
            e scegli la palette perfetta per il tuo progetto.
          </p>
          <span class="card-link">Vai al Generatore <span aria-hidden="true">→</span></span>
        </a>
  
        <!-- Card Generatore Template -->
        <a href="/template-generator" class="feature-card">
          <div class="card-icon-wrapper" style="--icon-bg: #f0fdf4;">
            <span class="card-icon" style="--icon-color: #22c55e;">{@html templateGenIcon}</span>
          </div>
          <h3 class="card-title">Template Generator</h3>
          <p class="card-description">
            Crea componenti complessi come bottoni, navbar e toggle switch
            utilizzando i colori della tua palette selezionata.
          </p>
          <span class="card-link">Vai al Generatore <span aria-hidden="true">→</span></span>
        </a>
  
        <!-- Card Generatore CSS -->
        <a href="/css-generator" class="feature-card">
          <div class="card-icon-wrapper" style="--icon-bg: #fffbeb;">
            <span class="card-icon" style="--icon-color: #f59e0b;">{@html cssGenIcon}</span>
          </div>
          <h3 class="card-title">CSS Generator</h3>
          <p class="card-description">
            Genera snippet CSS per sfumature, ombre realistiche ed effetti
            "glassmorphism" usando i colori della tua palette.
          </p>
          <span class="card-link">Vai al Generatore <span aria-hidden="true">→</span></span>
        </a>
      </div>
    </section>
</div>
  
<style>
    .home-container {
      max-width: 960px;
      margin: 0 auto;
    }
  
    .features-section {
      margin-top: 2rem;
    }
  
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e293b;
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
  
    .feature-card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 2rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }
  
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-color: #dbeafe;
    }
  
    .card-icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--icon-bg, #f3f4f6);
      margin-bottom: 1.5rem;
    }
  
    .card-icon {
      color: var(--icon-color, #3b82f6);
    }
  
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 0.75rem;
    }
  
    .card-description {
      font-size: 0.95rem;
      color: #4b5563;
      line-height: 1.6;
      margin: 0;
      flex: 1; 
    }
  
    .card-link {
      margin-top: 1.5rem;
      color: #3b82f6;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s ease;
    }
  
    .card-link:hover {
      color: #1d4ed8;
    }

</style>
