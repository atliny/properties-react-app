import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/property-react-app/",
  test: {
    globals: true,
    environment: "happy-dom",
    setUpFIles: "./src/setupTests.js",
  },
})
