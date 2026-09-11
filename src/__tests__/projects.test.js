import { describe, expect, it } from 'vitest';

import { projects } from '../data/projects.js';

describe('featured projects', () => {
  it('features HourChit instead of retired showcase entries', () => {
    const projectIds = projects.map(({ id }) => id);

    expect(projectIds).toContain('hourchit');
    expect(projectIds).not.toContain('marathon-mode');
    expect(projectIds).not.toContain('reconvoy');
  });
});
