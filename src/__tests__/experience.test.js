import { describe, expect, it } from 'vitest'

import { experiences } from '../data/experience.js'

describe('experience timeline', () => {
  it('presents the founder role as 1507 Systems in Longmont', () => {
    expect(experiences[0]).toMatchObject({
      company: '1507 Systems',
      location: 'Longmont, CO',
    })
  })

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
