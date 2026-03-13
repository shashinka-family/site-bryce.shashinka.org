import { describe, it, expect } from 'vitest'

describe('build sanity', () => {
  it('should have a valid app entry point', async () => {
    const app = await import('../App.jsx')
    expect(app).toBeDefined()
  })
})
