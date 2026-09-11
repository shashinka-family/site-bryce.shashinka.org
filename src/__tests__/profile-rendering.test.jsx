import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import HeroSection from '../components/HeroSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import { getProfileContent } from '../config/profile-content.js'

describe('mode-aware page copy', () => {
  it('renders steady-state hero and contact copy', () => {
    const profile = getProfileContent(false)
    const hero = renderToStaticMarkup(<HeroSection profile={profile} />)
    const contact = renderToStaticMarkup(<ContactSection profile={profile} />)

    expect(hero).toContain('Engineering Leader — Configuration Management &amp; Systems')
    expect(hero).toContain('Building infrastructure, automating systems, and leading technical projects')
    expect(hero).toContain('currently leading the development')
    expect(hero).not.toContain('BPS Enterprises')
    expect(hero).toContain('1507 Systems')
    expect(contact).toContain('Interested in discussing technical projects or collaboration?')
    expect(contact).not.toContain('Interested in discussing opportunities')
  })

  it('renders job-search hero and contact copy', () => {
    const profile = getProfileContent(true)
    const hero = renderToStaticMarkup(<HeroSection profile={profile} />)
    const contact = renderToStaticMarkup(<ContactSection profile={profile} />)

    expect(hero).toContain('through 1507 Systems — while looking for the right engineering team to join')
    expect(contact).toContain('Interested in discussing opportunities')
  })

  it('presents nLIGHT and 1507 Systems without the BPS legal entity', () => {
    const about = renderToStaticMarkup(
      <AboutSection profile={getProfileContent(false)} />,
    )

    expect(about).toContain('nLIGHT')
    expect(about).toContain('1507 Systems')
    expect(about).not.toContain('BPS Enterprises')
  })
})
