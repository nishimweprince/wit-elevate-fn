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
        target: 'https://wit-elevate-c8cva5a7b7bfa7f3.canadacentral-01.azurewebsites.net',
        changeOrigin: true,
      }
    }
  }
}
