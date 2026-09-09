import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { renderProfileMetadata } from './build/profile-metadata.js'
import {
  getProfileContent,
  parseJobSearchMode,
} from './src/config/profile-content.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const profile = getProfileContent(
    parseJobSearchMode(env.VITE_JOB_SEARCH_MODE),
  )

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'profile-metadata',
        transformIndexHtml(html) {
          return renderProfileMetadata(html, profile)
        },
      },
    ],
  }
})
