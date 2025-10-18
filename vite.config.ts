import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration Vite pour Render (déploiement SPA React)
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Render sert l'app depuis la racine
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    // Permet de simuler le comportement Render localement (important pour test)
    historyApiFallback: true,
  },
});

