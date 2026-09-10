import { getProfileContent, parseJobSearchMode } from './profile-content.js'

export const jobSearchMode = parseJobSearchMode(
  import.meta.env.VITE_JOB_SEARCH_MODE,
)

export const profileContent = getProfileContent(jobSearchMode)
