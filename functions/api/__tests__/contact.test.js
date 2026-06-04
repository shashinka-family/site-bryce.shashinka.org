import { describe, it, expect } from 'vitest'
import { isAllowedHost } from '../contact.js'

// Minimal Request stand-in: only url + Host header are read by isAllowedHost.
function makeRequest({ url, host }) {
  return {
    url,
    headers: {
      get(name) {
        if (name.toLowerCase() === 'host') return host ?? null
        return null
      },
    },
  }
}

describe('isAllowedHost', () => {
  it('allows the canonical production host', () => {
    expect(
      isAllowedHost(makeRequest({ url: 'https://bryce.shashinka.org/api/contact' }))
    ).toBe(true)
  })

  it('allows the canonical host with a port', () => {
    expect(
      isAllowedHost(makeRequest({ url: 'https://bryce.shashinka.org:443/api/contact' }))
    ).toBe(true)
  })

  it('rejects pages.dev preview hostnames', () => {
    expect(
      isAllowedHost(
        makeRequest({
          url: 'https://fix-medlow-hardening.site-bryce-shashinka-org.pages.dev/api/contact',
        })
      )
    ).toBe(false)
  })

  it('rejects the production pages.dev hostname', () => {
    expect(
      isAllowedHost(
        makeRequest({ url: 'https://site-bryce-shashinka-org.pages.dev/api/contact' })
      )
    ).toBe(false)
  })

  it('rejects an arbitrary attacker host', () => {
    expect(
      isAllowedHost(makeRequest({ url: 'https://evil.example.com/api/contact' }))
    ).toBe(false)
  })

  it('falls back to the Host header when the URL is unparseable', () => {
    expect(
      isAllowedHost(makeRequest({ url: 'not-a-url', host: 'bryce.shashinka.org' }))
    ).toBe(true)
  })
})
