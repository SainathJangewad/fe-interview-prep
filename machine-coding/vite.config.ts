import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
      // support `describe`, `test` etc. globally, 
    // so you don't need to import them every time
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
          enabled: true, // Enable coverage collection
          provider: 'v8', // or 'istanbul'
          reporter: ['text', 'html', 'json'], // Specify desired reporters
          // include: ['src/**/*.ts'], // Optionally include specific files/patterns
          // exclude: ['node_modules/', 'dist/'], // Optionally exclude specific files/patterns
        },
  },
})
