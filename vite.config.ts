// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/

// import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   plugins: [tsconfigPaths()],
// });
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
}
