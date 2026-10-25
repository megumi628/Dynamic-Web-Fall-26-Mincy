import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // json-server rewrites db.json every time you tick, rate, edit or add a
      // place. Without this the dev server sees a changed project file and
      // reloads the page, which throws away the filters and sends you back
      // to "All".
      ignored: ['**/db.json'],
    },
  },
})
