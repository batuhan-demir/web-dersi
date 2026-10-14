import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2311012023 sayısını 2311010000'e yuvarlıyor ve
    // mod(var(--no), 360) ile hesaplanan renk tonu bozuluyor. Bu yüzden kapalı.
    cssMinify: false,
  },
})
