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
      'currently leading the development of configuration management and engineering document-control capabilities',
    )
    expect(profile.intro).toMatch(/^Building infrastructure, automating systems, and leading technical projects —/)
    expect(profile.intro).not.toContain('BPS Enterprises')
    expect(profile.intro).toContain(
      'while continuing to build systems through 1507 Systems.',
    )
    expect(profile.contactIntro).not.toContain('opportunities')
    expect(profile.socialDescription).not.toContain('Open to')
  })

  it('preserves opportunity-seeking copy in job-search mode', () => {
    const profile = getProfileContent(true)

    expect(profile.headline).toBe(
      'Engineering Leader — Configuration Management & Systems',
    )
    expect(profile.intro).toBe(
      'Building infrastructure, automating systems, and leading technical projects through 1507 Systems — while looking for the right engineering team to join.',
    )
    expect(profile.contactIntro).toContain('opportunities')
    expect(profile.socialDescription).toContain(
      'Open to the right engineering/analyst role.',
    )
    expect(profile.socialDescription).toContain('nLIGHT')
    expect(profile.socialDescription).not.toContain('ASML')
    expect(profile.socialTitle).toContain('1507 Systems')
    expect(profile.socialTitle).not.toContain('BPS Enterprises')
  })
})
