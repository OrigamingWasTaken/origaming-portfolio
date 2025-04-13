import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],

  // Optimize build with specific options
  build: {
    // Add hash to file names for better caching
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Improve chunking strategy
    chunkSizeWarningLimit: 1000,
    // Minify CSS output
    cssMinify: true,
    // Sourcemap for debugging
    sourcemap: true
  },
  resolve: {
    alias: {
      $lib: './frontend/src/lib',
    },
  },

  // Server configuration for development
  server: {
    // Auto-open the browser when starting dev server
    open: true,
    // Enable hot module replacement
    hmr: true
  },

  // Optimize dependencies
  optimizeDeps: {
    exclude: [], // Add packages that shouldn't be pre-bundled
    include: ['gsap', 'svelte-transition'] // Ensure these packages are pre-bundled
  },
});