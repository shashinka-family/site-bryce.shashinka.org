import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import HeroSection from '../components/HeroSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import { getProfileContent } from '../config/profile-content.js'

describe('mode-aware page copy', () => {
  it('renders steady-state hero and contact copy', () => {
    const profile = getProfileContent(false)
    const hero = renderToStaticMarkup(<HeroSection profile={profile} />)
    const contact = renderToStaticMarkup(<ContactSection profile={profile} />)

    expect(hero).toContain('Engineering Leader — Configuration Management &amp; Systems')
    expect(hero).toContain('I currently lead the development')
    expect(contact).toContain('Interested in discussing technical projects or collaboration?')
    expect(contact).not.toContain('Interested in discussing opportunities')
  })

  it('renders job-search hero and contact copy', () => {
    const profile = getProfileContent(true)
    const hero = renderToStaticMarkup(<HeroSection profile={profile} />)
    const contact = renderToStaticMarkup(<ContactSection profile={profile} />)

    expect(hero).toContain('I’m open to the right engineering or technical leadership role')
    expect(contact).toContain('Interested in discussing opportunities')
  })
})
