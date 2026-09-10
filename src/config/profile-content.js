const headline = 'Engineering Leader — Configuration Management & Systems'
const heroActivity =
  'Building infrastructure, automating systems, and leading technical projects'

const currentRoleStatus =
  'currently leading the development of configuration management and engineering document-control capabilities for a defense engineering organization, while continuing to build systems through 1507 Systems.'

const jobSearchStatus =
  'while looking for the right engineering team to join.'

const steadyStateContent = {
  headline,
  intro: `${heroActivity} — ${currentRoleStatus}`,
  aboutClosing:
    "I build things that run: infrastructure that holds up under load, automation that eliminates repetitive work, and documentation that makes the next person's job easier. In my current role, I apply that systems mindset to configuration management and engineering document control while continuing to build practical infrastructure through 1507 Systems.",
  contactIntro:
    'Interested in discussing technical projects or collaboration? Send a message or reach out through LinkedIn or GitHub.',
  socialTitle:
    'Bryce P. Shashinka — Engineering Leader, Configuration Management & Systems',
  socialDescription:
    'Twenty years across aerospace, semiconductor manufacturing, IT infrastructure, and technical operations. Currently leading configuration management and engineering document-control capability development for a defense engineering organization.',
}

const jobSearchContent = {
  headline,
  intro: `${heroActivity} through 1507 Systems — ${jobSearchStatus}`,
  aboutClosing:
    "I build things that run: infrastructure that holds up under load, automation that eliminates repetitive work, and documentation that makes the next person's job easier. I’m open to the right engineering team where that mindset fits, whether as an individual contributor or technical lead.",
  contactIntro:
    'Interested in discussing opportunities, technical projects, or collaboration? Send a message or reach out through LinkedIn or GitHub.',
  socialTitle:
    'Engineering Leader — Configuration Management, Infrastructure & Systems | Founder, 1507 Systems',
  socialDescription:
    'Twenty years across residential IT, aerospace engineering change management at Pratt & Whitney, and configuration management and engineering document control at nLIGHT — while building 1507 Systems. This portfolio covers my career history, technical skills, and hands-on infrastructure projects. Open to the right engineering/analyst role.',
}

export function parseJobSearchMode(value) {
  return value === 'true'
}

export function getProfileContent(jobSearchMode) {
  return jobSearchMode ? jobSearchContent : steadyStateContent
}
