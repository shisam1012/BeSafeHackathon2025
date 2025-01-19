import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rawPlugin from 'vite-plugin-raw';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),   rawPlugin({
    match: /\.txt$/, // Matches .txt files
  }),],
  server: {
    port: 3000,
    open: true // Automatically open the browser
  }
})

