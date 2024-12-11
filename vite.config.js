// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Root directory of your project
  root: '.',

  // Base public path when served in production
  base: '/',

  // Configuration for the development server
  server: {
    port: 3000, // Default port is 5173
    open: true, // Open the browser when the server starts
  },

  // Build-specific configuration
  build: {
    outDir: 'dist', // Output directory for production build
    emptyOutDir: true, // Clean the output directory before building
  },

  // Resolve options for importing files
  resolve: {
    alias: {
      '@': '/src', // Use `@` as a shorthand for the `/src` directory
    },
  },
});
