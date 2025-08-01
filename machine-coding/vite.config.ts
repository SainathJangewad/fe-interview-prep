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
          include: ['src/pages/**/*.{ts,tsx}'], // ✅ Only include files in src/pages/
          exclude: ['src/**/*.test.tsx', 'src/**/__tests__/**'], // ❌ Exclude test files
        },
  },
})
