import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { profileContent } from './config/profile.js'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection profile={profileContent} />
      <AboutSection profile={profileContent} />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection profile={profileContent} />
      <Footer />
    </div>
  )
}
