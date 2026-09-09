import { describe, expect, it } from 'vitest'

import { experiences } from '../data/experience.js'

describe('experience timeline', () => {
  it('places the current nLIGHT role immediately above ASML', () => {
    const nlightIndex = experiences.findIndex((role) =>
      role.company.includes('nLIGHT DEFENSE Systems'),
    )
    const asmlIndex = experiences.findIndex((role) => role.company === 'ASML')

    expect(nlightIndex).toBeGreaterThanOrEqual(0)
    expect(nlightIndex).toBe(asmlIndex - 1)
    expect(experiences[nlightIndex]).toMatchObject({
      position: 'Sr. Engineering Documents Manager',
      location: 'Longmont, CO',
      startYear: '2026',
      endYear: 'Present',
      isCurrent: true,
    })
  })
})
