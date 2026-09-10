import { describe, expect, it } from 'vitest'

import { renderProfileMetadata } from '../../build/profile-metadata.js'
import { getProfileContent } from '../config/profile-content.js'

describe('profile social metadata', () => {
  const template = `
    <meta property="og:title" content="%PROFILE_SOCIAL_TITLE%" />
    <meta property="og:description" content="%PROFILE_SOCIAL_DESCRIPTION%" />
    <meta name="twitter:title" content="%PROFILE_SOCIAL_TITLE%" />
    <meta name="twitter:description" content="%PROFILE_SOCIAL_DESCRIPTION%" />
  `

  it('renders steady-state metadata without opportunity language', () => {
    const html = renderProfileMetadata(template, getProfileContent(false))

    expect(html).toContain('Currently leading configuration management')
    expect(html).not.toContain('Open to the right')
    expect(html).not.toContain('%PROFILE_')
  })

  it('renders job-search metadata from the same mode contract', () => {
    const html = renderProfileMetadata(template, getProfileContent(true))

    expect(html).toContain('Open to the right engineering/analyst role.')
    expect(html).not.toContain('%PROFILE_')
  })
})
