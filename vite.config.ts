import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // svgr must come before other plugins that might process SVGs
    svgr({
      // Process SVGs with ?react query as React components
      // When using ?react, the default export is the React component
      svgrOptions: {
        icon: true,
        replaceAttrValues: { '#000000': 'currentColor', black: 'currentColor' },
        svgProps: {
          fill: 'currentColor',
        },
        ref: false,
        titleProp: false,
      },
      // Only process SVGs with ?react query - let Vite handle others as URLs
      include: '**/*.svg?react',
    }),
    // PWA plugin DISABLED to fix service worker caching issues
    // Re-enable later when caching is properly configured
    VitePWA({
      disable: true, // Completely disable PWA/Service Worker
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Air Fryer Converter',
        short_name: 'AirFryer',
        description: 'Convert oven recipes to air fryer settings and discover recipes from UK supermarkets',
        theme_color: '#8b5cf6',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'vite.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts']
        }
      }
    }
  },
  define: {
    // Define environment variables for production
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  }
})