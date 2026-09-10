function escapeHtmlAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function renderProfileMetadata(html, profile) {
  return html
    .replaceAll('%PROFILE_SOCIAL_TITLE%', escapeHtmlAttribute(profile.socialTitle))
    .replaceAll(
      '%PROFILE_SOCIAL_DESCRIPTION%',
      escapeHtmlAttribute(profile.socialDescription),
    )
}
