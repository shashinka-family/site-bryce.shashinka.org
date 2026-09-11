import { describe, expect, it } from 'vitest';

import { projects } from '../data/projects.js';

describe('featured projects', () => {
  it('features HourChit instead of retired showcase entries', () => {
    const projectIds = projects.map(({ id }) => id);

    expect(projectIds).toContain('hourchit');
    expect(projectIds).not.toContain('marathon-mode');
    expect(projectIds).not.toContain('reconvoy');
  });

  it('keeps featured projects alphabetized by title', () => {
    const projectTitles = projects.map(({ title }) => title);
    const alphabetizedTitles = [...projectTitles].sort((left, right) =>
      left.localeCompare(right),
    );

    expect(projectTitles).toEqual(alphabetizedTitles);
  });
});
