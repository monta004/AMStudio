<script lang="ts">
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import '../app.css';
  
	let { data, children }: LayoutProps = $props();

  </script>
  
  <div class="app-container">
	<header class="app-header">
	  <div class="logo">
		<span class="logo-icon" aria-hidden="true">
			<!--LOGO SVG-->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 40" width="60" height="48">
			<title>AM Studio</title>
			<defs>
			<linearGradient id="rainbowGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
				<stop offset="25%" style="stop-color:#FF7F00;stop-opacity:1" />
				<stop offset="50%" style="stop-color:#FFFF00;stop-opacity:1" />
				<stop offset="75%" style="stop-color:#00FF00;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#0000FF;stop-opacity:1" />
			</linearGradient>
				<linearGradient id="rainbowGradientM" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:#0000FF;stop-opacity:1" />
				<stop offset="25%" style="stop-color:#4B0082;stop-opacity:1" />
				<stop offset="50%" style="stop-color:#8A2BE2;stop-opacity:1" />
				<stop offset="75%" style="stop-color:#FF0000;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#FF7F00;stop-opacity:1" />
			</linearGradient>
			</defs>
			<path d="M 0 40 L 15 0 L 30 40 H 22 L 15 20 L 8 40 H 0 Z" 
					fill="url(#rainbowGradientA)"/>

			<path d="M 20 40 L 27.5 0 L 35 40 L 42.5 0 L 50 40 H 42.5 L 35 20 L 27.5 40 H 20 Z" 
					fill="url(#rainbowGradientM)"/>
			</svg>
		</span>
		<h1 class="logo-title">Studio</h1>
	  </div>
	</header>

	<nav class="main-nav">
	  <ul>
		<li>
		  <a href="/" class:active={page.url.pathname === '/'}>
			<span class="nav-icon">🏠</span> Home
		  </a>
		</li>
		<li>
		  <a href="/palette" class:active={page.url.pathname === '/palette'}>
			<span class="nav-icon">🎨</span> Palett
		  </a>
		</li>
		<li>
		  <a href="/template-generator" class:active={page.url.pathname === '/template-generator'}>
			<span class="nav-icon">🧩</span> Template Generator
		  </a>
		</li>
		<li>
		  <a href="/css-generator" class:active={page.url.pathname === '/css-generator'}>
			<span class="nav-icon">✨</span> CSS Generator
		  </a>
		</li>
	  </ul>
	</nav>
  
	<main class="main-content">
	  {@render children()}
	</main>
  
	<footer class="app-footer">
	  <p>Creato con SvelteKit. © {new Date().getFullYear()} Alessio Montanino.</p>
	</footer>
  </div>
  
  <style>
	.app-container {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	}
  
	.app-header {
	  padding: 2rem 1.5rem 1rem;
	  text-align: center;
	  background: #ffffff;
	  border-bottom: 1px solid #e5e7eb;
	}
  
	.logo {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 1rem;
	}
  
	.logo-icon {
	  display: inline-block;
	}
  
	:global(.palette-icon) {
	  color: #3b82f6;
	  transform: rotate(-15deg);
	}
  
	.logo-title {
	  margin: 0;
	  font-size: 2.5rem;
	  font-weight: 800;
	  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
	  -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
	  background-clip: text;
	}
  
	.main-nav {
	  width: 100%;
	  background: #ffffff;
	  border-bottom: 1px solid #e5e7eb;
	  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	  position: sticky;
	  top: 0;
	  z-index: 10;
	}
  
	.main-nav ul {
	  display: flex;
	  justify-content: center;
	  flex-wrap: wrap;
	  list-style: none;
	  margin: 0;
	  padding: 0.75rem 1rem;
	  gap: 0.5rem;
	}
  
	.main-nav a {
	  display: flex;
	  align-items: center;
	  gap: 0.5rem;
	  padding: 0.75rem 1.25rem;
	  border-radius: 10px;
	  text-decoration: none;
	  font-weight: 600;
	  color: #374151;
	  transition: all 0.2s ease;
	  border: 2px solid transparent;
	}
  
	.main-nav a:hover {
	  background-color: #f8fafc;
	  color: #1e293b;
	  transform: translateY(-2px);
	}
  
	.main-nav a.active {
	  color: #3b82f6;
	  background-color: #eff6ff;
	  border-color: #dbeafe;
	}
  
	.nav-icon {
	  font-size: 1.125rem;
	}
  
	.main-content {
	  flex: 1;
	  max-width: 1200px;
	  width: 100%;
	  margin: 2rem auto;
	  padding: 0 1.5rem;
	}
  
	.app-footer {
	  text-align: center;
	  padding: 1.5rem;
	  color: #6b7280;
	  font-size: 0.875rem;
	  background: #f8fafc;
	  border-top: 1px solid #e5e7eb;
	  margin-top: 2rem;
	}
	
	@media (max-width: 768px) {
	  .logo-title {
		font-size: 2rem;
	  }
	  :global(.palette-icon) {
		width: 36px;
		height: 36px;
	  }
	  .main-nav ul {
		justify-content: space-around;
		gap: 0.25rem;
	  }
	  .main-nav a {
		padding: 0.6rem 0.8rem;
		font-size: 0.9rem;
	  }
	  .main-content {
		margin: 1.5rem auto;
		padding: 0 1rem;
	  }
	}
  
	@media (max-width: 480px) {
	  .main-nav ul {
		flex-direction: column;
		align-items: stretch;
		padding: 0.5rem;
	  }
	  .main-nav a {
		justify-content: center;
	  }
	}
  </style>
