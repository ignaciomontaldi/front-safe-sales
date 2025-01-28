import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/front-safe-sales/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://safe-sales-api.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
