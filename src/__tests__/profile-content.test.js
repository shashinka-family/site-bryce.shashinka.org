import { describe, expect, it } from 'vitest'

import {
  getProfileContent,
  parseJobSearchMode,
} from '../config/profile-content.js'

describe('profile content modes', () => {
  it('defaults job-search mode to off', () => {
    expect(parseJobSearchMode(undefined)).toBe(false)
    expect(parseJobSearchMode('false')).toBe(false)
  })

  it('enables job-search mode only for an explicit true flag', () => {
    expect(parseJobSearchMode('true')).toBe(true)
    expect(parseJobSearchMode('TRUE')).toBe(false)
  })

  it('uses current-role copy in steady-state mode', () => {
    const profile = getProfileContent(false)

    expect(profile.headline).toBe(
      'Engineering Leader — Configuration Management & Systems',
    )
    expect(profile.intro).toContain(
      'I currently lead the development of configuration management and engineering document-control capabilities',
    )
    expect(profile.contactIntro).not.toContain('opportunities')
    expect(profile.socialDescription).not.toContain('Open to')
  })

  it('preserves opportunity-seeking copy in job-search mode', () => {
    const profile = getProfileContent(true)

    expect(profile.headline).toBe(
      'Engineering Leader — Configuration Management & Systems',
    )
    expect(profile.intro).toContain(
      'I’m open to the right engineering or technical leadership role',
    )
    expect(profile.contactIntro).toContain('opportunities')
    expect(profile.socialDescription).toContain(
      'Open to the right engineering/analyst role.',
    )
  })
})
